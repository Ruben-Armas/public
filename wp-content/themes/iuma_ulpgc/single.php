<?php get_header();?>

<div id="primary" class="content-area">
  <main class="main-content-web">
    
    <div class="entry-new">
      <?php
      // Start the Loop.
      while ( have_posts() ) :
        the_post();
        ?>
        <div id="contenedor_principal" class="wrapper">

          <div class="news-separator"></div>
          <!--Sin menu lateral-->
          <div id="contenido" class="contenido_estrecho">
            <div id="contenido_interior">
              <div id="block-system-main" class="block block-system">
                <div class="content node-noticia">
                  <div class="contenido_noticia">
                    <h1 class="page-title"><?php the_title(); ?></h1>

                    <div class="cabecera">
                      <!-- Muestra la fecha en el formato deseado -->
                      <div class="fecha"><?php echo get_the_date('j ') . strtoupper(get_the_date('M ') . get_the_date('Y')); ?></div>
                      <!-- Muestra las categorías de la entrada (solo si hay) -->
                      <?php
                      if (!empty(get_the_category())) {
                        echo '<div class="categoria">&emsp;' . get_the_category_list(', ') . '</div>';
                      }
                      ?>                          
                      <!-- Muestra la sección de Compartir en Redes -->
                      <?php
                        $entry_url = get_permalink();
                        $tweet_text = "Descubre más en la web del IUMA";
                        $facebook_share_url = 'https://www.facebook.com/sharer.php?u=' . urlencode($entry_url);
                        $twitter_share_url = 'https://twitter.com/intent/tweet?url=' . urlencode($entry_url) . '&text='.$tweet_text;
                        $linkedin_share_url = 'https://www.linkedin.com/sharing/share-offsite/?url=' . urlencode($entry_url);
                      ?>
                      <ul class="compartir_redes">          
                        <li><a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" style="display: inline-block;" target="_blank" href="<?php echo esc_url($facebook_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-facebook"></i></a></li>
                        <li><a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" style="display: inline-block;" target="_blank" href="<?php echo esc_url($twitter_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-twitter"></i></a></li>
                        <li><a class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" style="display: inline-block;" target="_blank" href="<?php echo esc_url($linkedin_share_url); ?>"><i class="ulpgcds-btn__icon ulpgcds-icon-linkedin"></i></a></li>
                        <li class="titulo">Compartir en las redes:</li>
                      </ul>
                      <div class="clearer"></div>
                    </div>
                    <div class="cuerpo">
                      <?php the_content(); ?>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Navegación Siguiente/Entrada Anterior-->
          <hr>
          <div class="post-navigation">
            <div class="nav-previous">
              <?php previous_post_link('%link', '<span class="ulpgcds-icon-arrow-left"></span>Entrada anterior'); ?>
            </div>
            <div class="nav-next">
              <?php next_post_link('%link', 'Entrada siguiente &nbsp;<span class="ulpgcds-icon-arrow-right"></span>'); ?>
            </div>
          </div>
        </div>
        <?php
      endwhile;
      ?>
    </div><!-- #content -->
  </main>
</div><!-- #primary -->

<?php get_footer();