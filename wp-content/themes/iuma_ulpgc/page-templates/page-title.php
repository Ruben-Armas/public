<?php /* Template Name: Título */ ?>

<?php get_header(); ?>

<main class="main-content-web">
  <!--Migas_De_Pan-->
  <?php get_ulpgc_breadcrumb(); ?>

  <div class="main-section">
    <h1 class="page-title"><?php the_title(); ?></h1>
    <?php the_content(); ?>

    <p> </p>  <!--Separador provisional-->
  </div>
</main>

<?php get_footer(); ?>