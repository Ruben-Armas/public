<?php
// This function enqueues the Normalize.css for use. The first parameter is a name for the stylesheet, the second is the URL. Here we
// use an online version of the css file.
function add_normalize_CSS() {
   wp_enqueue_style( 'normalize-styles', "https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");
}
add_action('wp_enqueue_scripts', 'add_normalize_CSS');

// Register a new sidebar simply named 'sidebar'
function add_widget_support() {
    register_sidebar( array(
                    'name'          => 'Sidebar',
                    'id'            => 'sidebar',
                    'before_widget' => '<div>',
                    'after_widget'  => '</div>',
                    'before_title'  => '<h2>',
                    'after_title'   => '</h2>',
    ) );
}
// Hook the widget initiation and run our function
add_action( 'widgets_init', 'add_widget_support' );

// Register a new navigation menu
function add_Main_Nav() {
    register_nav_menu('header-menu',__( 'Header Menu' ));
  }
// Hook to the init action hook, run our navigation menu function
add_action( 'init', 'add_Main_Nav' );




// --------------------------------------------------------------------------
/*//Enable imports ¿WARNING old browsers?
    function enable_es6_modules_support() {
        add_filter( 'script_loader_tag', function ( $tag, $handle ) {
            if ( $handle === 'accordion-block' ) {
            $tag = str_replace( ' src', ' type="module" src', $tag );
            }
            return $tag;
        }, 10, 2 );
    }
    add_action( 'wp_enqueue_scripts', 'enable_es6_modules_support' );
*/

// --------------------------------------------------------------------------
/*function notepanel_block() {
  wp_register_script( 'notepanel', plugin_dir_url( __FILE__ ) . 'assets/js/notepanel.js', [
      'wp-blocks',
      'wp-i18n',
      'wp-element',
      'wp-components',
      'wp-editor',
  ] );

  wp_register_style(
      'notepanel',
      plugin_dir_url( __FILE__ ) . 'assets/css/notepanel.css',
      [ 'wp-edit-blocks' ]
  );

  register_block_type( 'dwp/notepanel', [
      'editor_script'   => 'notepanel',
      'editor_style'    => 'notepanel',
      'attributes'      => [
          'title'       => [
              'type' => 'string', // null, boolean, object, array, number, string, integer.
          ],
          'description' => [
              'type' => 'string',
          ],
          'type'        => [
              'type' => 'array',
          ],
      ],
  ] );
}

add_action( 'init', 'notepanel_block' );
//-----------------------------------------------------------------------------------------
*/

