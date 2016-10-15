<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WCSantander16_Demo
 */

get_header(); ?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<ul class="series-list">
				<li class="series-list-item" ng-repeat="item in series.list">
					<h3 class="series-list-item-title" ng-bind-html="item.title.rendered"></h3>
				</li>
			</ul>

		</main>
	</div>
<?php

get_footer();
