        <?php get_header(); ?>
        <main class="wrap">
            <section class="content-area content-thin">
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                    <article class="article-loop">
                        <header>
                            INDEX---
                            <h2><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
                            By: <?php the_author(); ?>
                            ---/INDEX
                        </header>
                        EXCERPT---
                        <?php the_excerpt(); ?>
                        ---/EXCERPT
                    </article>
                <?php endwhile; else : ?>
                    <article>
                        <p>Sorry, no posts were found!</p>
                    </article>
                <?php endif; ?>
            </section>
            <!--<div class="ulpgcds-accordion">
                <h3>Información personal</h3>
                <p>Ejemplo del contenido asociado a un elemento acordeón en su primera opción.</p>
                <h3>Temario</h3>
                <p>Ejemplo del contenido asociado a un elemento acordeón en su segunda opción.</p>
                <h3>Información personal</h3>
                <p>Ejemplo del contenido asociado a un elemento acordeón en su tercera y última opción.</p>
            </div>-->
            <?php get_sidebar(); ?>
        </main>
        <?php get_footer(); ?>