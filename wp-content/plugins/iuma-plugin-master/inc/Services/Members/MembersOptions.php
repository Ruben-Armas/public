<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\Members;

use \Inc\Utils\OptionFields;

/**
 * 
 */
class MembersOptions
{
    public $database_option = array();
    public $visualization_option = array();

    public function __construct($page, $db_section, $view_section)
    {
        $this->setDatabaseFields($page, $db_section);
        $this->setVisualizationFields($page, $view_section);
    }

    /**
     * returns all option fields concatenated in one array
     * 
     * @return array
     */
    public function getFields(){
        return array_merge($this->database_option, $this->visualization_option);
    }

    public function sanitize( $input ) 
    {
        $output = array();

        foreach ($this->$database_option as $option)
        {
            $option_id = $option['id'];
            $output[$option_id] = isset($input[$option_id]) ? $input : "";
            $output[$option_id] ="";
        }

        foreach ($this->visualization_option as $option)
        {
            $option_id = $option['id'];
            $output[$option_id] = isset($input[$option_id]) ? true : false;
        }

        return $output;
    }

    private function setDatabaseFields($page, $section)
    {
        $this->database_option = array(
            array(
                'id' => 'db_ip',
                'title' => 'Database IP',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => 'iuma_plugin_members',
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
                    'option_name' => 'iuma_plugin_members',
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
                    'option_name' => 'iuma_plugin_members',
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
                    'option_name' => 'iuma_plugin_members',
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
                    'option_name' => 'iuma_plugin_members',
                    'label_for' => 'db_passwd',
                    'type' => 'password'
                )
            )
        );
    }

    private function setVisualizationFields($page, $section)
    {
        $this->visualization_option = array(
            array(
                'id' => 'show_email',
                'title' => 'Email',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => 'iuma_plugin_members',
                    'label_for' => 'show_email'
                )
            ),
            array(
                'id' => 'show_job_position',
                'title' => 'Job position',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => 'iuma_plugin_members',
                    'label_for' => 'show_job_position'
                )
            ),
            array(
                'id' => 'show_phone',
                'title' => 'Phone Number',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => 'iuma_plugin_members',
                    'label_for' => 'show_phone'
                )
            ),
            array(
                'id' => 'show_contact',
                'title' => 'Contact Button',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => $page,
                'section' => $section,
                'args' => array(
                    'option_name' => 'iuma_plugin_members',
                    'label_for' => 'show_contact'
                )
            )
        );
    }
}
