<?php

function register_youtube_block() {
    $blockPath = '/blocks/video-youtube/youtube-block';
    //echo "youtube <br>";
    //echo get_template_directory_uri() . $blockPath . '.js<br>';

    // Registra el script
    wp_register_script(
        'youtube-block', // Unique handle for JS file
        get_template_directory_uri() . $blockPath . '.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
        filemtime( get_template_directory() . $blockPath . '.js' )
    );

    // Registra los estilos del bloque
    /*wp_register_style(
        'youtube-block-editor',
        get_template_directory_uri() . $blockPath . '.css',
        array( 'wp-edit-blocks' ),
        filemtime( get_template_directory() . $blockPath . '.css' )
    );

    // Registra los estilos frontend del bloque
    wp_register_style(
        'youtube-block',
        get_template_directory_uri() . $blockPath . '.css',
        array(),
        filemtime( get_template_directory() . $blockPath . '.css' )
    );*/

    // Registra el bloque
    register_block_type( 'youtube-block/my-block', array(
        'editor_script' => 'youtube-block',
        //'editor_style' => 'youtube-block-editor',
        //'style' => 'youtube-block',
    ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_youtube_block' );

?>