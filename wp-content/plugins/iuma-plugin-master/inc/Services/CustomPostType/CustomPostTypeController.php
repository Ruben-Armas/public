<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomPostType;

use \Inc\Base\BaseController;
use \Inc\Base\ServiceWithOptionsInterface;

/**
 * 
 */
class CustomPostTypeController extends BaseController implements ServiceWithOptionsInterface
{
    public $custom_post_types = array();
    private $view_mngr;
    private $option_mngr;

    public function register()
    {
        if ( ! $this->activated('cpt_manager') ) 
            return;

        $this->view_mngr = new CustomPostTypeView($this->plugin_path, $this->plugin_url);
        $this->option_mngr = new CustomPostTypeOptions();

        $this->setPages();
        $this->setSettings();
        $this->setSections();
        $this->setFields();

        $this->settings->register();

        $this->storeCustomPostTypes();

        if ( ! empty($this->custom_post_types) )
        {
            add_action("init", array($this, "registerCustomPostTypes"));
        }
        
    }

    public function setPages()
    {
        $subpages = array(
            array(
                'parent_slug' => $this->main_menu_slug, //It has to be the menu_slug of a page
                'page_title' => 'Custom Post Types', 
                'menu_title' => 'CPT Manager',
                'capability' => 'manage_options',
                'menu_slug' => 'iuma_cpt', 
                'callback' => array($this->view_mngr, 'administrationPage')
            )
        );

        $this->settings->addSubPages($subpages);
    }

    public function setSettings()
    {
        $args = array(
            array(
                'option_group' => 'iuma_plugin_cpt_settings',
                'option_name' => 'iuma_plugin_cpt',
                'callback' => array( $this->option_mngr, 'sanitize')
            )
        );
        
        $this->settings->setSettings( $args );
    }

    public function setSections()
    {
        $args = array(
            array(
                'id' => 'iuma_cpt_index',
                'title' => 'Custom Post Type Manager',
                'callback' => array( $this->view_mngr, 'cptSectionManager'),
                'page' => 'iuma_cpt'
            )
        );

        $this->settings->setSections( $args );
    }

    public function setFields()
    {
        $this->settings->setFields( $this->option_mngr->getFields() );
    }

    public function storeCustomPostTypes()
	{
        $options = get_option("iuma_plugin_cpt");
        $this->custom_post_types[] = array(
            'post_type'             => $options['post_type'],
            'name'                  => $options['plural_name'],
            'singular_name'         => $options['singular_name'],
            'menu_name'             => $options['plural_name'],
            'name_admin_bar'        => $options['singular_name'],
            'archives'              => $options['singular_name'] . ' Archives',
            'attributes'            => $options['singular_name'] . ' Attributes',
            'parent_item_colon'     => 'Parent '.$options['singular_name'],
            'all_items'             => 'All '.$options['plural_name'],
            'add_new_item'          => 'Add New '.$options['singular_name'],
            'add_new'               => 'Add New',
            'new_item'              => 'New '.$options['singular_name'],
            'edit_item'             => 'Edit '.$options['singular_name'],
            'update_item'           => 'Update '.$options['singular_name'],
            'view_item'             => 'View '.$options['singular_name'],
            'view_items'            => 'New '.$options['plural_name'],
            'search_items'          => 'Search '.$options['plural_name'],
            'not_found'             => 'No '.$options['singular_name']. 'Found',
            'not_found_in_trash'    => 'No '.$options['singular_name']. 'Found in Trash',
            'featured_image'        => 'Featured Image',
            'set_featured_image'    => 'Set Featured Image',
            'remove_featured_image' => 'Remove Featured Image',
            'use_featured_image'    => 'Use Featured Image',
            'insert_into_item'      => 'Insert into '.$options['singular_name'],
            'uploaded_to_this_item' => 'Upload to this '.$options['singular_name'],
            'items_list'            => $options['plural_name'] . ' List',
            'items_list_navigation' => $options['plural_name'] . ' List Navigation',
            'filter_items_list'     => 'Filter '.$options['plural_name'] . ' List',
            'label'                 => $options['singular_name'],
            'description'           => $options['plural_name'] . ' Custom Post Type',
            'show_in_rest'          => true,
            'supports'              => array( 'title', 'editor', 'thumbnail'),
            'taxonomies'            => array( 'category', 'post_tag' ),
            'hierarchical'          => false,
            'public'                => $options['public'],
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => $options['has_archive'],
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post'
        );
	}

    public function registerCustomPostTypes()
	{
		foreach ($this->custom_post_types as $post_type) {
			register_post_type( $post_type['post_type'],
				array(
					'labels' => array(
						'name'                  => $post_type['name'],
						'singular_name'         => $post_type['singular_name'],
						'menu_name'             => $post_type['menu_name'],
						'name_admin_bar'        => $post_type['name_admin_bar'],
						'archives'              => $post_type['archives'],
						'attributes'            => $post_type['attributes'],
						'parent_item_colon'     => $post_type['parent_item_colon'],
						'all_items'             => $post_type['all_items'],
						'add_new_item'          => $post_type['add_new_item'],
						'add_new'               => $post_type['add_new'],
						'new_item'              => $post_type['new_item'],
						'edit_item'             => $post_type['edit_item'],
						'update_item'           => $post_type['update_item'],
						'view_item'             => $post_type['view_item'],
						'view_items'            => $post_type['view_items'],
						'search_items'          => $post_type['search_items'],
						'not_found'             => $post_type['not_found'],
						'not_found_in_trash'    => $post_type['not_found_in_trash'],
						'featured_image'        => $post_type['featured_image'],
						'set_featured_image'    => $post_type['set_featured_image'],
						'remove_featured_image' => $post_type['remove_featured_image'],
						'use_featured_image'    => $post_type['use_featured_image'],
						'insert_into_item'      => $post_type['insert_into_item'],
						'uploaded_to_this_item' => $post_type['uploaded_to_this_item'],
						'items_list'            => $post_type['items_list'],
						'items_list_navigation' => $post_type['items_list_navigation'],
						'filter_items_list'     => $post_type['filter_items_list']
					),
					'label'                     => $post_type['label'],
                    'description'               => $post_type['description'],
                    'show_in_rest'              => $post_type['show_in_rest'],
					'supports'                  => $post_type['supports'],
					'taxonomies'                => $post_type['taxonomies'],
					'hierarchical'              => $post_type['hierarchical'],
					'public'                    => $post_type['public'],
					'show_ui'                   => $post_type['show_ui'],
					'show_in_menu'              => $post_type['show_in_menu'],
					'menu_position'             => $post_type['menu_position'],
					'show_in_admin_bar'         => $post_type['show_in_admin_bar'],
					'show_in_nav_menus'         => $post_type['show_in_nav_menus'],
					'can_export'                => $post_type['can_export'],
					'has_archive'               => $post_type['has_archive'],
					'exclude_from_search'       => $post_type['exclude_from_search'],
					'publicly_queryable'        => $post_type['publicly_queryable'],
					'capability_type'           => $post_type['capability_type']
				)
			);
		}
	} 
}