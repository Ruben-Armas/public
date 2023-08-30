<?php
/**
 * @package IUMAPlugin
 */

/*
Plugin Name: IUMA Plugin
Plugin URI: https://git.iuma.ulpgc.es:8300/ahguedes/iuma-wordpress-plugin
Description: This is my first attempt on writing a custom Plugin.
Version: 0.9.0
Author: Abián Hernández
License: GPLv3
*/

// -------------------------------- Setup -------------------------------- //

if (! defined( 'ABSPATH') ) {
    die('No direct access.');
}

// Require Composer Autoloader
// It is necessary to use namespace and avoid to use several 'require_once'
if ( file_exists( dirname( __FILE__) . '/vendor/autoload.php' ) )
{
    require_once dirname( __FILE__) . '/vendor/autoload.php';
}

// ------------------ Dependencies Checking & Running ------------------- //

use \Inc\Base\DependencyChecker;
use \Inc\Base\DependencyReporter;
use \Inc\Exception\DependenciesException;

/**
 * Plugin execution.
 * 
 * Prepare the callbacks for activation/deactivation hooks and use Init::register_services()
 * in order to activate the plugin.
 */
function run()
{
    //activation
    register_activation_hook( __FILE__, array( Inc\Base\Activate::class, 'activate' ));

    //deactivation
    register_deactivation_hook( __FILE__, array( Inc\Base\Deactivate::class, 'deactivate' ));

    //uninstall
    // ....

    if ( class_exists('Inc\\Init') )
    {
        Inc\Init::register_services();
    }
}

/**
 * Instantiates and runs the Missing_Dependency_Reporter.
 *
 * Gets a list of missing plugins from the exception and feeds it to Missing_Dependency_Reporter.
 *
 * @param DependenciesException $e
 */
function displayMissingDependenciesNotice( DependenciesException $e ) {
    $dependency_reporter = new DependencyReporter( $e->get_missing_plugin_names() );
    $dependency_reporter->init();
}


$dependency_checker = new DependencyChecker();
try {
    $dependency_checker->check();
    run();
} catch (DependenciesException $e) {
    displayMissingDependenciesNotice($e);
}

// ---------------------------------------------------------------------- //