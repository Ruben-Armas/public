<?php /* Template Name: Título y menú de navegación lateral */ ?>

<?php get_header(); ?>

<main class="main-content-web">
  <!--Migas_De_Pan-->
  <?php get_ulpgc_breadcrumb(); ?>  
  <!--Navegacion_Lateral-->
  <?php
    get_ulpgc_submenu_sidebar(
        get_post_meta(get_the_ID(), 'slug_menu', true),
        get_post_meta(get_the_ID(), 'title_menu', true)
    );
  ?>

  <div class="main-section">
    <h1 class="page-title"><?php the_title(); ?></h1>
    <?php the_content(); ?>

    <p> </p>  <!--Separador provisional-->
  </div>
</main>

<?php get_footer(); ?>