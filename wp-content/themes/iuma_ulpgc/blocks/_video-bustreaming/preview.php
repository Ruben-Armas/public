<?php
    $hasError = true;
    $errorMessage = '';
    $url = block_value( 'bustreaming-url' );  //block_field( 'bustreaming-url', false );
    $block = block_config();
    $videoData = wp_oembed_get($url);
    
    if ($url == '')
        $errorMessage = 'No se ha introducido la URL del vídeo';
    else
        $errorMessage = 'Se produjo un error al mostrar el video (<em>' .$url .'</em>)';

    if (str_contains($url, 'reproducir/') || str_contains($url, 'reproducirEmbed/')) {
        if (str_contains($url, 'reproducir/')) {
            // Extraer el ID del video de la URL
            $parts = explode('reproducir/', $url);
                
            if ($parts && count($parts) > 1) {
                $videoId = $parts[1];

                // Crear la URL transformada en formato https://www.bustreaming.com/embed/{id}
                $url = 'https://bustreaming.ulpgc.es/reproducirEmbed/'. $videoId;
            }
        }
        $hasError = false;
    }
?>

<?php
    if ($hasError){
    ?>        
        <div>
            <h3><?php echo $block['title'] ?></h3>
            <p><?php echo $errorMessage ?></p>
            <dl>
                <dt> Introduce un formato de URL aceptado. </dt>
                <dt> Ejemplos: </dt>
                <dd> - https://bustreaming.ulpgc.es/reproducirEmbed/100197 </dd>
                <dd> - https://bustreaming.ulpgc.es/reproducir/100197 </dd>
            </dl>
        </div>       
    <?php
    } else {
    ?>        
        <!--Mostrar el reproductor de bustreaming-->
        <div class="wp-block-embed__wrapper">
            <?php //echo $videoData ?>
            <iframe
                title='vimeo-player'
                frameborder='0'
                allowfullscreen=''
                width='560'
                height='315'
                src='<?php echo $url ?>'>
            </iframe>
        </div>       
    <?php
    }
?>