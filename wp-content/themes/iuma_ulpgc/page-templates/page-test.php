<?php /* Template Name: Página test */ ?>

<?php get_header(); ?>

<main class="main-content-web">

  <div class="main-section">
    <?php the_content(); ?>

    <?php
    // Obtén el número de página actual
    $page = (get_query_var('paged')) ? get_query_var('paged') : 1;

    // Establece el número de elementos por página
    $elements_per_page = 2;

    // Calcula el offset
    $offset = ($page - 1) * $elements_per_page;

    // Realiza la consulta para obtener los elementos
    $args = array(
      'post_type' => 'post',  // Cambia 'post' por el tipo de contenido que desees mostrar
      'posts_per_page' => $elements_per_page,
      'offset' => $offset,
    );

    $the_query = new WP_Query($args);

    // Muestra los elementos
    if ($the_query->have_posts()) {
      $defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';
      $output = "<div class='row list_category'>";
      while ($the_query->have_posts()) {
        $the_query->the_post();
        // Obtén la imagen destacada
        $thumbnail_id = get_post_thumbnail_id();
        $thumbnail_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
        // Aquí muestra cada elemento
        //echo '<h2>' . get_the_title() . '</h2>';
        $output .= 
          "<div class='col-12 list_category_item container_row'>
            <article class='ulpgcds-article ulpgcds-article--short row resize_article_row'>
              <div class='col-4 col-img'>
                <a class='list_link' href=". get_post_permalink() .">
        ";
        $output .= get_the_post_thumbnail_url() ? 
                  "<img class='list_img' alt='$thumbnail_alt' src=". get_the_post_thumbnail_url() ." />"
                : "<img class='list_img' src='$defaultImage' alt='Imagen por defecto'>";

        $output .= "
                </a>
              </div>
              <div class='col-8 col-content'>
                <a class='list_link' href=". get_post_permalink() .">
                  <h3 class='list_title'>". get_the_title() ."</h3>
                  <div class='ulpgcds-article__date list_date'>s". getFormattedDate_List(get_the_date()) ."</div>
                </a>
                <p class='list_content'>". get_the_excerpt() ."</p>
              </div>
            </article>
          </div>
        ";
        // Puedes mostrar más detalles de cada elemento según tus necesidades
      }
      $output .= "</div>";
      echo $output;
        
      // Muestra la paginación
      $total_pages = ceil($the_query->found_posts / $elements_per_page);
      echo paginate_links(array(
        'total' => $total_pages,
        'current' => $page,
        'prev_text' => '«',
        'next_text' => '»',
      ));
    } else {
      // Si no hay elementos
      echo 'No se encontraron elementos.';
    }

    // Restaura las consultas originales de WordPress
    wp_reset_postdata();
    ?>


  </div>
</main>

<?php get_footer(); ?>