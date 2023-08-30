<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\ServicesManager;

use \Inc\Base\BaseController;
use \Inc\Base\ServiceWithOptionsInterface;

/**
 * 
 */
class ServicesManagerController extends BaseController implements ServiceWithOptionsInterface
{
    private $view_mngr;
    private $option_mngr;

    public function register() 
    {
        $this->view_mngr = new ServicesManagerView($this->plugin_path, $this->plugin_url);
        $this->option_mngr = new ServicesManagerOptions();
        
        $this->setPages();
        $this->setSettings();
        $this->setSections();
        $this->setFields();

        $this->settings->register();
    }

    public function setPages()
    {
        $pages = array(
            array(
                'page_title' => 'IUMA Plugin', 
                'menu_title' => 'IUMA',
                'capability' => 'manage_options', // Just for admin!
                'menu_slug' => $this->main_menu_slug, 
                'callback' => array($this->view_mngr, 'dashboardPage'),
                'icon_url' => 'dashicons-store',
                'position' =>  110
            )
        );

        $this->settings->addPages( $pages )->withSubPage('Dashboard');
    }

    public function setSettings()
    {
        $args = array(
            array(
                'option_group' => 'iuma_plugin_settings',
                'option_name' => 'iuma_plugin',
                'callback' => array( $this->option_mngr, 'sanitize')
            )
        );
        
        $this->settings->setSettings( $args );
    }

    public function setSections()
    {
        $args = array(
            array(
                'id' => 'iuma_admin_index',
                'title' => 'Settings Manager',
                'callback' => array( $this->view_mngr, 'adminSectionManager'),
                'page' => 'iuma_plugin'
            )
        );

        $this->settings->setSections( $args );
    }

    public function setFields()
    {
        $this->settings->setFields( $this->option_mngr->getFields() );
    }
}