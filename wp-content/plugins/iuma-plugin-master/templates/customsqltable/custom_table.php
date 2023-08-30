<div>
    <?php
        /**
         * Custom SQL Table template.
         * 
         * Si se ha realizado una configuración de la vista, se comprueba el hash (basado
         * en la concatenación del host, base de datos y la query) y si coincide se visualiza
         * con la configuración establecida por el usuario. En caso de que el usuario 
         * no haya configurado la vista, se muestra todos los resultados de la SQL Query.
         * 
         * @package IUMAPlugin
         */


        $options = get_option( 'iuma_plugin_cst' );

        $host = $options['db_ip'].':'.$options['db_port'];
        $user = $options['db_user'];
        $db_name = $options['db_name'];
        $passwd = $options['db_passwd'];
        $sql_query = $options['db_sql_query'];

        $mydb = new wpdb($user, $passwd, $db_name, $host);
        $query_result = $mydb->get_results($mydb->prepare($sql_query));
        $mydb->close();

        if (count($query_result) == 0){
            return; // No show table
        }

        $hash_id = hash("sha1", $host.$db_name.$sql_query);
        $view_options = get_option('iuma_plugin_cst_view');
        
        $use_custom_view = (!is_array($view_options) ? false : (!array_key_exists("hash_id", $view_options) ? false : $hash_id == $view_options['hash_id']));

        $keys = array();
        if ($use_custom_view){
            foreach ($view_options['view_grp'] as $group)
                $keys[] = $group['name'];
        } else 
        {
            $keys = array_keys(get_object_vars($query_result[0]));
        }
        
    ?>
    <div class="container">
    <table id="iuma-custom-table" class="display nowrap">
        <thead>
            <tr>
                <?php
                    foreach ($keys as $key)
                    {
                        echo "<th>$key</th>";
                    }
                ?>
            </tr>
        </thead>
        <tbody>
            <?php
                foreach ($query_result as $key => $member)
                {   
                    $member = (array)$member;
                    echo "<tr>";
                    if ($use_custom_view){
                        foreach ($view_options['view_grp'] as $group)
                        {
                            echo "<td>";
                            $fields = explode( ',', $group['fields'] );
                            foreach ($fields as $field)
                            {
                                echo $member[$field]. " ";
                            }
                            echo "</td>";
                        }
                    } else {
                        foreach ($member as $key => $value)
                        {
                            echo "<td> $value </td>";
                        }
                    }                    
                    echo "</tr>";
                }
            ?>
        </tbody>
    </table>
    </div>
</div>