<?php
function modify_column_block_output($content) {
    
    $column_block_pattern = '<div class="wp-block-column.*>';
    
    // cadena a buscar, dónde la busca, dónde la guarda
    preg_match_all($column_block_pattern, $content, $matches);

    if (!empty($matches[0])) {
        $rows_html = $matches[0];
        
        // Array que guarda la cantidad de cols de cada row
        $container_counts = get_col_amount($rows_html);

        // Sustituyo las rows
        $content = preg_replace(
            array('/wp-block-columns.*?"/'),
            array('row"'),
            $content
        );

        // Sustituye las cols, dependiendo de las cantidades obtenidas
        $content = replace_cols($rows_html, $container_counts, $content);
        
    }
    return $content;
}

function get_col_amount($rows_html){
    $container_counts = array(); // Array para almacenar los contadores y las claves de los wp-container
    $current_container = '';    // Variable para rastrear el wp-container actual
    $current_count = 0; // Variable para rastrear el contador actual
    $key = 0;   // Clave para los wp-container

    foreach ($rows_html as $item) {
        if (strpos($item, 'wp-container-')) {
            // Si se encuentra un nuevo wp-container, almacenar el contador anterior (si corresponde)
            if (!empty($current_container)) {
                $container_counts[$key] = array(
                    'container' => $current_container,
                    'count' => $current_count
                );
                $key++;
            }
            
            // Actualizar el wp-container y reiniciar el contador
            if (preg_match('/wp-container-([^ ]+)-(\d+)/', $item, $matches)){
                $current_container = $matches[1];
                $current_count = 0;
            }

        } elseif (strpos($item, 'wp-block-column')) {
            // Si se encuentra un wp-block-column dentro del wp-container actual, incrementar el contador
            $current_count++;
        }
    }

    // Almacenar el último contador (si corresponde)
    if (!empty($current_container)) {
        $container_counts[$key] = array(
            'container' => $current_container,
            'count' => $current_count
        );
    }

    /*// Imprimir la cantidad de columnas en cada fila
    foreach ($container_counts as $key => $data) {
        echo "$key - wp-container-{$data['container']} --> {$data['count']} elementos<br>";
    }*/

    return $container_counts;
}

function replace_cols($rows_html, $container_counts, $content){
    // Copia a modificar del array original
    //$modified_html = $rows_html;
    //recorrer las keys de rows_html, teniendo en cuenta la cantidad de cols en cada row para ir sustituyendo en un bucle
    $j = 0;
    $contKey = $container_counts[0]['count'];          
    for ($i=1; $i<count($rows_html); $i++){
        // $contKey -> Cantidad de elementos (col)
        if ($i <= $contKey){
            // Reemplazar la columna actual dentro del 'row'
            $amount = $container_counts[$j]['count'];
            if ($amount == 2) {
                $column_class = 'col-6 col-sm-4';
            } elseif ($amount == 3) {
                $column_class = 'col-4 col-sm-4';
            }
            
            /* Con FOR
                $pattern = '/wp-block-column.*"/';
                if (preg_match($pattern, $modified_html[$i])){
                    echo '<br>Antes   ',$modified_html[$i];
                    $modified_html[$i] = 'div class="'.$column_class.'">';
                    echo '<br>Después ',$modified_html[$i];
                }
            */
            $content = preg_replace(
                array('/wp-block-column("| .*")/'),
                array($column_class.'"'),
                $content,
                1   // Una única vez
            );

        } else {
            $j++;
            // Añado el nuevo desfase saltando el div 'row'
            $contKey += 1 + $container_counts[$j]['count'];
        }
    }
    //echo '<br>Original<br>';
    //print_r($rows_html);
    //echo '<br>Modificado<br>';
    //print_r($modified_html);
    
    /* Con FOR
        // SUSTITUIR EL HTML MODIFICADO EN EL REAL        
        // Reemplaza el contenido original, reemplazando uno por uno el html original por el modificado
        for ($i=0; $i<count($rows_html); $i++) {
            $content = preg_replace('/'.preg_quote($rows_html[$i], '/').'/', $modified_html[$i], $content, 1);
        }
    */

    /*// Pruebas
        $patt = '<div class="(row|col).*>';        
        // cadena a buscar, dónde la busca, dónde la guarda
        preg_match_all($patt, $content, $mat);
        if (!empty($mat[0])) {
            echo '<br>Nuevo<br>';
            print_r($mat[0]);
        }
    */

    return $content;
}


add_filter('the_content', 'modify_column_block_output');
?>