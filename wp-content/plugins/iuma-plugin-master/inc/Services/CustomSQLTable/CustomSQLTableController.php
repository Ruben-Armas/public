<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomSQLTable;

use \Inc\Base\BaseController;
use \Inc\Base\ServiceWithOptionsInterface;

/**
 * 
 */
class CustomSQLTableController extends BaseController implements ServiceWithOptionsInterface
{
    private $view;

    public function register()
    {
        if ( ! $this->activated('cst_manager') )
            return;

        $this->view = new CustomSQLTableView($this->plugin_path, $this->plugin_url);
        
        $this->setPages();
        $this->setSettings();
        $this->setSections();
        $this->setFields();
        
        $this->settings->register();

        add_shortcode( 'iuma-custom-table', array($this, 'customTable') );
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue') );
        add_action( 'wp_ajax_dcms_ajax_cstview', array($this, 'dcmsSetViewFields') );
    }

    public function customTable()
    {
        return $this->view->cstTable();
    }

    public function setPages()
    {
        $pages[] = array(
            'page_title' => 'Custom SQL Table Visualization', 
            'menu_title' => 'SQL Table View',
            'capability' => 'manage_options',
            'menu_slug' => 'iuma_cst_view', 
            'callback' => array($this->view, 'viewConfigPage'),
            'icon_url' => 'dashicons-grid-view',
            'position' =>  113
        );

        $subpages = array(
            array(
                'parent_slug' => $this->main_menu_slug,
                'page_title' => 'IUMA Custom SQL Table', 
                'menu_title' => 'SQL Table',
                'capability' => 'manage_options',
                'menu_slug' => 'iuma_cst', 
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
                'option_group' => 'iuma_plugin_cst_settings',
                'option_name' => 'iuma_plugin_cst',
                'callback' => array( CustomSQLTableOptions::class, 'sanitize' ) # Not working
            ),
            array(
                'option_group' => 'iuma_plugin_cst_view_settings',
                'option_name' => 'iuma_plugin_cst_view',
                'callback' => array( CustomSQLTableOptions::class, 'sanitize' ) # Not working
            )
        );

        $this->settings->setSettings( $args );
    }

    public function setSections()
    {
        $args = array(
            array(
                'id' => 'iuma_plugin_cst',
                'title' => 'Database Manager',
                'callback' => array( $this->view, 'databaseSection'),
                'page' => 'iuma_cst'
            ),
            array(
                'id' => 'iuma_plugin_cst_view',
                'title' => 'View Configuration',
                'callback' => "",
                'page' => 'iuma_cst_view'
            )
        );

        $this->settings->setSections( $args );

    }

    public function setFields()
    {
        $database_fields = CustomSQLTableOptions::getDatabaseManagementFields('iuma_plugin_cst', 'iuma_cst', 'iuma_plugin_cst');
        $this->settings->setFields( $database_fields );  
    }

    public function enqueue()
    {
        wp_register_script('iuma_cst_view_script', $this->plugin_url . "assets/cst/cst-view-config.js", array('jquery'));

        wp_localize_script('iuma_cst_view_script','dcms_vars', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce( 'iuma-nonce' )
        ));
    }

    /**
     * This function is only accessible by ajax
     */
    public function dcmsSetViewFields()
    {
        $args = array('hash' => $_POST['hash'], "data" => $_POST['data']);
        $this->view_fields = CustomSQLTableOptions::getViewFields('iuma_plugin_cst_view',
                                 'iuma_cst_view', 'iuma_plugin_cst_view', $args);
            
        // add setting field
        foreach ($this->view_fields as $field)
        {
            add_settings_field( $field['id'], $field['title'], ( isset($field['callback']) ? $field['callback'] : '' ), 
                $field['page'], $field['section'], ( isset($field['args']) ? $field['args'] : '' ) );
        }
    
        ob_start();
            do_settings_sections( 'iuma_cst_view' );
            submit_button();
        ob_get_flush();

        wp_die(); #Force to stop
    }
}