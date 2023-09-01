<?php

function register_tabs_custom() {
    $blockPath = '/blocks/tabs-custom/tabs';

    // Registra el script
    wp_register_script(
        'tabs-block', // Unique handle for JS file
        get_template_directory_uri() . $blockPath . '.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
        filemtime( get_template_directory() . $blockPath . '.js' )
    );

    // Registra el bloque
    register_block_type( 'tabs-block/my-block', array(
        'editor_script' => 'tabs-block',
    ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_tabs_custom' );

?>