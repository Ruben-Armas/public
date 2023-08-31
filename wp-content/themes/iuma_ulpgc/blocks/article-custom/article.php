<?php

function register_article_custom() {
    $blockPath = '/blocks/article-custom/article';

    // Registra el script
    wp_register_script(
        'article-block', // Unique handle for JS file
        get_template_directory_uri() . $blockPath . '.js', // Path to file
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ), // Required dependencies for blocks
        filemtime( get_template_directory() . $blockPath . '.js' ) // Version of last time file was saved
    );

    // Registra el bloque
    register_block_type( 'article-block/my-block', array(
        'editor_script' => 'article-block'
    ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_article_custom' );

?>