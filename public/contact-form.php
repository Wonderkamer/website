<?php

use Dotenv\Dotenv;
use Laminas\Mail;
use Laminas\Mail\Transport\Smtp as SmtpTransport;
use Laminas\Mail\Transport\SmtpOptions;
use ReCaptcha\ReCaptcha;

require_once('vendor/autoload.php');

(function (): void {
    try {
        $env = Dotenv::createImmutable( __DIR__);
        $env->load();

    } catch (\RuntimeException $e) {
        $responseJson = [];
        $responseJson['error'] = 'Er kon helaas geen e-mail verzonden worden';
        $responseJson['detail'] = $e->getMessage();

        header('Content-Type: application/json');
        exit(json_encode($responseJson));
    }
})();

// Redirect to HTTPS by default (for AppEngine)
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
    if ($_SERVER['HTTP_X_FORWARDED_PROTO'] === 'http') {
        header('HTTP/1.1 301 Moved Permanently');
        header('Location: https://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']);
        exit(0);
    } else {
        header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
        header('Access-Control-Allow-Origin: *');
    }
}

$transport = new SmtpTransport();
$transport->setOptions(new SmtpOptions([
    'host'              => 'mail.bushbaby.nl',
    'connection_class'  => 'login',
    'connection_config' => [
        'username' => $_ENV['CONTACT_FORM_RECIPIENT'],
        'password' => $_ENV['SMTP_PASSWORD'],
    ],
]));

$data = json_decode(file_get_contents('php://input'), true);

$reCaptchaResponse = (new ReCaptcha($_ENV['GOOGLE_RECAPTCHA_SECRET']))
    ->setExpectedHostname($_SERVER['SERVER_NAME'])
    ->verify($data['reCaptchaToken'], $_SERVER['REMOTE_ADDR']);

if (! $reCaptchaResponse->isSuccess()) {
    foreach ($reCaptchaResponse->getErrorCodes() as $code) {
        $responseJson['error'] = 'Er kon helaas geen e-mail verzonden worden';
        $responseJson['detail'] = $code;
    }

    print json_encode($responseJson);
    exit();
}

$name = $data['name'] ?: 'none';
$subject = $data['subject'] ?: 'none';
$message = $data['message'] ?: 'none';
$email = $data['email'] ?: 'none';
$phone = $data['phone'] ?: 'none';

try {
    $mailToUs = new Mail\Message();

    $body = <<<EOT
Er is een bericht via het contactformulier van de wonderkamer.com website...

Van : $name
Via : $email
    : $phone
Onderwerp : $subject
Bericht : 

$message
EOT;

    $mailToUs->setBody($body);
    $mailToUs->setFrom($_ENV['CONTACT_FORM_RECIPIENT']);
    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $mailToUs->setReplyTo($data['email']);
    }
    $mailToUs->addTo($_ENV['CONTACT_FORM_RECIPIENT'], 'Wonderkamer');
    $mailToUs->setSubject('[wonderkamer.com] contact verzoek');

    $transport->send($mailToUs);

    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $mailToInquirer = new Mail\Message();

        $body = <<<EOT
Wat leuk van je te horen! Wij nemen zo snel mogelijk contact met je op.

Met vriendelijke groet,

Wonderkamer
EOT;

        $mailToInquirer->setBody($body);
        $mailToInquirer->setFrom($_ENV['CONTACT_FORM_RECIPIENT'], 'Wonderkamer');
        $mailToInquirer->addTo($data['email'], $data['name']);
        $mailToInquirer->setSubject('[wonderkamer.com] contact verzoek');

        $transport->send($mailToInquirer);
    }

    $responseJson['success'] = true;

} catch (\Exception $e) {
    $responseJson['error'] = 'Er kon helaas geen e-mail verzonden worden';
    $responseJson['detail'] = $e->getMessage();
}

print json_encode($responseJson);
