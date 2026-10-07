<?php
/**
 * Marketixo — project request handler (PHP 8.1+, Namecheap shared hosting).
 *
 * Configuration lives OUTSIDE the web root in mx-config.php (see deploy/mx-config.example.php):
 *   /home/<cpanel-user>/mx-config.php   ← one level above public_html
 * so no address or credential is ever committed or publicly downloadable.
 *
 * Security:
 *  - POST only, same-origin check, payload size limit
 *  - honeypot + minimum fill time (bots), per-IP rate limit (hashed IP, 1 h window)
 *  - strict server-side validation and allow-lists for every choice field
 *  - header-injection safe (validated email, encoded subject, no user data in From)
 *
 * JavaScript submissions (Accept: application/json) receive JSON;
 * plain form posts are redirected to the thank-you or error page.
 */

declare(strict_types=1);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

$config = [
    'mail_to'     => '',                 // where requests are delivered
    'mail_from'   => '',                 // a real mailbox on your domain (e.g. no-reply@marketixo.com)
    'site_name'   => 'Marketixo',
    'min_seconds' => 3,                  // faster submissions are treated as bots
    'rate_limit'  => 5,                  // max submissions per IP …
    'rate_window' => 3600,               // … per hour
];
foreach ([dirname(__DIR__, 2) . '/mx-config.php', dirname(__DIR__, 3) . '/mx-config.php'] as $file) {
    if (is_file($file)) {
        $config = array_merge($config, (array) require $file);
        break;
    }
}

const LANGS = ['en', 'de', 'it', 'sq'];
const SERVICES = [
    'website' => 'Website', 'branding' => 'Branding', 'seo' => 'SEO', 'ads' => 'Paid ads',
    'social' => 'Social media', 'content' => 'Content', 'security' => 'Cybersecurity',
    'qa' => 'Software testing / QA', 'multiple' => 'Multiple services', 'other' => 'Other',
];
const BUDGETS = [
    'lt1k' => 'Under €1,000', '1k-3k' => '€1,000–€3,000', '3k-5k' => '€3,000–€5,000',
    '5k-10k' => '€5,000–€10,000', 'gt10k' => '€10,000+', 'unsure' => 'Not sure yet',
];
const METHODS = ['email' => 'Email', 'phone' => 'Phone', 'whatsapp' => 'WhatsApp', 'video' => 'Video call'];

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: same-origin');

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, string $error = ''): never
{
    global $wantsJson;
    if ($wantsJson) {
        $status = $ok ? 200 : match ($error) {
            'invalid' => 422,
            'rate' => 429,
            'method' => 405,
            'origin' => 403,
            default => 500,
        };
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error ?: null]);
        exit;
    }
    $target = $ok ? ($_POST['redirect'] ?? '/') : ($_POST['error_redirect'] ?? '/');
    // Only same-site relative paths — never an open redirect.
    if (!is_string($target) || !preg_match('#^/[A-Za-z0-9/_\-?=&\#.]*$#', $target) || str_starts_with($target, '//')) {
        $target = '/';
    }
    header('Location: ' . $target, true, 303);
    exit;
}

function field(string $key, int $max): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace(["\r\n", "\r", "\0"], ["\n", "\n", ''], $value));
    return mb_substr($value, 0, $max);
}

function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
}

// ---------------------------------------------------------------------------
// Request checks
// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'method');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 64 * 1024) {
    respond(false, 'invalid');
}
// Same-origin: browsers send Origin on POST; reject posts from other sites.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    respond(false, 'origin');
}
if ($config['mail_to'] === '' || $config['mail_from'] === '') {
    error_log('[contact.php] mail_to / mail_from not configured — see deploy/mx-config.example.php');
    respond(false, 'config');
}

// ---------------------------------------------------------------------------
// Spam protection
// ---------------------------------------------------------------------------

// Honeypot: real users never fill this field. Pretend success to bots.
if (field('website', 200) !== '') {
    respond(true);
}
// Time trap (only set when JavaScript runs).
$ts = (int) field('ts', 20);
if ($ts > 0 && (time() - $ts) < (int) $config['min_seconds']) {
    respond(true);
}

// Rate limit: hashed IP, timestamps only, expire after the window.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$dir = sys_get_temp_dir();
$rateFile = $dir . '/mx_rate_' . hash('sha256', $ip . __FILE__);
$now = time();
$window = (int) $config['rate_window'];
$hits = [];
if (is_file($rateFile)) {
    $hits = array_values(array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        fn(int $t) => $t > $now - $window
    ));
}
if (count($hits) >= (int) $config['rate_limit']) {
    respond(false, 'rate');
}
// Occasionally clean up expired rate files of other visitors.
if (random_int(1, 50) === 1) {
    foreach (glob($dir . '/mx_rate_*') ?: [] as $f) {
        if (is_file($f) && filemtime($f) < $now - $window) {
            @unlink($f);
        }
    }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

$name = oneLine(field('name', 120));
$email = oneLine(field('email', 200));
$phone = oneLine(field('phone', 40));
$company = oneLine(field('company', 200));
$message = field('message', 5000);
$lang = in_array($_POST['lang'] ?? '', LANGS, true) ? $_POST['lang'] : 'en';
$consent = ($_POST['consent'] ?? '') === 'yes';
$budgetKey = field('budget', 20);
$budget = BUDGETS[$budgetKey] ?? '';
$methodKey = field('contact_method', 20);
$method = METHODS[$methodKey] ?? '';

$services = [];
if (isset($_POST['services']) && is_array($_POST['services'])) {
    foreach (array_slice($_POST['services'], 0, count(SERVICES)) as $s) {
        if (is_string($s) && isset(SERVICES[$s])) {
            $services[] = SERVICES[$s];
        }
    }
}

if ($name === '' || $message === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'invalid');
}
if ($phone !== '' && !preg_match('/^[0-9+()\/.\- ]{5,40}$/', $phone)) {
    respond(false, 'invalid');
}

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------

$subject = '=?UTF-8?B?' . base64_encode('New project request: ' . mb_substr($name, 0, 60) . ($company ? " ({$company})" : '')) . '?=';
$body = implode("\n", [
    'New project request from the website',
    str_repeat('-', 44),
    "Name:            {$name}",
    "Email:           {$email}",
    'Phone:           ' . ($phone ?: '-'),
    'Company:         ' . ($company ?: '-'),
    'Services:        ' . ($services ? implode(', ', $services) : '-'),
    'Budget:          ' . ($budget ?: '-'),
    'Contact via:     ' . ($method ?: '-'),
    'Language:        ' . strtoupper($lang),
    'Consent:         yes (privacy policy accepted)',
    '',
    'Project description:',
    $message,
    '',
    str_repeat('-', 44),
    'Sent: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$headers = [
    'From: ' . $config['site_name'] . ' Website <' . $config['mail_from'] . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail($config['mail_to'], $subject, $body, implode("\r\n", $headers), '-f' . $config['mail_from']);
if (!$sent) {
    error_log('[contact.php] mail() failed');
    respond(false, 'mail');
}

$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);
respond(true);
