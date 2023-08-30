<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomSQLTable;

use \Inc\Utils\OptionFields;

class CustomSQLTableOptions 
{
    public static function sanitize( $input ) 
    {
        return $input;
    }

    public static function getDatabaseManagementFields($option_name, $page, $section)
    {
        return array(
            array(
                'id' => 'db_ip',
                'title' => 'Database IP',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_ip',
                    'placeholder' => 'eg. 127.0.0.1'
                )
            ),
            array(
                'id' => 'db_port',
                'title' => 'Database Port',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_port',
                    'placeholder' => 'eg. 3306'
                )
            ),
            array(
                'id' => 'db_name',
                'title' => 'Database Name',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_name',
                    'placeholder' => 'eg. personal'
                )
            ),
            array(
                'id' => 'db_user',
                'title' => 'Database Username',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_user',
                    'placeholder' => 'eg. root'
                )
            ),
            array(
                'id' => 'db_passwd',
                'title' => 'Password',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_passwd',
                    'type' => 'password'
                )
            ),
            array(
                'id' => 'db_sql_query',
                'title' => 'SQL Query',
                'callback' => array( OptionFields::class, 'textareaField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'db_sql_query',
                    'placeholder' => 'SELECT * FROM table_name'
                )
            )
        );
    }

    public static function getViewFields($option_name, $page, $section, $args)
    {
        $fields = array(
            array(
                'id' => 'hash_id',
                'title' => 'Hash',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => $option_name,
                    'label_for' => 'hash_id',
                    'value' => $args['hash']
                )
            )
        );

        $idx = 0;
        foreach ($args['data'] as $grp)
        {
            $tmp = array(
                array(
                    'id' => sprintf('view_grp_name_%d', $idx),
                    'title' => '',
                    'callback' => array( OptionFields::class, 'textField' ),
                    'page' => $page,
                    'section' => $section,
                    'args' => array(
                        'option_name' => $option_name,
                        'label_for' => 'view_grp',
                        'type' => 'hidden',
                        'idx' => sprintf('[%d][name]', $idx),
                        'value' => $args['data'][$idx]['Name']
                    )
                ),
                array(
                    'id' => sprintf('view_grp_fields_%d', $idx),
                    'title' => '',
                    'callback' => array( OptionFields::class, 'textField' ),
                    'page' => $page,
                    'section' => $section,
                    'args' => array(
                        'option_name' => $option_name,
                        'label_for' => 'view_grp',
                        'type' => 'hidden',
                        'idx' => sprintf('[%d][fields]', $idx),
                        'value' => $args['data'][$idx]['Fields']
                    )
                )
            );

            $idx++;
            $fields = array_merge($fields, $tmp);
        }

        return $fields;
    }
}
