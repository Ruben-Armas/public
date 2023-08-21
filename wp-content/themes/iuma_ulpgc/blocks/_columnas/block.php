<?php
    use function Genesis\CustomBlocks\add_block;
    use function Genesis\CustomBlocks\add_field;

    $inner_0 = block_field ( 'inner-block-0' );
    $inner_1 = block_field ( 'inner-block-1' );
    $inner_2 = block_field ( 'inner-block-2' );
    $inner_3 = block_field ( 'inner-block-3' );
    $num_columns = block_value ( 'num-columns' );
    $columns = '';
    $col_div = '<div class="col-4 col-sm-4">';
    
    /*switch ($num_columns) {
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
        $columns .= '<p>hola</p>'.$i;
        // Then fields can be added
        //$columns .= add_field( 'columnas', 'hello-there-ned-how-do-you-do' );        
        //$columns .= add_field( 'columnas', 'bloque-a-introducir-'.$i, array( 'type' => 'inner_blocks', 'field-control' => 'inner_blocks' ) );
        
        add_field(
            'columnas',
            'bloque-'.$i,
            array(
                'label' => 'Bloque a introducir en la columna '.$i,
                'control' => 'inner_blocks',
                'default' => '',
            )
        );

        $columns .= '</div>';
    }

    echo 'col', block_rows( 'columnas' );*/

    /*
    add_field(
        'columnas',
        'bloque-0',
        array(
            'label' => 'Bloque a introducir en la columna 0',
            'control' => 'inner_blocks',
            'default' => '',
        )
    );
    add_field(
        'columnas',
        'bloque-1',
        array(
            'label' => 'Bloque a introducir en la columna 1',
            'control' => 'range',
            'default' => '',
        )
    );
    add_field(
        'columnas',
        'bloque-2',
        array(
            'label' => 'Bloque a introducir en la columna 2',
            'control' => 'text',
            'default' => '',
        )
    );*/
?>

<div class="row">
    <?php //echo $columns ?>
    <div class="col-4 col-sm-4">
        <p>bloque-0</p>
        <?php echo block_field ( 'inner-block-0' ) ?>
    </div>
    <div class="col-4 col-sm-4">
        <p>bloque-1</p>
        <?php echo block_field ( 'inner-block-1' ) ?>
    </div>
    <div class="col-4 col-sm-4">
        <p>bloque-2</p>
        <?php echo block_field ( 'inner-block-2' ) ?>
    </div>
    <div class="col-4 col-sm-4">
        <p>bloque-2</p>
        <?php echo block_field ( 'text' ) ?>
    </div>
    <div class="col-4 col-sm-4">
        <p>bloque-2</p>
        <?php echo block_field ( 'text-2' ) ?>
    </div>
</div>
<!--
<div>
    repeater columnas
    <div>
    <?php
    while ( block_rows( 'columnas' ) ) : 
        block_row( 'columnas' ); 
        ?>
        <img src="<?php block_sub_field( 'num-columns' ); ?>">
    <?php
    endwhile;
    reset_block_rows( 'columnas' );
    ?>
    </div>
</div>-->