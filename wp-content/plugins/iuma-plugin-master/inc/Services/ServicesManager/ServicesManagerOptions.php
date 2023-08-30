<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\ServicesManager;

use \Inc\Utils\OptionFields;
use \Inc\Base\BaseController;

class ServicesManagerOptions extends BaseController
{
    public function sanitize( $input )
    {
        $output = array();
        foreach ($this->managers as $key => $value)
        {
            $output[$key] = isset($input[$key]) ? true : false;
        }
        return $output;
    }

    public function getFields()
    {
        $fields = array();
        foreach ($this->managers as $key => $value)
        {
            $fields[] = array(
                'id' => $key,
                'title' => $value,
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => 'iuma_plugin',
                'section' => 'iuma_admin_index',
                'args' => array(
                    'option_name' => 'iuma_plugin',
                    'label_for' => $key
                )
            );
        }

        return $fields;
    }
}