<div class="wrap">
    <h1> Custom SQL Table View Configuration </h1>
    <?php 
        /**
         * This template is used in order to prepare the view configuration panel
         * of "Custom SQL Table" service.
         * 
         * This file depends on "assets/cst/cst-view-config.js" register as 
         * "iuma_cst_view_script", see CustomSQLTable. 
         * 
         * In order to generate the setings form, which is generated dynamicly, use
         * ajax with a POST message which contains the groups created. The ajax response
         * comes from CustomSQLTable:dcmsSetViewFields().
         *
         * @package IUMAPlugin
         */
        settings_errors();
        
        wp_enqueue_script('iuma_cst_view_script');
        
        $options = get_option( 'iuma_plugin_cst' );

        $host = $options['db_ip'].':'.$options['db_port'];
        $db_name = $options['db_name'];
        $sql_query = $options['db_sql_query'];

        $user = $options['db_user'];
        $passwd = $options['db_passwd'];

        $hash_id = hash("sha1", $host.$db_name.$sql_query);
        echo "<p id='hash_id' hidden> $hash_id </p>";

        $db = new wpdb($user, $passwd, $db_name, $host);
            $query_result = $db->get_results($db->prepare($sql_query));
        $db->close();

        if (count($query_result) == 0){
            echo "<h3>No se ha podido conectar a la Base de Datos</h3>";
            return;
        }

        $columns_name = array_keys(get_object_vars($query_result[0]));
    ?>

    <div>
        <h2> Creación de grupos </h2>
        <form>
            <table>
                <tr>
                    <th> Group ID: </th>
                    <td> 
                        <input type="text" class="regular-text" name="grp" id="grp_name" placeholder="Ingrese nombre de la agrupación"> 
                    </td>
                </tr>
                <tr>
                    <th> Database Fields </th>
                    <td>
                        <div>
                            <select id="db_fields" class="js-example-basic-multiple" multiple="multiple">
                                <?php
                                    foreach ( $columns_name as $column_name ) {
                                        echo "<option value='$column_name'>$column_name</option> ";
                                    }
                                ?>
                            </select>
                        </div>
                    </td>
                </tr>
            </table>
        </form>
        
        <div>
            <button id="add_button" class="button">Add Group</button>
            <button id="generate_view_settings" class="button button-primary">Generate</button>
        </div>

        <br><br>
    </div>
    
    
    <div>
        <h3> CST Groups </h3>
        <table id="cstTableViewGroups" class="cell-border compact hover" style="border: 1px solid #797979; border-radius: 3px; width: 450px; margin: 0px 0px 2px 0px;">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Fields</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <button id="delete_row" class="button"> Delete selected row </button>



    <div>
        <form id="iuma_cst_setting_view" method="post" action="options.php">
            <?php settings_fields( 'iuma_plugin_cst_view_settings' ); ?>
            <div id="cstViewOptions"> </div>
        </form>
    </div>
</div>