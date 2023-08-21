<?php
    $class_article = 'ulpgcds-article';
    if ( block_value( 'phone-view' ) ) {
        $class_article = 'ulpgcds-article ulpgcds-article--short';
    } else {
        $class_article = 'ulpgcds-article';
    }

    $date_value = block_value( 'article-date' );
    $date_div = '';
    if ( $date_value != '') {
        $date_div = '<div class="ulpgcds-article__date">'.$date_value.'</div>';
    }
?>


<article class="<?php echo $class_article ?>">
    <a href="<?php block_field( 'article-url' ); ?>">
    <img
        alt="<?php block_field( 'alt-img' ); ?>"
        src="<?php block_field( 'article-img' ); ?>"
    />
    <?php echo $date_div ?>
    <h3><?php block_field( 'article-title' ); ?></h3></a>
    <p><?php block_field( 'article-content' ); ?></p>
</article>

<!--
Imagen del Master en Electrónica y Telecomunicación Aplicadas
Imagen de Publicaciones Científicas
Imagen de Servicios Externos

<a href="<?php echo esc_url(get_permalink($page_id)); ?>
<a href="<?php echo esc_url(get_permalink($page_id)); ?>
-->