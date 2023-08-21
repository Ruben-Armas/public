<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Contenido para la meta-descripción">
        <title><?= the_title(); ?></title>
        <link rel="stylesheet" href="<?= get_stylesheet_directory_uri().'/style.css'?>">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap" rel="stylesheet">
    </head>

    <body>
        <header class="">
            <div class="logo">
                <img alt="Hosting a Tope" title="Hosting a Tope" width="250"
                    src="/wp-content/uploads/2023/04/img.png">
            </div>
        </header>

    <?php get_header(); ?>
    <main>
        <?php
        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();
                ?>
                    <h1 class="title"><?= the_title(); ?></h1>
                    <div class="content"><?= the_content(); ?></div>
                <?php
            }
        }
        ?>
    </main>

    <?php get_footer(); ?>
    <footer><div class="text">Copyright @ 2022 Prueba Theme</div></footer>
  </body>
</html>