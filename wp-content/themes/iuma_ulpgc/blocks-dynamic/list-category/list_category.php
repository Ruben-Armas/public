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
      /*'imgHighlightCheck' => [
        'type' => 'boolean',
        'default' => false,
      ],*/
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

/*function listcategory_render($attributes, $content) {
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
  /*) );

  if ( empty( $recent_posts ) ) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }
  
  // Verificar si el bloque está siendo mostrado en la vista pública (frontend)
  //$webView = $attributes['isWebView'];
  //$output = $webView ? "<ul class='ulpgcds-carrusel ulpgcds-carrusel--medium'>" : "<div class='row'>";
  $output = "<div class='row list_category'>";

  foreach ( $recent_posts as $recent_post ) {
    $recent_post_title = $recent_post['post_title'];
    echo($recent_post_title);
    /*$recent_post_excerpt = $recent_post['post_excerpt'];
    $recent_post_date = getFormattedDate($recent_post['post_date']);
    //$recent_post_date_gmt = getFormattedDate($recent_post['post_date_gmt']);  //Hora global
    $recent_post_content = $recent_post['post_content'];  //Todo el contenido
    $recent_post_permalink = get_permalink( $recent_post['ID'] );

    // Obtener la URL de la imagen destacada
    $recent_post_image_url = get_the_post_thumbnail_url( $recent_post['ID']/*, 'medium'*/ /*);
    // Obtener la descripción de la imagen destacada (texto alternativo)
    $recent_post_image_alt = get_post_meta( get_post_thumbnail_id( $recent_post['ID'] ), '_wp_attachment_recent_post_image_alt', true );
    
    if ($recent_post_image_url && $recent_post_image_alt == '') $recent_post_image_alt = 'Imagen destacada de ('. $recent_post_title. ')';

    // Si no hay extracto, obtener una versión truncada del contenido para mostrar como extracto
    if ( empty($recent_post_excerpt) ) {
      $recent_post_excerpt = $recent_post_content;
    //  $content = $recent_post['post_content'];
    //  $recent_post_excerpt = wp_trim_words( $content, $numMaxWords );
    //} else {
    //  $recent_post_excerpt = wp_trim_words( $recent_post_excerpt, $numMaxWords );
    }

    // Mostrar solo 5 artículos en el editor
    //if ( !$webView && $counter > $maxPostEditToShow ) {
    //  break;
    //}

    //$output .= $webView ? '<li>' : '<div class="col-4 col-sm-4">';
    //$output .= "
    //  <div class='col-12'>
    //    <article class='ulpgcds-article'>
    //      <a href='$recent_post_permalink'>
    //  ";
    //  $output .= $recent_post_image_url ?
    //    (
    //      $isImgHighlighted ?
    //        "<span class='ulpgcds-carrusel--medium__img'>
    //          <img src='$recent_post_image_url' alt='$recent_post_image_alt'>
    //        </span>"
    //      : "<img src='$recent_post_image_url' alt='$recent_post_image_alt'>"
    //    )
    //  : "<img src='$defaultImage' alt='Imagen por defecto'>";
    //  $output .= "
    //        <div class='ulpgcds-article__date'>$recent_post_date</div>
    //        <h3>$recent_post_title</h3>
    //      </a>
    //      <p>$recent_post_excerpt</p>
    //    </article>
    //  ";
    //$output .= '</div>';
    
    $output .= "
      <div class='col-12'>
        <div class='row card_custom'>
            <div class='col-3 card_col_img'>    
                <img class='card_img' src='$image' alt='$altImage'>
            </div>
            <div class='col-9 card_info'>
                <div class='card_person_name'>$person_name</div>
                <h2 class='card_job_name'>$job_name</h2>
                <div>Teléfono: $phone</div>
                <span>Correo:<a label='Correo' href='mailto:'$email>$email</a></span>
                <div class='card_info'>Despacho: $office</div> 
            </div>
        </div>
    ";
  
    $output .= "<h3>$recent_post_title</h3>";
  }

  // Agregar "..." en el sexto artículo si se están mostrando más de 5 en la vista pública
  //if ( !$webView && count($recent_posts) > $maxPostEditToShow ) {
  //  $output .= "<div class='col-4 col-sm-4'><article class='ulpgcds-article'><h3>...</h3></article></div>";
  //}
  //$output .= $webView ? '</ul>' : '</div>';
  
  /*$output .= '</div>';

  return $output;
}*/




function listcategory_render($attributes, $content) {
  $defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';
	/*if ($attributes['selectedCategory'] > 0) {
		$post = get_post($attributes['selectedCategory']);
		if (!$post) {
			return $str;
		}
		$str = '<div class="awp-myfirstblock">';
		$str .= '<a href="' . get_the_permalink($post) . '">';
		$str .= '<h3>' . get_the_title($post) . '</h3>';
		$str .= '</a>';
		$str .= '</div>';
	}
  else $str = 'No se ha encontrado o no ha introducido la página';*/

  $recent_posts = wp_get_recent_posts( array(
    //'numberposts' => $attributes['maxPosts'],
    'category'    => $attributes['selectedCategory'],
    'post_status' => 'publish',
    'post_type'   => 'post',
  ) );

  if ( empty( $recent_posts ) ) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }

  $numMaxWords = $attributes['maxWords'];

  /*// Modo lista como la ULPGC
  $output = "<div class='row list_category'>
    <ul class='ulpgcds-list'>";*/
  $output = "<div class='row list_category'>";

  foreach ( $recent_posts as $recent_post ) {
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

    $output .= "
      <div class='col-12'>
        <article class='ulpgcds-article ulpgcds-article--short row' style='max-width: 100%; max-height: 100%'>
          <div class='col-4'>
            <a class='list_link' href='$recent_post_permalink'>
    ";
    $output .= $recent_post_image_url ? 
              "<img class='list_img' alt='$recent_post_image_alt' src='$recent_post_image_url' />"
            : "<img class='list_img' src='$defaultImage' alt='Imagen por defecto'>";
    $output .= "
            </a>
          </div>
          <div class='col-8'>
            <a class='list_link' href='$recent_post_permalink'>
              <h3 class='list_title'>$recent_post_title</h3>
              <div class='ulpgcds-article__date list_date'>$recent_post_date</div>
            </a>
            <p class='list_content'>$recent_post_excerpt</p>
          </div>
        </article>
      </div>
    ";
    

    /*$output .= "
      <article class='ulpgcds-article'>
        <a href='$recent_post_permalink'>
    ";
    $output .= $recent_post_image_url ?
      (
        /*$isImgHighlighted ?
          "<span class='ulpgcds-carrusel--medium__img'>
            <img src='$recent_post_image_url' alt='$recent_post_image_alt'>
          </span>"
        : *//*"<img src='$recent_post_image_url' alt='$recent_post_image_alt'>"
      )
    : "<img src='$defaultImage' alt='Imagen por defecto'>";
    $output .= "
          <div class='ulpgcds-article__date'>$recent_post_date</div>
          <h3>$recent_post_title</h3>
        </a>
        <p>$recent_post_excerpt</p>
      </article>
    ";*/

    /* // Modo lista como la ULPGC
    $output .= "
      <li>
        <div class='date'>$recent_post_date</div>
        <a href='$recent_post_permalink'>$recent_post_title</a>
      </li>      
    ";*/
  }
  $output .= "</div>";
  // Modo lista como la ULPGC
  //$output .= "</ul></div>";

	return $output;
}
?>