<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\Members;

use \Inc\Utils\OptionFields;
use \Inc\Base\BaseController;
use \Inc\Base\ServiceWithOptionsInterface;


/**
 * This controller is used in order to list the 
 * members from IUMA.
 */
class MembersController extends BaseController implements ServiceWithOptionsInterface
{
    public $options;
    public $view;

    public function register()
    {
        if ( ! $this->activated('members_manager') )
            return;

        $this->view = new MembersView($this->plugin_path, $this->plugin_url);

        $this->setPages();
        $this->setSettings();
        $this->setSections();

        $this->options = new MembersOptions('iuma_members', 'iuma_members_database', 'iuma_members_view');

        $this->setFields();

        $this->settings->register();

        add_shortcode( 'iuma-members', array($this, 'membersTable') );
    }

    public function membersTable( $atts )
    {
        $shortcode_attributes = shortcode_atts( array (
            'division' => 'ALL'
            ), $atts );

        return $this->view->membersTable($shortcode_attributes);
    }

    public function setPages()
    {
        $pages[] = array(
            'page_title' => 'IUMA Members Shortcode', 
            'menu_title' => 'IUMA Members',
            'capability' => 'manage_options', // Just for admin!
            'menu_slug' => 'iuma_members_shortcode', 
            'callback' => array($this->view, 'shortcodePage'),
            'icon_url' => 'dashicons-admin-users',
            'position' =>  112
        );

        $subpages = array(
            array(
                'parent_slug' => $this->main_menu_slug, //It has to be the menu_slug of a page
                'page_title' => 'IUMA Members', 
                'menu_title' => 'Members',
                'capability' => 'manage_options',
                'menu_slug' => 'iuma_members', 
                'callback' => array($this->view, 'administrationPage')
            )
        );

        $this->settings->addPages($pages);
        $this->settings->addSubPages($subpages);
    }

    public function setSettings()
    {
        $args = array(
            array(
                'option_group' => 'iuma_plugin_members_settings',
                'option_name' => 'iuma_plugin_members',
                'callback' => array( $this->options, 'sanitize' ) # Not working
            )
        );
        
        $this->settings->setSettings( $args );
    }

    public function setSections()
    {
        $args = array(
            array(
                'id' => 'iuma_members_database',
                'title' => 'Members Manager',
                'callback' => array( $this->view, 'databaseSection'),
                'page' => 'iuma_members'
            ),
            array(
                'id' => 'iuma_members_view',
                'title' => 'Visualization',
                'callback' => array( $this->view, 'visualizationSection'),
                'page' => 'iuma_members'
            )
        );

        $this->settings->setSections( $args );
    }

    public function setFields()
    {
        $args = $this->options->getFields();

        $this->settings->setFields( $args );
    }
}