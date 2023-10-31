<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
/*get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<?php
			// Start the Loop.
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the post format-specific template for the content. If you want
				 * to use this in a child theme, then include a file called content-___.php
				 * (where ___ is the post format) and that will be used instead.
				 */
				/*get_template_part( 'content', get_post_format() );

				?>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<title><?php wp_title(); ?></title>
				<?php

				// Previous/next post navigation.
				//twentyfourteen_post_nav();

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}
			endwhile;
			?>
		</div><!-- #content -->
	</div><!-- #primary -->

<?php
//get_sidebar( 'content' );
//get_sidebar();
get_footer();
*/


get_header();

?>
  <div id="primary" class="content-area">
    <main class="main-content-web">
      <div class="main-section">
        <?php
        // Start the Loop.
        while ( have_posts() ) :
          the_post();
          ?>

          <h1 class="entry-title"><?php the_title(); ?></h1>

		      <div class="entry-header row">
            <div class="col-6">
              <!-- Muestra la fecha en el formato deseado -->
              <div class="entry-date col-6"><?php echo get_the_date('j ') . strtoupper(get_the_date('M ') . get_the_date('Y')); ?></div>
              <!-- Muestra las categorías de la entrada (solo si hay) -->
              <?php
              if (!empty(get_the_category())) {
                echo '<div class="entry-categories col-6"> - ' . get_the_category_list(', ') . '</div>';
              }
              ?>
            </div>
            <div class="col-6">
              <!-- Muestra la sección de Compartir en Redes -->
              <?php
                $entry_url = get_permalink();
                $tweet_text = "Descubre más en la web del IUMA";
                $facebook_share_url = 'https://www.facebook.com/sharer.php?u=' . urlencode($entry_url);
                $twitter_share_url = 'https://twitter.com/intent/tweet?url=' . urlencode($entry_url) . '&text='.$tweet_text;
                $linkedin_share_url = 'https://www.linkedin.com/sharing/share-offsite/?url=' . urlencode($entry_url);
              ?>
              <div class="entry-social">                
                <span>Compartir en las redes:</span>
                <a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank" href="<?php echo esc_url($facebook_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-facebook"></i></a>
                <a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank" href="<?php echo esc_url($twitter_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-twitter"></i></a>
                <a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank" href="<?php echo esc_url($linkedin_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-linkedin"></i></a>
              </div>
            </div>
          </div>
          <!--<ul style="list-style: none;">
            <li class="facebook"><a href="<?php echo esc_url($facebook_share_url); ?>" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank"><i class="ulpgcds-btn__icon ulpgcds-icon-facebook"></i><span>Facebook</span></a></li>
            <li class="facebook"><a href="<?php echo esc_url($facebook_share_url); ?>" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank"><i class="ulpgcds-btn__icon ulpgcds-icon-facebook"></i><span>Facebook</span></a></li>
          </ul>
          
          <ul class="compartir_redes" style="float: right; list-style-type: none;">
            <li class="c_lk" style="float: right; list-style-type: none;"><a class="ulpgcds-btn ulpgcds-btn--text" target="_blank" href="<?php echo esc_url($facebook_share_url); ?>"><i class="ulpgcds-icon-facebook" aria-hidden="true"></i></a></li>
            <li class="c_lk" style="float: right; list-style-type: none;"><a class="ulpgcds-btn ulpgcds-btn--text" target="_blank" href="<?php echo esc_url($twitter_share_url); ?>"><i class="ulpgcds-icon-twitter" aria-hidden="true"></i></a></li>
            <li class="c_lk" style="float: right; list-style-type: none;"><a class="ulpgcds-btn ulpgcds-btn--text" target="_blank" href="<?php echo esc_url($linkedin_share_url); ?>"><i class="ulpgcds-icon-facebook" aria-hidden="true"></i></a></li>
            <li class="titulo" style="float: right; list-style-type: none;">Compartir en las redes:</li>
          </ul>-->

          <div class="entry-content">
            <?php the_content(); ?>
          </div>

          <?php
          // Previous/next post navigation.
          //twentyfourteen_post_nav();
        endwhile;
        ?>
      </div><!-- #content -->
    </main>
  </div><!-- #primary -->

<?php get_footer();