<?php /* Template Name: Entrada */ ?>

<?php get_header(); ?>

<main class="main-content-web">

  <div class="main-section">
    <h1 class="page-title"><?php the_title(); ?></h1>
    <?php the_content(); ?>

    <p> </p>  <!--Separador provisional-->

    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <?php
        // Comprobar si estás en una categoría
        if (is_category()) {
          $category = get_queried_object();
          $category_id = $category->cat_ID;

          // Consulta de WordPress para obtener los posts en la categoría actual
          $args = array(
            'cat' => $category_id,
            'posts_per_page' => 1, // Cambia esto según tus necesidades
            'post_type' => 'post',
            'order' => 'ASC', // 'ASC' para "Post anterior", 'DESC' para "Post siguiente"
          );

          $category_query = new WP_Query($args);

          if ($category_query->have_posts()) {
            while ($category_query->have_posts()) {
              $category_query->the_post();
              // Aquí puedes mostrar el contenido de tu post
              the_title(); // Muestra el título del post
              the_content(); // Muestra el contenido del post
            }
          }
          wp_reset_postdata();
        }
        ?>

        <div class="navigation">
          <div class="alignleft"><?php next_post_link('%link', 'Post siguiente', true); ?></div>
          <div class="alignright"><?php previous_post_link('%link', 'Post anterior', true); ?></div>
        </div>
      </main>
    </div>
    
  </div>
</main>

<?php get_footer(); ?>