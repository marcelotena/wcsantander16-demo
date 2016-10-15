<?php
/**
 * WCSantander16 Demo functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WCSantander16_Demo
 */

if ( ! function_exists( 'wp_ng_spa_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function wp_ng_spa_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on components, use a find and replace
	 * to change 'wp_ng_spa' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'wp_ng_spa', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	add_image_size( 'wp_ng_spa-featured-image', 640, 9999 );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Top', 'wp_ng_spa' ),
		) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'wp_ng_spa_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'wp_ng_spa_setup' );



/**
 * Enqueue scripts and styles.
 */
function wp_ng_spa_scripts() {
	wp_enqueue_style( 'wp_ng_spa-style', get_stylesheet_uri() );

	wp_enqueue_style( 'wp_ng_spa-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');

	wp_enqueue_script( 'wp_ng_spa-dependencies', get_template_directory_uri() . '/assets/js/dependencies.js', array(), '20161009', false );

wp_enqueue_script( 'wp_ng_spa-script', get_template_directory_uri() . '/assets/js/script.js', array(), '20161009', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'wp_ng_spa_scripts' );


/**
* Register custom post type: Serie.
*/
function cpt_series() {

$labels = array(
'name'                  => _x( 'Series', 'Post Type General Name', 'wp_ng_spa' ),
'singular_name'         => _x( 'Serie', 'Post Type Singular Name', 'wp_ng_spa' ),
'menu_name'             => __( 'Series', 'wp_ng_spa' ),
'name_admin_bar'        => __( 'Serie', 'wp_ng_spa' ),
'archives'              => __( 'Serieteca', 'wp_ng_spa' ),
'parent_item_colon'     => __( 'Serie padre:', 'wp_ng_spa' ),
'all_items'             => __( 'Todas las series', 'wp_ng_spa' ),
'add_new_item'          => __( 'Añadir nueva serie', 'wp_ng_spa' ),
'add_new'               => __( 'Añadir nueva', 'wp_ng_spa' ),
'new_item'              => __( 'Nueva serie', 'wp_ng_spa' ),
'edit_item'             => __( 'Editar serie', 'wp_ng_spa' ),
'update_item'           => __( 'Actualizar serie', 'wp_ng_spa' ),
'view_item'             => __( 'Ver serie', 'wp_ng_spa' ),
'search_items'          => __( 'Buscar serie', 'wp_ng_spa' ),
'not_found'             => __( 'No se han encontrado series', 'wp_ng_spa' ),
'not_found_in_trash'    => __( 'No se han encontrado series en la papelera', 'wp_ng_spa' ),
'featured_image'        => __( 'Imagen destacada', 'wp_ng_spa' ),
'set_featured_image'    => __( 'Establecer imagen destacada', 'wp_ng_spa' ),
'remove_featured_image' => __( 'Quitar imagen destacada', 'wp_ng_spa' ),
'use_featured_image'    => __( 'Usar como imagen destacada', 'wp_ng_spa' ),
'insert_into_item'      => __( 'Insertar en serie', 'wp_ng_spa' ),
'uploaded_to_this_item' => __( 'Subido a esta serie', 'wp_ng_spa' ),
'items_list'            => __( 'Lista de series', 'wp_ng_spa' ),
'items_list_navigation' => __( 'Navegación en lista de series', 'wp_ng_spa' ),
'filter_items_list'     => __( 'Filtrar lista de series', 'wp_ng_spa' ),
);
$args = array(
'label'                 => __( 'Serie', 'wp_ng_spa' ),
'description'           => __( 'Post personalizado: Serie de TV.', 'wp_ng_spa' ),
'labels'                => $labels,
'supports'              => array( 'title', 'editor', 'author', 'thumbnail' ),
'taxonomies'            => array( 'category', 'post_tag' ),
'hierarchical'          => false,
'public'                => true,
'show_ui'               => true,
'show_in_menu'          => true,
'menu_position'         => 5,
'show_in_admin_bar'     => true,
'show_in_nav_menus'     => true,
'menu_icon'				=> 'dashicons-format-video',
'can_export'            => true,
'has_archive'           => true,
'exclude_from_search'   => false,
'publicly_queryable'    => true,
'capability_type'       => 'page',
'show_in_rest'			=> true,
'rest_base'				=> 'series'
);
register_post_type( 'series', $args );

}
add_action( 'init', 'cpt_series', 0 );

function my_rewrite_flush() {
	cpt_series();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'my_rewrite_flush' );