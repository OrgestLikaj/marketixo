<?php
/**
 * Contact form handler for Namecheap shared hosting (PHP 8+).
 *
 * Setup (once the domain is live):
 *   1. In cPanel → Email Accounts, create a mailbox on the site's domain, e.g. no-reply@yourdomain.com.
 *      Mail must be sent "From" the site's own domain, otherwise Gmail will put it in spam or reject it.
 *   2. Set MAIL_FROM below to that address. If left empty, no-reply@<the site's domain> is used.
 *
 * Requests from JavaScript (Accept: application/json) get a JSON response; plain form posts
 * (no JavaScript) are redirected to the thank-you or error page.
 */

declare(strict_types=1);

const MAIL_TO = 'rexhepajrozafe@gmail.com'; // where messages are delivered
const MAIL_FROM = '';                        // TODO: e.g. 'no-reply@yourdomain.com' (a real mailbox on the domain)
const SITE_NAME = 'Rozafë Rexhepaj';
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
    $target = $ok ? ($_POST['redirect'] ?? '/danke/') : ($_POST['error_redirect'] ?? '/kontakt/?error=1');
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

function senderAddress(): string
{
    if (MAIL_FROM !== '') {
        return MAIL_FROM;
    }
    $host = strtolower((string) ($_SERVER['SERVER_NAME'] ?? $_SERVER['HTTP_HOST'] ?? 'localhost'));
    $host = preg_replace('/^www\./', '', preg_replace('/:\d+$/', '', $host) ?? '') ?? 'localhost';
    if (!preg_match('/^[a-z0-9.-]+$/', $host)) {
        $host = 'localhost';
    }
    return 'no-reply@' . $host;
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
$rateFile = sys_get_temp_dir() . '/rr_rate_' . hash('sha256', $ip . __FILE__);
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
$organisation = oneLine(field('organisation', 200));
$topic = oneLine(field('topic', 80));
$message = field('message', 5000);
$lang = in_array($_POST['lang'] ?? '', ['de', 'en'], true) ? $_POST['lang'] : 'de';
$consent = ($_POST['consent'] ?? '') === 'yes';

if ($name === '' || $message === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'invalid');
}

// --- Send ------------------------------------------------------------------

$from = senderAddress();
$subjectName = mb_substr($name, 0, 60);
$subject = '=?UTF-8?B?' . base64_encode("Website: {$subjectName}" . ($topic ? " – {$topic}" : '')) . '?=';

$body = implode("\n", [
    'New message from the website contact form',
    str_repeat('-', 40),
    "Name:          {$name}",
    "Email:         {$email}",
    'Organisation:  ' . ($organisation ?: '-'),
    'Topic:         ' . ($topic ?: '-'),
    'Language:      ' . strtoupper($lang),
    '',
    'Message:',
    $message,
    '',
    str_repeat('-', 40),
    'Sent: ' . date('Y-m-d H:i:s T'),
]);

$headers = [
    'From: ' . '=?UTF-8?B?' . base64_encode(SITE_NAME . ' Website') . '?=' . " <{$from}>",
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP',
];

$sent = @mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
    error_log('Contact form: mail() failed');
    respond(false, 'mail');
}

$hits[] = time();
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

respond(true);
