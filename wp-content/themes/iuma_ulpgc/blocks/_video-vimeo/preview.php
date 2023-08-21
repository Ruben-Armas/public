<?php
    $hasError = true;
    $errorMessage = '';
    $url = block_value( 'vimeo-url' );  //block_field( 'vimeo-url', false );
    $block = block_config();
    $videoData = wp_oembed_get($url);

    if ($url == '')
        $errorMessage = 'No se ha introducido la URL del vídeo';
    else
        $errorMessage = 'Se produjo un error al mostrar el video (<em>' .$url .'</em>)';

    if (str_contains($url, '/video/'))
        $hasError = false;
?>

<?php
    if ($hasError){
    ?>        
        <div>
            <h3><?php echo $block['title'] ?></h3>
            <p><?php echo $errorMessage ?></p>
            <dl>
                <dt> Introduce un formato de URL aceptado. </dt>
                <dt> Ejemplo: </dt>
                <dd> - https://player.vimeo.com/video/291249918 </dd>
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
                src='<?php echo $url ?>'
                width= '560'
                height= '315'
                frameborder='0'
                allowfullscreen>
            </iframe>
        </div>
    <?php
    }
?>