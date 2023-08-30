<?php
/**
 * @package IUMAPlugin
 * 
 * This class is based on 
 *  https://github.com/waclawjacek/code-examples/tree/master/check-plugin-dependencies
 */

namespace Inc\Base;

use \Inc\Exception\DependenciesException;

/**
 * Performs the actual check whether the required plugins are active.
 *
 * Plugins have to be both installed and active to pass the check.
 */
class DependencyChecker
{
    /**
	 * Define the plugins that our plugin requires to function.
	 *
	 * Example:
	 *
	 *    const REQUIRED_PLUGINS = array(
	 *        'Some Plugin'    => 'some-plugin/some-plugin.php',
	 *        'Another Plugin' => 'another-plugin/another-plugin.php',
	 *    );
	 *
	 * @var string[]
	 */

    const REQUIRED_PLUGINS = array(
		'Email Encoder' => 'email-encoder-bundle/email-encoder-bundle.php',
    );
    
    /**
	 * Check if all required plugins are active. If not, throw an exception.
	 *
	 * @throws DependenciesException
	 */
	public function check() {
		$missing_plugins = $this->get_missing_plugin_list();
		
		if ( ! empty( $missing_plugins ) ) {
			throw new DependenciesException( $missing_plugins );
		}
	}

	/**
	 * Iterates the list of required plugins and returns the names of inactive ones in array format.
	 *
	 * @return string[] Names of plugins that are required but are not active.
	 */
	private function get_missing_plugin_list() {
		$missing_plugins = array_filter(
			self::REQUIRED_PLUGINS,
			array( $this, 'is_plugin_inactive' ),
			ARRAY_FILTER_USE_BOTH
		);

		return array_keys( $missing_plugins );
	}

	/**
	 * Checks if a plugin's main file is absent from the list of active plugins' main files reported by WordPress.
	 *
	 * @param string $main_plugin_file_path Path to main plugin file, as defined in self::REQUIRED_PLUGINS.
	 * @return bool Whether a plugin is inactive.
	 */
	private function is_plugin_inactive( $main_plugin_file_path ) {
		return ! in_array( $main_plugin_file_path, $this->get_active_plugins() );
	}

	/**
	 * Gets the list of active plugins' main files from WordPress.
	 *
	 * @return string[] Returns an array of active plugins' main files.
	 */
	private function get_active_plugins() {
		return apply_filters( 'active_plugins', get_option( 'active_plugins' ) );
	}
}