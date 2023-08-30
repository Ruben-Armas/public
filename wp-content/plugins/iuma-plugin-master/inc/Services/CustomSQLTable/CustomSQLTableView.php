<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\CustomSQLTable;

class CustomSQLTableView
{
    private $plugin_path;
    private $plugin_url;

    public function __construct($plugin_path, $plugin_url)
    {
        $this->plugin_path = $plugin_path;
        $this->plugin_url = $plugin_url;
    }

    public function administrationPage()
    {  
        ob_start();       
            require_once( "$this->plugin_path/templates/customsqltable/admin.php" );
            echo '<script src="'.$this->plugin_url.'assets/cst/cst-options-validation.js"></script>';
        ob_get_flush();
    }

    public function viewConfigPage()
    {
        ob_start();
            echo '<link href="'.$this->plugin_url.'assets/select2/select2.min.css" rel="stylesheet" />';
            echo '<script  src="'.$this->plugin_url.'assets/select2/select2.min.js"></script>';
            echo '<link rel="stylesheet" type="text/css" href="'.$this->plugin_url.'assets/datatables/css/jquery.dataTables.min.css">';
            echo '<script src="'.$this->plugin_url.'assets/datatables/js/jquery.dataTables.min.js"></script>';
            require_once( "$this->plugin_path/templates/customsqltable/custom_table_view_config.php" );
        ob_get_flush();
    }

    public function databaseSection()
    {
        ob_start();
            echo 'Manage credentials to access the database.';
        ob_get_flush();
    }

    public function cstTable( )
    {
        ob_start();
            require_once( "$this->plugin_path/templates/customsqltable/custom_table.php" );
            echo '<link rel="stylesheet" type="text/css" href="'.$this->plugin_url.'assets/datatables/css/jquery.dataTables.min.css">';
            echo '<link rel="stylesheet" type="text/css" href="'.$this->plugin_url.'assets/iuma-members/iuma-members.css">'; # Comparte estilo con el servicio IUMA Members
            echo '<script src="'.$this->plugin_url.'assets/datatables/js/jquery.dataTables.min.js"></script>';
            echo '<script src="'.$this->plugin_url.'assets/cst/iuma-custom-table.js"></script>';
        return ob_get_clean();
    }
}
