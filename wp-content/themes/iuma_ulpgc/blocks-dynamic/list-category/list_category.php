<?php

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
    get_template_directory_uri() . $blockPath . '.scss',
    array(),
    filemtime( get_template_directory() . $blockPath . '.scss' )
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
    $day = date_i18n('d', strtotime($date));  // 'j' representa el día sin ceros iniciales
    $moth = ucfirst(date_i18n('F', strtotime($date))); // 'F' representa el nombre completo del mes
    $year = date_i18n('Y', strtotime($date)); // 'Y' representa el año con 4 dígitos
    $tmpFormattedDate = $day . ' de ' . $moth . ' de ' . $year;

    //$tmpFormattedDate = date_i18n('j \d\e F \d\e Y', $date);  // De una vez (Mes en minúscula)
    return $tmpFormattedDate;
  } else {
    return '';
  }
}

function listcategory_render($attributes, $content) {
  $defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';

  $recent_posts = wp_get_recent_posts( array(
    //'numberposts' => $attributes['maxPosts'],
    'category'    => $attributes['selectedCategory'],
    'post_status' => 'publish',
    'post_type'   => 'post',
  ) );

  if ( empty( $recent_posts ) ) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }

  // Verificar si el bloque está siendo mostrado en la vista pública (frontend)
  $webView = $attributes['isWebView'];
  $numMaxWords = $attributes['maxWords'];

  $maxPostEditToShow = 5; // Número de artículos a mostrar en el editor
  $counter = 0; // Contador para contar los artículos mostrados

  /*// Modo lista como la ULPGC
  $output = "<div class='row list_category'>
    <ul class='ulpgcds-list'>";*/
  $output = "<div class='row list_category'>";

  foreach ( $recent_posts as $recent_post ) {
    $counter++;
    $recent_post_title = $recent_post['post_title'];
    $recent_post_excerpt = $recent_post['post_excerpt'];
    $recent_post_date = getFormattedDate_List($recent_post['post_date']);
    //$recent_post_date_gmt = getFormattedDate_List($recent_post['post_date_gmt']);  //Hora global
    $recent_post_content = $recent_post['post_content'];  //Todo el contenido
    $recent_post_permalink = get_permalink( $recent_post['ID'] );

    // Obtener la URL de la imagen destacada
    $recent_post_image_url = get_the_post_thumbnail_url( $recent_post['ID']/*, 'medium'*/);
    // Obtener la descripción de la imagen destacada (texto alternativo)
    $recent_post_image_alt = get_post_meta( get_post_thumbnail_id( $recent_post['ID'] ), '_wp_attachment_recent_post_image_alt', true );
    
    if ($recent_post_image_url && $recent_post_image_alt == '') $recent_post_image_alt = 'Imagen destacada de ('. $recent_post_title. ')';

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

  // Agregar "..." en el sexto artículo si se están mostrando más de 5 en la vista pública
  if ( !$webView && count($recent_posts) > $maxPostEditToShow ) {
    $output .= "
      <div class='col-12'>
        <h2 class='title-l'>Preview
          <span class='title-xl'>". $counter-1 ." de ". count($recent_posts) ." ...</span>
        </h2>
      </div>
    ";
    /*$output .= "
    <div class='col-12'>
        <h3>...</h3>
    </div>";*/
  }

  $output .= "</div>";
  // Modo lista como la ULPGC
  //$output .= "</ul></div>";

	return $output;
}
?>