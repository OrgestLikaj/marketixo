<?php
/**
 * Server-side configuration for public_html/api/contact.php.
 *
 * Copy to   /home/<cpanel-user>/mx-config.php   (ONE LEVEL ABOVE public_html)
 * so it can never be downloaded. Never commit the real file.
 */
return [
    'mail_to'     => 'info@marketixo.eu',       // inbox that receives project requests
    'mail_from'   => 'no-reply@marketixo.eu',  // must be a mailbox that exists in cPanel → Email Accounts
    'site_name'   => 'Marketixo',
    'min_seconds' => 3,
    'rate_limit'  => 5,
    'rate_window' => 3600,
];
