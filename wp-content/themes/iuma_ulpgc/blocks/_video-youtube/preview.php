<?php
    $hasError = true;
    $errorMessage = '';
    $url = block_value( 'youtube-url' );  //block_field( 'youtube-url', false );
    $block = block_config();
    $videoData = wp_oembed_get($url);
    
    if ($url == '')
        $errorMessage = 'No se ha introducido la URL del vídeo';
    else
        $errorMessage = 'Se produjo un error al mostrar el video (<em>' .$url .'</em>)';

    if (str_contains($url, 'watch?v=') || str_contains($url, 'embed/') || str_contains($url, 'youtu.be/')) {
        // Extraer el ID del video de la URL
        if (str_contains($url, 'watch?v='))
            $parts = explode('watch?v=', $url);
        else if (str_contains($url, 'youtu.be/'))
            $parts = explode('youtu.be/', $url);
            
        if ($parts && count($parts) > 1) {
            $videoId = $parts[1];

            // Crear la URL transformada en formato https://www.youtube.com/embed/{id}
            $url = 'https://www.youtube.com/embed/'. $videoId;
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
                <dd> - https://www.youtube.com/watch?v=QMEcbXFp8vQ </dd>
                <dd> - https://www.youtube.com/embed/QMEcbXFp8vQ </dd>
                <dd> - https://youtu.be/QMEcbXFp8vQ </dd>
            </dl>
        </div>        
    <?php
    } else {
    ?>        
        <!--Mostrar el reproductor de youtube-->
        <div class="wp-block-embed__wrapper">
        <?php //echo $videoData ?>
            <iframe
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen=''
                frameborder='0'
                width='560'
                height='315'
                src='<?php echo $url ?>'>
            </iframe>
        </div>        
    <?php
    }
?>