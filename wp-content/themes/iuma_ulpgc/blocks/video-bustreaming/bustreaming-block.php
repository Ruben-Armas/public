<?php
    function register_bustreaming_block() {
        $blockPath = '/blocks/video-bustreaming/bustreaming-block';

        // Registra el script
        wp_register_script(
            'bustreaming-block', // Unique handle for JS file
            get_template_directory_uri() . $blockPath . '.js',
            array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
            filemtime( get_template_directory() . $blockPath . '.js' )
        );
    
        // Registra el bloque
        register_block_type( 'bustreaming-block/my-block', array(
            'editor_script' => 'bustreaming-block',
        ) );
    }
    // Hook into editor only hook
    add_action( 'enqueue_block_editor_assets', 'register_bustreaming_block' );
    
?>