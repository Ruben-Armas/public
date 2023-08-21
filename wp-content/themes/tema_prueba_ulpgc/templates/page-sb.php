<?php /* Template Name: Page sin sidebar */ ?>
<?php get_header(); ?>
<main class="wrap">
    <section class="content-area content-thin">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article class="article-full">
                <header>
                    PAGE---
                    <h2><?php the_title(); ?></h2>
                    By: <?php the_author(); ?>
                    ---/PAGE
                </header>
                <?php the_content(); ?> -CONTENT-
            </article>
        <?php endwhile; else : ?>
            <article>
                <p>Sorry, no page was found!</p>
            </article>
        <?php endif; ?>
    </section>
    <?php get_sidebar(); ?>
</main>
<?php get_footer(); ?>