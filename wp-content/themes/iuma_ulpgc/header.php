<html lang="es">
<head>
  <meta charset="utf-8">
  <title><?php wp_title(); ?></title>

  <!--jquery
	<script src="https://www2.ulpgc.es/js/jquery-latest.js"></script>-->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

	<!--ulpgc style-->
	<link rel="stylesheet" type="text/css" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />

  <!--table-->
  <link rel="stylesheet" href="https://designsystem.ulpgc.es/code/tablesaw/tablesaw.css">
  
	<!--carrusel-->
	<link rel="stylesheet" type="text/css" href="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.css"/>
	<!--ORIGINAL CON ERRORES
  <script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.min.js"></script>-->
	<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.js"></script>

  <!--<style>@import url("https://www.ulpgc.es/sites/all/themes/ulpgc/css/ulpgcdsmerge.css?s45qgo");</style>-->
    
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <?php wp_body_open(); ?>
  <header class="ulpgcds-header">

    <div class="ulpgcds-header__top">		
      <div class="ulpgcds-header__top__logo">
        <!--<img src="<?php echo get_template_directory_uri(); ?>/images/logo/iuma_rev_hc.png" alt="IUMA">-->
        <a href="https://www.ulpgc.es" target="_blank">
          <span>ULPGC</span>
        </a>
        <a href="/" title="Inicio">
          <span>IUMA - Instituto Universitario de Microelectrónica Aplicada</span>
        </a>
      </div>    
      <div class="ulpgcds-header__top__links">              
        <ul>
          <!--<li class="hidden-mobile">
            <a href="https://webmail.iuma.ulpgc.es/" class="ulpgcds-btn ulpgcds-btn--text">
              <span class="ulpgcds-btn__icon ulpgcds-icon-envelope" aria-hidden="true"></span>Correo IUMA
            </a>
          </li>-->
          <li class="hidden-mobile">
            <a href="https://www.ulpgc.es/" class="ulpgcds-btn ulpgcds-btn--text">
              <span class="ulpgcds-btn__icon ulpgcds-icon-ulpgc" aria-hidden="true"></span>ULPGC
            </a>
          </li>
          <li class="hidden-mobile">
            <a href="<?php echo esc_url(get_permalink(get_page_by_path('aviso-legal'))); ?>" class="ulpgcds-btn ulpgcds-btn--text">
              <span class="ulpgcds-btn__icon ulpgcds-icon-book" aria-hidden="true"></span>Legal
            </a>
          </li>                    
          <li>
            <a href="https://webmail.iuma.ulpgc.es/" class="ulpgcds-btn ulpgcds-btn--small ulpgcds-btn--primary">
              <span class="ulpgcds-btn__icon ulpgcds-icon-envelope" aria-hidden="true"></span>Correo IUMA
            </a>
          </li>
          <li>
            <a class="nav-toggle hidden-desktop ulpgcds-btn ulpgcds-btn--small ulpgcds-btn--secondary" href="#">
              <span class="ulpgcds-btn__icon ulpgcds-icon-menu" aria-hidden="true"></span>Menú
            </a>
          </li>
        </ul>	                                                
      </div>
    </div>
    <?php get_ulpgc_header_nav_menus('HeaderMenu'); ?>
    
    <?php
    if (has_nav_menu('primary')) {
      wp_nav_menu(array(
        'theme_location' => 'primary',
        //'container' => 'nav',
        //'menu_class' => 'ulpgcds-header__bottom',
        //'menu_id' => 'header-menu',

        //'container_class' => 'ulpgcds-header__bottom__menu',
        //'container_id' => ,
        //'items_wrap' => '<ul class="ulpgcds-header__bottom__menu"><li id="item-id"></li>%3$s</ul>', // Personaliza el contenedor de la lista
      ));
    }
    ?>

  </header>