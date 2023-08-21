<?php
    function register_vimeo_block() {
        $blockPath = '/blocks/video-vimeo/vimeo-block';

        // Registra el script
        wp_register_script(
            'vimeo-block', // Unique handle for JS file
            get_template_directory_uri() . $blockPath . '.js',
            array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
            filemtime( get_template_directory() . $blockPath . '.js' )
        );
    
        // Registra el bloque
        register_block_type( 'vimeo-block/my-block', array(
            'editor_script' => 'vimeo-block',
        ) );
    }
    // Hook into editor only hook
    add_action( 'enqueue_block_editor_assets', 'register_vimeo_block' );
    
?>