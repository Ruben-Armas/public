<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomPostType;

class CustomPostTypeView
{
    private $plugin_path;
    private $plugin_url;

    public function __construct($plugin_path, $plugin_url)
    {
        $this->plugin_path = $plugin_path;
        $this->plugin_url = $plugin_url;
    }

    public function administrationPage()
    {  
        require_once( "$this->plugin_path/templates/customposttype/admin.php" );
    }

    public function cptSectionManager()
    {
        echo 'Manage your Custom Post Types';
    }
}