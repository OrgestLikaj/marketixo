<?php
/**
 * Marketixo quote form handler for Namecheap shared hosting (PHP 8+).
 *
 * Setup:
 *   1. In cPanel → Email Accounts, create the mailbox used as sender (MAIL_FROM below),
 *      e.g. no-reply@marketixo.com. Sending "From" your own domain is what keeps the
 *      emails out of spam.
 *   2. Set MAIL_TO to the inbox where you want to receive requests.
 *
 * Requests from JavaScript (Accept: application/json) get a JSON response; plain form
 * posts (no JavaScript) are redirected to the thank-you or error page.
 */

declare(strict_types=1);

const MAIL_TO = 'hello@marketixo.com';       // TODO: where requests are delivered
const MAIL_FROM = 'no-reply@marketixo.com';  // TODO: a real mailbox on your domain
const SITE_NAME = 'Marketixo';
const MIN_SECONDS = 3;                       // faster submissions are treated as bots
const RATE_LIMIT = 5;                        // max submissions per IP …
const RATE_WINDOW = 3600;                    // … per hour

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, string $error = ''): never
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($ok ? 200 : ($error === 'invalid' ? 422 : ($error === 'rate' ? 429 : 400)));
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error ?: null]);
        exit;
    }
    $target = $ok ? ($_POST['redirect'] ?? '/thank-you/') : ($_POST['error_redirect'] ?? '/contact/?error=1#quote');
    // Only allow redirects to paths on this site.
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
    $value = trim(str_replace(["\r\n", "\r"], "\n", $value));
    return mb_substr($value, 0, $max);
}

function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST', true, 405);
    exit;
}

// --- Spam protection -------------------------------------------------------

// Honeypot: real users never fill this hidden field. Pretend success to bots.
if (field('website', 200) !== '') {
    respond(true);
}

// Time trap: the page sets a timestamp when it loads (only when JavaScript runs).
$ts = (int) field('ts', 20);
if ($ts > 0 && (time() - $ts) < MIN_SECONDS) {
    respond(true);
}

// Simple per-IP rate limit stored in the system temp directory.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/mx_rate_' . hash('sha256', $ip . __FILE__);
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        fn(int $t) => $t > time() - RATE_WINDOW
    );
}
if (count($hits) >= RATE_LIMIT) {
    respond(false, 'rate');
}

// --- Validation ------------------------------------------------------------

$name = oneLine(field('name', 120));
$email = oneLine(field('email', 200));
$phone = oneLine(field('phone', 40));
$company = oneLine(field('company', 200));
$budget = oneLine(field('budget', 60));
$message = field('message', 5000);
$lang = in_array($_POST['lang'] ?? '', ['en', 'de'], true) ? $_POST['lang'] : 'en';
$consent = ($_POST['consent'] ?? '') === 'yes';

$services = [];
if (isset($_POST['services']) && is_array($_POST['services'])) {
    foreach (array_slice($_POST['services'], 0, 12) as $s) {
        if (is_string($s)) {
            $services[] = oneLine(mb_substr($s, 0, 80));
        }
    }
}

if ($name === '' || $message === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'invalid');
}

// --- Send ------------------------------------------------------------------

$subjectName = mb_substr($name, 0, 60);
$subject = '=?UTF-8?B?' . base64_encode("New quote request: {$subjectName}" . ($company ? " ({$company})" : '')) . '?=';

$body = implode("\n", [
    'New quote request from the website',
    str_repeat('-', 40),
    "Name:      {$name}",
    "Email:     {$email}",
    'Phone:     ' . ($phone ?: '-'),
    'Company:   ' . ($company ?: '-'),
    'Services:  ' . ($services ? implode(', ', $services) : '-'),
    'Budget:    ' . ($budget ?: '-'),
    'Language:  ' . strtoupper($lang),
    '',
    'Message:',
    $message,
    '',
    str_repeat('-', 40),
    'Sent: ' . date('Y-m-d H:i:s T'),
    'IP:   ' . $ip,
]);

$headers = [
    'From: ' . SITE_NAME . ' Website <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP',
];

$sent = mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

if (!$sent) {
    error_log('Marketixo contact form: mail() failed');
    respond(false, 'mail');
}

$hits[] = time();
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

respond(true);
