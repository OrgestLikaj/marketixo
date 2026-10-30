<?php
/**
 * Server-side configuration for public_html/api/contact.php.
 *
 * Optional — contact.php already sends to info@marketixo.eu from info@marketixo.eu.
 * Only needed to override those defaults. Copy to /home/<cpanel-user>/mx-config.php
 * (ONE LEVEL ABOVE the web root) so it can never be downloaded. Never commit the real file.
 */
return [
    'mail_to'     => 'info@marketixo.eu',       // inbox that receives project requests
    'mail_from'   => 'no-reply@marketixo.eu',  // must be a mailbox that exists in cPanel → Email Accounts
    'site_name'   => 'Marketixo',
    'min_seconds' => 3,
    'rate_limit'  => 5,
    'rate_window' => 3600,
];
