<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\Base;

use \Inc\Base\BaseController;
use \Inc\Base\ServiceInterface;

/**
 * 
 */
class Enqueue extends BaseController implements ServiceInterface
{
    public function register() 
    {
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue') );
    }

    public function enqueue() 
    {
        // enqueue all our scripts
        wp_enqueue_media(); #It isn't necessary but... (Just for media fields)
        wp_enqueue_style('iuma_style', $this->plugin_url . '/assets/iuma-plugin.css');
        wp_enqueue_script('iuma_script', $this->plugin_url . '/assets/iuma-plugin.js');
        wp_enqueue_script('jquery_validate', $this->plugin_url . '/assets/validation/jquery.validate.min.js', array('jquery'));
    }
}