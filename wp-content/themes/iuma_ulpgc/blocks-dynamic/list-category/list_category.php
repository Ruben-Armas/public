<?php

function list_category_dynamic() {
  $blockPath = '/blocks-dynamic/list-category/list_category';
  echo ('list');

  // Registra el script
  wp_register_script(
    'listcategory-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'listcategory-block/my-block', [
    'editor_script' => 'listcategory-block-js',
    'render_callback' => 'listcategory_render',
    'attributes' => [
			/*'maxPosts' => [
        'type' => 'number',
        'default' => 5
      ],
			'maxWords' => [
        'type' => 'number',
        'default' => 35
      ],*/
      'selectedCategory' => [
        'type' => 'int',
        'default' => 0,
      ],
      'imgHighlightCheck' => [
        'type' => 'boolean',
        'default' => false,
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


function getFormattedDate($date) {
  if ($date) {
    $tmpFormattedDate = date_i18n('d M Y', strtotime($date));
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
    /*
    'numberposts'      => 10,   // Número de posts que deseas obtener. Por defecto, 5.
		'offset'           => 0,    // Número de posts para omitir antes de comenzar a listar. Por defecto, 0.
		'category'         => 0,    // ID de la categoría para obtener posts de una categoría específica. Por defecto, 0 (todos).
		'orderby'          => 'post_date',  // Campo para ordenar los posts. Puede ser 'post_date', 'post_title', 'post_excerpt', 'post_name', 'ID', etc.
		'order'            => 'DESC',       // Dirección de ordenamiento. Puede ser 'ASC' (ascendente) o 'DESC' (descendente). Por defecto, 'DESC'.
		'include'          => '',
		'exclude'          => '',           // Array de IDs de posts para excluir de la consulta.
		'meta_key'         => '',
		'meta_value'       => '',
		'post_type'        => 'post',       // Tipo de post a obtener. Puede ser 'post', 'page', 'attachment', 'revision', etc. Por defecto, 'post'.
		'post_status'      => 'draft, publish, future, pending, private',   // Estado de los posts que se deben obtener. Puede ser 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', etc. Por defecto, 'publish'.
		'suppress_filters' => true,         // Si se deben suprimir los filtros. Por defecto, true.
    */
  ) );

  if ( empty( $recent_posts ) ) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }
  
  // Verificar si el bloque está siendo mostrado en la vista pública (frontend)
  $webView = $attributes['isWebView'];
  //$output = $webView ? "<ul class='ulpgcds-carrusel ulpgcds-carrusel--medium'>" : "<div class='row'>";
  $output = "<div class='row list_category'>";

  $maxPostEditToShow = 5; // Número de artículos a mostrar en el editor
  $counter = 0; // Contador para contar los artículos mostrados
  //$numMaxWords = $attributes['maxWords'];
  $isImgHighlighted = $attributes['imgHighlightCheck'];

  foreach ( $recent_posts as $recent_post ) {
    $counter++;
    $recent_post_title = $recent_post['post_title'];
    $recent_post_excerpt = $recent_post['post_excerpt'];
    $recent_post_date = getFormattedDate($recent_post['post_date']);
    //$recent_post_date_gmt = getFormattedDate($recent_post['post_date_gmt']);  //Hora global
    $recent_post_content = $recent_post['post_content'];  //Todo el contenido
    $recent_post_permalink = get_permalink( $recent_post['ID'] );

    // Obtener la URL de la imagen destacada
    $recent_post_image_url = get_the_post_thumbnail_url( $recent_post['ID']/*, 'medium'*/ );
    // Obtener la descripción de la imagen destacada (texto alternativo)
    $recent_post_image_alt = get_post_meta( get_post_thumbnail_id( $recent_post['ID'] ), '_wp_attachment_recent_post_image_alt', true );
    
    if ($recent_post_image_url && $recent_post_image_alt == '') $recent_post_image_alt = 'Imagen destacada de ('. $recent_post_title. ')';

    // Si no hay extracto, obtener una versión truncada del contenido para mostrar como extracto
    if ( empty($recent_post_excerpt) ) {
      $recent_post_excerpt = $recent_post_content;
    /*  $content = $recent_post['post_content'];
      $recent_post_excerpt = wp_trim_words( $content, $numMaxWords );
    } else {
      $recent_post_excerpt = wp_trim_words( $recent_post_excerpt, $numMaxWords );*/
    }

    // Mostrar solo 5 artículos en el editor
    /*if ( !$webView && $counter > $maxPostEditToShow ) {
      break;
    }*/

    //$output .= $webView ? '<li>' : '<div class="col-4 col-sm-4">';
    /*$output .= "
      <div class='col-12'>
        <article class='ulpgcds-article'>
          <a href='$recent_post_permalink'>
      ";
      $output .= $recent_post_image_url ?
        (
          $isImgHighlighted ?
            "<span class='ulpgcds-carrusel--medium__img'>
              <img src='$recent_post_image_url' alt='$recent_post_image_alt'>
            </span>"
          : "<img src='$recent_post_image_url' alt='$recent_post_image_alt'>"
        )
      : "<img src='$defaultImage' alt='Imagen por defecto'>";
      $output .= "
            <div class='ulpgcds-article__date'>$recent_post_date</div>
            <h3>$recent_post_title</h3>
          </a>
          <p>$recent_post_excerpt</p>
        </article>
      ";
    $output .= '</div>';*/
    
    $output .= "
      <div class='col-12'>

      <div class='row card_custom'>
          <div class='col-3 card_col_img'>    
              <img class='card_img' src='https://www.ulpgc.es/sites/default/files/ArchivosULPGC/equipo-de-gobierno/01-rector_ulpgc.jpg' alt='Retrato de Rector'>
          </div>
          <div class='col-9 card_info'>
              <div class='card_person_name'>nombre</div>
              <h2 class='card_job_name'>cargo</h2>
              <div>Teléfono: 123546789</div>
              <span>Correo:<a label='Correo' href='mailto:'correo>correo</a></span>
              <div class='card_info'>Despacho: Despacho</div> 
          </div>
      </div>
    ";
  }

  // Agregar "..." en el sexto artículo si se están mostrando más de 5 en la vista pública
  /*if ( !$webView && count($recent_posts) > $maxPostEditToShow ) {
    $output .= "<div class='col-4 col-sm-4'><article class='ulpgcds-article'><h3>...</h3></article></div>";
  }*/
  //$output .= $webView ? '</ul>' : '</div>';
  $output .= '</div>';

  return $output;
}

?>