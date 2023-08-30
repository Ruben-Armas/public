<?php
/**
 * The notice displayed in the admin dashboard if some required plugins are inactive
 *
 * @package IUMAPlugin
 */

/** @var string[] $missing_plugin_names Names of the missing plugins. */

?>

<div class="error notice">
	<p>
		<?php
			printf(
				wp_kses(
					/* translators: %s: Comma-separated list of inactive plugin names */
					__(
						'<strong>Error:</strong> The <em>IUMA plugin</em> cannot execute because'
						. ' the following required plugins are not active: %s. Please activate these plugins.',
						'check-plugin-dependencies'
					),
					array(
						'strong' => array(),
						'em'     => array(),
					)
				),
				esc_html( implode( ', ', $missing_plugin_names ) )
			);
		?>
	</p>
</div>