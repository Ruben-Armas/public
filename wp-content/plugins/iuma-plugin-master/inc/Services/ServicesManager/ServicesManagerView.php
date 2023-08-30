<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\ServicesManager;

class ServicesManagerView
{

    private $plugin_path;
    private $plugin_url;

    public function __construct($plugin_path, $plugin_url)
    {
        $this->plugin_path = $plugin_path;
        $this->plugin_url = $plugin_url;
    }

    public function adminSectionManager()
    {
        echo 'In this dashboard, the different features can be enabled or disabled';
    }

    public function dashboardPage()
    {
        require_once( "$this->plugin_path/templates/admin.php" );
    }
}