<?php
/**
 * The header for Astra Theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?><!DOCTYPE html>
<?php astra_html_before(); ?>
<html <?php language_attributes(); ?>>
	<head>
        HEAD---
		<?php astra_head_top(); ?>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="https://gmpg.org/xfn/11">

		<!--ulpgc style-->
		<link type="text/css" rel="stylesheet" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />
				
		<?php wp_head(); ?>
		<?php astra_head_bottom(); ?>
        ---/HEAD
	</head>

	<body <?php astra_schema_body(); ?> <?php body_class(); ?>>

		<!--ulpgc style-->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
		<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js?v=1.0"></script>
		BODY---
		<?php astra_body_top(); ?>
		<?php wp_body_open(); ?>

		<a
			class="skip-link screen-reader-text"
			href="#content"
			role="link"
			title="<?php echo esc_attr( astra_default_strings( 'string-header-skip-link', false ) ); ?>">
				<?php echo esc_html( astra_default_strings( 'string-header-skip-link', false ) ); ?>
		</a>

		<div
		<?php
			echo astra_attr(
				'site',
				array(
					'id'    => 'page',
					'class' => 'hfeed site',
				)
			);
		?>
		>
			<?php
			astra_header_before();

			astra_header();

			astra_header_after();

			astra_content_before();
			?>
			<div id="content" class="site-content">
				<div class="ast-container">
				<?php astra_content_top(); ?>
		---/BODY
