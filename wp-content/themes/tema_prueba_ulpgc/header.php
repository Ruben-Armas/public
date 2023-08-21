<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!DOCTYPE html>
<html <?php language_attributes(); ?>
    <head>
        HEAD---
        <title><?php bloginfo('name'); ?> &raquo; <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
        
        <link type="text/css" rel="stylesheet" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />
        <!--<link type="text/css" rel="stylesheet" href="https://mysite.ulpgc.es/css/ulpgcds-custom.css" media="all" />-->
        
        <?php wp_head(); ?>
        ---/HEAD
    </head>
    
    <body <?php body_class(); ?>>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js?v=1.0"></script>
        BODY---
        <header class="my-logo">
            <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo('name'); ?></a></h1>
        </header>
        <?php wp_nav_menu( array( 'header-menu' => 'header-menu' ) ); ?>
        ---/BODY