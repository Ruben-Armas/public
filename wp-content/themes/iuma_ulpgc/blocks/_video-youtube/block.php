<?php
    $url = block_value( 'youtube-url' );  //block_field( 'youtube-url', false );
    
    // Transfora la url en los casos necesarios    
    if (str_contains($url, 'embed/'))
        $parts = explode('embed/', $url);   // Extraer el ID del video de la URL
    if (str_contains($url, 'youtu.be/'))
        $parts = explode('youtu.be/', $url);
        
    if ($parts && count($parts) > 1) {
        $videoId = $parts[1];

        // Crear la URL transformada en formato https://www.youtube.com/watch?v={id}
        $url = 'https://www.youtube.com/watch?v='. $videoId;
    }
?>

<!--Mostrar el reproductor de youtube-->
<div class="ulpgcds-video">
<?php //echo $videoData ?>;
    <iframe
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen=''
        frameborder='0'
        width='560'
        height='315'
        src='<?php echo $url ?>'>
    </iframe>
</div>