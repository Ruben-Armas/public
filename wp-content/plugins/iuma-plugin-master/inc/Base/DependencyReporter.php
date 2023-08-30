<?php
/**
 * @package IUMAPlugin
 * 
 * This class is based on 
 *  https://github.com/waclawjacek/code-examples/tree/master/check-plugin-dependencies
 */

namespace Inc\Base;

use \Inc\Base\BaseController;

 /**
 * Displays a notice about unmet plugin dependencies in the admin dashboard.
 */
class DependencyReporter extends BaseController
{
    /**
	 * The capability required to see the "unmet plugin dependencies" notice.
	 *
	 * @var string
	 */
	const CAPABILITY_REQUIRED_TO_SEE_NOTICE = 'activate_plugins';

    /**
	 * Names of the plugins that are required but are not active.
	 *
	 * @var string[]
	 */
    private $missing_plugin_names;
    
    /**
     *  @param string[] $missing_plugin_names Names of the plugins that are required but are not active.
     */
    public function __construct( $missing_plugin_names ) {
        parent::__construct();
		$this->missing_plugin_names = $missing_plugin_names;
	}

    /**
	 * Hook into the admin dashboard hook for displaying notices.
	 */
	public function init() {
		add_action( 'admin_notices', array( $this, 'display_admin_notice' ) );
    }
    
    /**
	 * Render the "missing plugins" template if the current user has the required capability.
	 */
	public function display_admin_notice() {
		if ( current_user_can( self::CAPABILITY_REQUIRED_TO_SEE_NOTICE ) ) {
			$this->render_template();
		}
    }
    
    /**
	 * Includes the view template for display.
	 *
	 * Defines the `$missing_plugin_names` variable so the view can conveniently access it.
	 */
	private function render_template() {
		$missing_plugin_names = $this->missing_plugin_names;

		/**
		 * The notice informing of plugin dependencies not being met.
		 */
        require_once("$this->plugin_path/templates/missing_dependencies_notice.php");
	}
}