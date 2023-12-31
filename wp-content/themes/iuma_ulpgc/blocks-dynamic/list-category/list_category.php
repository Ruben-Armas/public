<?php

function display_pagination_large($elementsPerLargePagination, $url_base, $page, $total_pages) {
  $num_pages_to_show = $elementsPerLargePagination -2;  // Número total de páginas a mostrar
  $half_page_range = floor($num_pages_to_show / 2);
  $first_shown_page = max(1, $page - $half_page_range);
  $last_shown_page = min($total_pages, $first_shown_page + $num_pages_to_show - 1);
  $pag = '';

  // Mostrar el botón "inicio"
  if ($first_shown_page > 1) {
    $pag .= "
      <li class='ulpgcds-pager__item'>
        <a class='pagination__link' href='$url_base"."page/1/' title='Ir a la página de inicio'>1</a>
      </li>
    ";
    if ($first_shown_page > 2) {
      $pag .= "<li class='ulpgcds-pager__item ulpgcds-pager__item--ellipsis' role='presentation'>...</li>";
    }
  }

  // Mostrar las páginas
  for ($i = $first_shown_page; $i <= $last_shown_page; $i++) {
    $active_class = $i == $page ? ' ulpgcds-pager__item--is-active' : '';
    $pag .= "
      <li class='ulpgcds-pager__item$active_class'>
        <a class='pagination__link' href='$url_base"."page/$i/' title='Ir a la página $i'>
          $i
        </a>
      </li>
    ";
  }

  // Mostrar el botón "final"
  if ($last_shown_page < $total_pages) {
      if ($last_shown_page < $total_pages - 1) {
          $pag .= "<li class='ulpgcds-pager__item ulpgcds-pager__item--ellipsis' role='presentation'>...</li>";
      }
      $pag .= "
        <li class='ulpgcds-pager__item'>
          <a class='pagination__link' href='$url_base"."page/$total_pages/' title='Ir a la página final'>$total_pages</a>
        </li>
      ";
  }  

  return $pag;
}

