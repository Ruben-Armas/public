<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Base;

use \Inc\Api\SettingsApi;

/**
 * This class contains typical declaration that you maybe
 * need in yout plugin. Any class which needs the followings
 * parameters has to extend from this base class. 
 * 
 *  * plugin_path: Path to the plugin directory
 *  * plugin_url: url to the plugin
 *  * plugin: Typical plugin name in wordpress [plugin name]/[plugin name].php
 */
class BaseController
{
    /**
     * Path to the plugin directory.
     * 
     * @var string
     */
    public $plugin_path;
    
    /**
     * URL to the plugin
     * 
     * @var string
     */
    public $plugin_url;

    /**
     * Typical plugin name in wordpress [plugin name]/[plugin name].php
     * 
     * @var string
     */
    public $plugin;

    /**
     * Services managers. It contains the name of the manages
     * which are used to activate/deactivate the services.
     * 
     * @var string[]
     */
    public $managers = array();

    /**
     * A instance of the SettingApi class which is used in order to
     * prepare for configuring services, such as pages or field setup.
     * 
     * @var \Inc\Api\SettingsApi 
     */
    protected $settings;

    // /**
    //  * The menu slug of the main page, the administration modular panel
    //  * @var string
    //  */
    protected $main_menu_slug;

    public function __construct()
    {
        $this->plugin_path = plugin_dir_path( dirname( __FILE__, 2) ); //Set to 2 level parent dir
        $this->plugin_url = plugin_dir_url( dirname( __FILE__, 2) );
        $this->plugin = plugin_basename( dirname( __FILE__, 3) ) . '/iuma-plugin.php';
        $this->main_menu_slug = "iuma_plugin";

        $this->managers = array(
            'cpt_manager' => 'Activate CPT Manager',
            'members_manager' => 'Activate Members manager',
            'cst_manager' => 'Activate Custom SQL Table'
        );

        $this->settings = new SettingsApi();
    }

    /**
     * This functions is used in order to control the managers
     * which are activated. 
     * 
     * @param $key Key identification of the managers, that keys are 
     *      represented on BaseController:managers
     * 
     * @return boolean returns 'true' if the manager is activated 
     *      and 'false' in any other case
     */
    public function activated( string $key )
    {
        $option = get_option( 'iuma_plugin' );
        return isset($option[$key]) ? $option[$key] : false;
    }
}