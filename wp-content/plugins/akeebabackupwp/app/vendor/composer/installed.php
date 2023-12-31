<?php return array(
    'root' => array(
        'name' => 'akeeba/solo',
        'pretty_version' => 'dev-main',
        'version' => 'dev-main',
        'reference' => 'e5c33bda4a26704d07858b04a59f777d5668f538',
        'type' => 'project',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'akeeba/awf' => array(
            'pretty_version' => 'dev-development',
            'version' => 'dev-development',
            'reference' => '0a07d418bab55f1473979de2783c07ee10ddca9f',
            'type' => 'library',
            'install_path' => __DIR__ . '/../akeeba/awf',
            'aliases' => array(
                0 => '9999999-dev',
            ),
            'dev_requirement' => false,
        ),
        'akeeba/solo' => array(
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'e5c33bda4a26704d07858b04a59f777d5668f538',
            'type' => 'project',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'composer/ca-bundle' => array(
            'pretty_version' => '1.3.6',
            'version' => '1.3.6.0',
            'reference' => '90d087e988ff194065333d16bc5cf649872d9cdb',
            'type' => 'library',
            'install_path' => __DIR__ . '/./ca-bundle',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'phpmailer/phpmailer' => array(
            'pretty_version' => 'v6.8.0',
            'version' => '6.8.0.0',
            'reference' => 'df16b615e371d81fb79e506277faea67a1be18f1',
            'type' => 'library',
            'install_path' => __DIR__ . '/../phpmailer/phpmailer',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
    ),
);
