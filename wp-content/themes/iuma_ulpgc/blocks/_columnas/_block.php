<?php
    use function Genesis\CustomBlocks\add_block;
    use function Genesis\CustomBlocks\add_field;

    $num_columns = block_value ( 'num-columns' );
    $columns = '';
    $col_div = '<div class="col-4 col-sm-4">';
    
    switch ($num_columns) {
        case 2:            
            $col_div = '<div class="col-6 col-sm-4">';
            break;
        case 3:
            $col_div = '<div class="col-4 col-sm-4">';            
            break;
        case 4:
            $col_div = '<div class="col-3 col-sm-4">';
            break;
    }
    for ($i=0; $i < $num_columns; $i++){
        $columns .= $col_div;
        $columns .= '<p>hola</p>';
        // Then fields can be added
        //$columns .= add_field( 'columnas', 'hello-there-ned-how-do-you-do' );
        //$columns .= add_field( 'columnas', 'bloque-a-introducir-'.$i, array( 'field-control' => 'inner_blocks' ) );

        $columns .= add_field(
            'columnas',
            'bloque-a-introducir-'.$i,
            array(
                'label' => __( 'Bloque a introducir '.$i, 'columnas' ),
                'type' => 'inner_blocks',
                'field-control' => 'inner_blocks',
                'default' => '',
            )
        );

        $columns .= '</div>';
    }
?>

<div class="row">
    <?php echo $columns ?>
</div>