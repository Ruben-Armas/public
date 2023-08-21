<?php
/*
    wp_enqueue_script(
        'ulpgcds-script', // Nombre único para el archivo JS
        'https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js', // URL completa del archivo JS externo
        array(), // Dependencias (si las hay)
        '1.0', // Versión del archivo JS
        true // Cargar el archivo JS en el pie de página (opcional)
    );
*/
   /* $errorBlock = '';
    $errorMessage = '';
    $title_1 = block_value( 'accordion-title' );  //block_field( 'accordion-title', false );
    $content_1 = block_value( 'accordion-content' );
    $title_2 = block_value( 'accordion-title-2' );
    $content_2 = block_value( 'accordion-content-2' );
    $block = block_config();
  
    #echo '<link type="text/css" rel="stylesheet" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />';
    #echo '<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>';
    #echo '<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js?v=1.0"></script>';
    #echo '<h3>'. $block['title'] .'</h3>';
    #echo "<div class='ulpgcds-accordion'>";
    #echo '<h3>'.$title_1.'</h3>';
    #echo '<p>'.$content_1.'</p>';
    #echo '<h3>'.$title_2.'</h3>';
    #echo '<p>'.$content_2.'</p>';
    #echo '</div>';
*/
?>
<!--
<script>
  // Función para recargar el archivo JS
  function reloadStyleJS() {
    console.log('aa');
    var script = document.createElement('script');
    script.src = "https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js";
    document.head.appendChild(script);
  }
</script>
-->
<script>
    if (<?php echo block_value('style') ?>) {
        console.log('aa');
        print('aaa');
        var script = document.createElement('script');
        script.src = "https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js";
        document.head.appendChild(script);
    }else{
        console.log('nooooo');
        print('bbbbbbbb');
    }
</script>

<!--<button onclick="reloadStyleJS()" class="ulpgcds-btn ulpgcds-btn--secondary">Recargar estilos</button>-->
<div class="ulpgcds-accordion">
    <h3><?php block_field( 'accordion-title' ) ?></h3>
    <div>
    <p><?php block_field( 'accordion-content' ) ?></p>
    </div>
    <h3>Temario</h3>
    <div>
    <p>Ejemplo del contenido asociado a un elemento acordeón en su segunda opción.</p>
    </div>
    <h3>Información personal</h3>
    <div>
    <p>Ejemplo del contenido asociado a un elemento acordeón en su tercera y última opción.</p>
    </div>
</div>