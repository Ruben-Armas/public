<?php

    $url = block_value( 'bustreaming-url' );  //block_field( 'bustreaming-url', false );
    
    // Transfora la url en los casos necesarios    
    if (str_contains($url, 'reproducir/')){
        // Extraer el ID del video de la URL
        $parts = explode('reproducir/', $url);
            
        if ($parts && count($parts) > 1) {
            $videoId = $parts[1];

            // Crear la URL transformada en formato https://www.bustreaming.com/embed/{id}
            $url = 'https://bustreaming.ulpgc.es/reproducirEmbed/'. $videoId;
        }
    }
?>

<!--Mostrar el reproductor de bustreaming-->
<div class="ulpgcds-video">
    <?php //echo $videoData ?>
    <iframe
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen=''
        frameborder='0'
        width='640'
        height='359'
        src='<?php echo $url ?>'>
    </iframe>
</div>