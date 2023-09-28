<?php /* Template Name: Título, Menú de navegación y Panel de suscripción lateral */ ?>

<?php get_header(); ?>

<main class="main-content-web">
  <!--Migas_De_Pan-->
  <?php get_ulpgc_breadcrumb(); ?>
  <!--Menú de Navegacion_Lateral y Panel_de_Suscripción-->
  <?php
    get_submenu_suscriptionPanel_sidebar(
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