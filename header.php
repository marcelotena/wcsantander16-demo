<!DOCTYPE html>
    <html <?php language_attributes(); ?> ng-app="app">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width" />
        <title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
            */
            global $page, $paged;
            wp_title( '|', true, 'right' );
            // Add the blog name.
            bloginfo( 'name' );
            // Add the blog description for the home/front page.
            $site_description = get_bloginfo( 'description', 'display' );
            if ( $site_description && ( is_home() || is_front_page() ) )
            echo " | $site_description";
            // Add a page number if necessary:
            if ( $paged >= 2 || $page >= 2 )
            echo ' | ' . sprintf( __( 'Page %s', 'wp_ng_spa' ), max( $paged, $page ) );
            ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" />
        <!--[if lt IE 9]>
        <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
        <![endif]-->

        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>
    <div id="page" class="hfeed site">
        <header id="masthead" class="site-header" role="banner">
            <div class="site-header-left">
                <div class="site-header-logo">

                </div>

                <hgroup class="site-header-group">
                    <h1 class="site-title"><span class="site-header-bubblewrap"><span class="site-header-bubblewrap-inner"><?php bloginfo( 'name' ); ?></span></span></h1>
                    <?php if ($site_description):
                    echo '<h2 class="site-description">';
                    bloginfo( 'description' );
                    echo '</h2>';
                    endif;
                    ?>
                </hgroup>
            </div>


            <nav role="navigation" class="site-navigation main-navigation">
                <?php wp_nav_menu( array( 'theme_location' => 'primary', 'fallback_cb' => false ) ); ?>
            </nav><!-- .site-navigation .main-navigation -->


        </header><!-- #masthead .site-header -->

        <div id="main" ng-controller="MainController as series">