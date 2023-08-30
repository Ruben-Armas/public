<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\Base;

use \Inc\Base\BaseController;
use \Inc\Base\ServiceInterface;

/**
 * This class defines the links which will be appear in the 
 * plugin panel (where you activate/deactivate the plugins).
 */
class SettingsLinks extends BaseController implements ServiceInterface
{
    public function register()
    {
        add_filter( "plugin_action_links_$this->plugin", array( $this, 'settings_link' ) );
    }

    public function settings_link( $links )
    {
        // Add custom settings link
        $settings_link = '<a href="admin.php?page=iuma_plugin">Settings</a>';
        array_push( $links, $settings_link );
        return $links;
    }
 }