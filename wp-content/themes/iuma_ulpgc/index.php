<?php get_header(); ?>

<main>
	<section id="destacados">
		<h1>Destacados</h1>
		<ul>
			<?php 
			$args = array(
				'posts_per_page' => 3,
				'category_name' => 'destacados'
			);
			$query = new WP_Query( $args );
			if ( $query->have_posts() ) :
				while ( $query->have_posts() ) :
					$query->the_post(); ?>
					<li>
						<a href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail( 'medium' ); ?>
							<h2><?php the_title(); ?></h2>
							<p><?php the_excerpt(); ?></p>
						</a>
					</li>
				<?php endwhile; 
				wp_reset_postdata();
			endif; ?>
		</ul>
	</section>
	
	<section id="contenido">
		<h1><?php single_cat_title(); ?></h1>
		<?php if ( have_posts() ) : 
			while ( have_posts() ) : the_post(); ?>
				<article>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<?php the_content(); ?>
				</article>
			<?php endwhile; 
			the_posts_navigation();
		else : ?>
			<p><?php esc_html_e( 'No se encontraron entradas.' ); ?></p>
		<?php endif; ?>
	</section>
</main>

<?php get_footer(); ?>