function list_category_dynamic() {
  $blockPath = '/blocks-dynamic/list-category/list_category';
  $blockPath_phoneview = $blockPath . '_phone_view';

  // Registra el script
  wp_register_script(
    'listcategory-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el script para vista móvil
  wp_register_script(
    'listcategory-phoneview-js',
    get_template_directory_uri() . $blockPath_phoneview . '.js',
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'],
    filemtime(get_template_directory() . $blockPath_phoneview . '.js')
  );
  
  // Registra los estilos backend y frontend del bloque
  wp_register_style(
    'listcategory-style',
    get_template_directory_uri() . $blockPath . '.css',
    array(),
    filemtime( get_template_directory() . $blockPath . '.css' )
  );
  wp_enqueue_style( 'listcategory-style' );

  // Registra el bloque
  register_block_type( 'listcategory-block/my-block', [
    'editor_script' => 'listcategory-block-js',
    'render_callback' => 'listcategory_render',
    'attributes' => [
			'maxWords' => [
        'type' => 'number',
        'default' => 35
      ],
			'selectedCategory' => [
        'type' => 'int',
        'default' => 0,
      ],
      'pagination' => [
        'type' => 'boolean',
        'default' => false,
      ],
      'pagIndicator' => [
        'type' => 'boolean',
        'default' => false,
      ],
			'maxElementsPerPage' => [
        'type' => 'number',
        'default' => 7
      ],
			'elementsPerLargePagination' => [
        'type' => 'number',
        'default' => 5
      ],
      'isEditingBlock' => [
        'type' => 'boolean',
        'default' => false,
      ],
      // Flag para mostrar html diferente en el edit y el save(true)
      'isWebView' => [
        'type' => 'boolean',
        'default' => true,
      ]
		]
  ]);  
}
//add_action( 'enqueue_block_editor_assets', 'list_category_dynamic' );
add_action( 'init', 'list_category_dynamic' );


function getFormattedDate_List($date) {
  if ($date) {
    $dateTime = DateTime::createFromFormat('d/m/Y', $date);
    
    if ($dateTime) {
      $day = $dateTime->format('d');  // 'd' día CON / 'j' día SIN ceros iniciales
      $month = date_i18n('F', $dateTime->getTimestamp()); // 'F' representa el nombre completo del mes
      $year = $dateTime->format('Y'); // 'Y' representa el año con 4 dígitos
      $tmpFormattedDate = $day . ' <span>de ' . $month . ' de</span> ' . $year;
      return $tmpFormattedDate;
    } else {
      // Manejo de errores si la conversión falla
      return '';
    }
  } else {
    return '';
  }
}

function listcategory_render($attributes, $content) {
  $defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';

  $webView = $attributes['isWebView'];
  $numMaxWords = $attributes['maxWords'];
  $pagination = $attributes['pagination'];
  $pagIndicator = $attributes['pagIndicator'];
  $maxElementsPerPage = $attributes['maxElementsPerPage'];
  $elementsPerLargePagination = $attributes['elementsPerLargePagination'];

  // Obtén el número de página actual (page de la url)
  $page = (get_query_var('paged')) ? get_query_var('paged') : 1;

  // Calcula el offset
  $offset = ($page - 1) * $maxElementsPerPage;
  //var_dump($attributes['selectedCategory']);

  // Realiza la consulta para obtener los elementos
  $args = array(
    //'numberposts' => $attributes['maxPosts'],
    'cat'    => $attributes['selectedCategory'],
    'post_status' => 'publish',
    'post_type' => 'post',  // Cambia 'post' por el tipo de contenido que desees mostrar
    'posts_per_page' => $maxElementsPerPage,
    'offset' => $offset,
  );
  //var_dump('-----');

  $the_query = new WP_Query($args);
  //$the_query = new WP_Query();

  if (!$the_query->have_posts()) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }

  $total_posts = $the_query->found_posts;
  $url_base = get_permalink();

  $maxPostEditToShow = 5; // Número de artículos a mostrar en el editor
  $counter = 0; // Contador para contar los artículos mostrados

  /*// Modo lista como la ULPGC
  $output = "<div class='row list_category'>
    <ul class='ulpgcds-list'>";*/
  $output = "<div class='row list_category'>";
  $paginationHtml = '';
  
  while ($the_query->have_posts()) {
    $counter++;
    $the_query->the_post();

    // Calcular el total de páginas
    $total_pages = ceil($the_query->found_posts / $maxElementsPerPage);

    $recent_post_title = get_the_title();
    $recent_post_excerpt = get_the_excerpt();   //Resumen
    $recent_post_date = getFormattedDate_List(get_the_date());
    $recent_post_content = get_the_content();   //Todo el contenido
    $recent_post_permalink = get_post_permalink();

    // Obtiene la imagen destacada
    //$thumbnail = get_the_post_thumbnail();  // Img original lista para mostrar
    $thumbnail_id = get_post_thumbnail_id();  // id
    $recent_post_image_url = wp_get_attachment_image_url($thumbnail_id, 'large');  // url
    $recent_post_image_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);  // alt (texto alternativo)
    
    if ($recent_post_image_url && $recent_post_image_alt == '') $recent_post_image_alt = 'Imagen destacada de ('. $recent_post_title .')';

    // Si no hay extracto, obtener una versión truncada del contenido para mostrar como extracto
    if ( empty($recent_post_excerpt) ) {
      $recent_post_excerpt = wp_trim_words( $recent_post_content, $numMaxWords );
    } else {
      $recent_post_excerpt = wp_trim_words( $recent_post_excerpt, $numMaxWords );
    }

    // Mostrar solo 5 artículos en el editor
    if ( !$webView && $counter > $maxPostEditToShow ) {
      break;
    }

    // Muestra cada elemento
    $output .= "
      <div class='col-12 list_category_item container_row'>
        <article class='ulpgcds-article ulpgcds-article--short row resize_article_row'>
          <div class='col-4 col-img'>
            <a class='list_link' href='$recent_post_permalink'>
    ";
    $output .= $recent_post_image_url ? 
              "<img class='list_img' alt='$recent_post_image_alt' src='$recent_post_image_url' />"
            : "<img class='list_img' src='$defaultImage' alt='Imagen por defecto'>";
    $output .= "
            </a>
          </div>
          <div class='col-8 col-content'>
            <a class='list_link' href='$recent_post_permalink'>
              <h3 class='list_title'>$recent_post_title</h3>
              <div class='ulpgcds-article__date list_date'>$recent_post_date</div>
            </a>
            <p class='list_content'>$recent_post_excerpt</p>
          </div>
        </article>
      </div>
    ";
    /* // Modo lista como la ULPGC
    $output .= "
      <li>
        <div class='date'>$recent_post_date</div>
        <a href='$recent_post_permalink'>$recent_post_title</a>
      </li>      
    ";*/
  }

  // Agregar "..." en el sexto artículo si se están mostrando más de 5 en la vista de edición
  if ( !$webView && $total_posts > $maxPostEditToShow ) {
    $output .= "
      <div class='col-12'>
        <h2 class='title-l'>Preview
          <span class='title-xl'>". $counter ." de ". $total_posts ." ... (". $total_pages ." páginas)</span>
        </h2>
      </div>
    ";
  }

  $output .= "</div>";
  // Modo lista como la ULPGC
  //$output .= "</ul></div>";
  
  // Muestra pagination solo en la web final
  if ( $webView ){
    /*//Por defecto
    $total_pages = ceil($the_query->found_posts / $maxElementsPerPage);
    $output .= paginate_links(array(
      'total' => $total_pages,
      'current' => $page,
      'prev_text' => '«',
      'next_text' => '»',
    ));*/
    
    if ($pagination) {
      $prev_page = $page > 1 ? $page - 1 : 1;
      $next_page = $page < $total_pages ? $page + 1 : $total_pages;

      $startRecord = min(($page - 1) * $maxElementsPerPage + 1, $total_posts);
      $endRecord = min($page * $maxElementsPerPage, $total_posts);

      // Indicador de información
      $indicator = $pagIndicator ? "
        <div class='ulpgcds-pager__results'>
          Mostrando del <span>$startRecord</span> al <span>$endRecord</span>, de un total de <span>$total_posts</span> registros
        </div>"
        : ''
      ;
      $disabledFirst = $page == 1 ?  "aria-disabled='true'" : '';
      // Muestra el botón "anterior"
      $paginationHtml = "
        <nav aria-label='Paginación' class='ulpgcds-pager'>
          $indicator
          <ul>
            <li class='ulpgcds-pager__item ulpgcds-pager__item--prev'>
              <a class='pagination__link' href='$url_base"."page/$prev_page/' title='Ir a la página anterior' $disabledFirst>
                <span class='visually-hidden'>Anterior</span>
              </a>
            </li>
      ";

      // Muestra pagination Grande o Normal
      if ($total_pages > 5) {
        $paginationHtml .= display_pagination_large($elementsPerLargePagination, $url_base, $page, $total_pages);
      } else {
        // Mostrar las páginas
        for ($i = 1; $i <= $total_pages; $i++) {
          $active_class = $i == $page ? ' ulpgcds-pager__item--is-active' : '';
          $paginationHtml .= "
            <li class='ulpgcds-pager__item$active_class'>
              <a class='pagination__link' href='$url_base"."page/$i/' title='Ir a la página $i'>
                $i
              </a>
            </li>
          ";
        }
      }

      // Mostrar el botón "siguiente"
      $disabledLast = $page == $total_pages ?  "aria-disabled='true'" : '';
      $paginationHtml .= "
            <li class='ulpgcds-pager__item ulpgcds-pager__item--next'>
              <a class='pagination__link' href='$url_base"."page/$next_page/' title='Ir a la página siguiente' $disabledLast>
              <span class='visually-hidden'>Siguiente</span>
              </a>
            </li>
          </ul>
        </nav>
      ";
    
      return $output . $paginationHtml;
    }
  }
	return $output;
  
  // Restaura las consultas originales de WordPress
  wp_reset_postdata();
}
?>