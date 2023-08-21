<?php
    /*
    $title = block_value( 'accordion-title' );  //block_field( 'accordion-title', false );
    $content = block_value( 'accordion-content' );
    $block = block_config();

    echo '<h3>'. $block['title'] .'</h3>';
    echo "<div class='ulpgcds-accordion'>";
    echo '<h3>'.$title.'</h3>';
    echo '<p>'.$content.'</p>';
    echo '</div>';
    */
?>

<!--<link type="text/css" rel="stylesheet" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js?v=1.0"></script>
<div class="ulpgcds-accordion">
    <h3><?php //block_field( 'accordion-title' ); ?></h3>
    <p><?php //block_field( 'accordion-content' ); ?></p>
    <h3><?php //block_field( 'accordion-title-2' ); ?></h3>
    <p><?php //block_field( 'accordion-content-2' ); ?></p>
</div>-->
<div class="ulpgcds-accordion">
    <h3><?php block_field( 'accordion-title' ) ?></h3>
    <p><?php block_field( 'accordion-content' ) ?></p>
    <h3><?php block_field( 'accordion-title' ) ?></h3>
    <p><?php block_field( 'accordion-content' ) ?></p>
    <h3><?php block_field( 'accordion-title' ) ?></h3>
    <p><?php block_field( 'accordion-content' ) ?></p>
</div>