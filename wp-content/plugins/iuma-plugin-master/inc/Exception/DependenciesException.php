<?php
/**
 * @package IUMAPlugin
 * 
 * This class is based on 
 *  https://github.com/waclawjacek/code-examples/tree/master/check-plugin-dependencies
 */

namespace Inc\Exception;

/**
 * Indicates that plugin dependencies were not met.
 *
 * Holds the names of the plugins that are our plugin depends on that are not active.
 */
class DependenciesException extends Exception 
{
    /**
	 * Names of the plugins that are required but are inactive.
	 *
	 * @var string[]
	 */
	private $missing_plugin_names;

	/**
	 * Missing_Dependencies_Exception constructor.
	 *
	 * @param string[] $missing_plugin_names Names of the plugins that our plugin depends on,
	 *                                       that were found to be inactive.
	 */
	public function __construct( $missing_plugin_names ) {
		parent::__construct();
		$this->missing_plugin_names = $missing_plugin_names;
	}

	/**
	 * Returns the list of names of plugins that are required but are inactive.
	 *
	 * @return string[] Names of the plugins that are required but are inactive.
	 */
	public function get_missing_plugin_names() {
		return $this->missing_plugin_names;
	}
}
