<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomPostType;

use \Inc\Utils\OptionFields;

class CustomPostTypeOptions
{
    public function sanitize( $input )
    {
        return $input;
    }

    public function getFields()
    {
        return array(
            array(
                'id' => 'post_type',
                'title' => 'Custom Post Type ID',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => 'iuma_cpt',
                'section' => 'iuma_cpt_index',
                'args' => array(
                    'option_name' => 'iuma_plugin_cpt',
                    'label_for' => 'post_type',
                    'placeholder' => 'eg. product'
                )
            ),
            array(
                'id' => 'singular_name',
                'title' => 'Singular Name',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => 'iuma_cpt',
                'section' => 'iuma_cpt_index',
                'args' => array(
                    'option_name' => 'iuma_plugin_cpt',
                    'label_for' => 'singular_name',
                    'placeholder' => 'eg. Product'
                )
            ),
            array(
                'id' => 'plural_name',
                'title' => 'Plural Name',
                'callback' => array( OptionFields::class, 'textField' ),
                'page' => 'iuma_cpt',
                'section' => 'iuma_cpt_index',
                'args' => array(
                    'option_name' => 'iuma_plugin_cpt',
                    'label_for' => 'plural_name',
                    'placeholder' => 'eg. Products'
                )
            ),
            array(
                'id' => 'public',
                'title' => 'Public',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => 'iuma_cpt',
                'section' => 'iuma_cpt_index',
                'args' => array(
                    'option_name' => 'iuma_plugin_cpt',
                    'label_for' => 'public',
                    'class' => 'ui-toggle'
                )
            ),
            array(
                'id' => 'has_archive',
                'title' => 'Has archive',
                'callback' => array( OptionFields::class, 'checkboxField' ),
                'page' => 'iuma_cpt',
                'section' => 'iuma_cpt_index',
                'args' => array(
                    'option_name' => 'iuma_plugin_cpt',
                    'label_for' => 'has_archive',
                    'class' => 'ui-toggle'
                )
            ),
        );
    }
}