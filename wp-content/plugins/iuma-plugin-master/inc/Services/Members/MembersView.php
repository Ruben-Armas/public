<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Services\Members;

/**
 * Contiene la construcción de todos los elementos visibles del módulo:
 *   
 *   * Página de administración
 *   
 *   * Página de información del shortcode
 *   
 *   * Descripción de la sección para indicas las 
 *     credenciales de la base de datos
 *   
 *   * Descripción de la sección para activar las 
 *     opciones de visualización en la tabla
 *   
 *   * Tabla de contenido 
 */
class MembersView 
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
            require_once( "$this->plugin_path/templates/members/admin.php" );
            echo '<script src="'.$this->plugin_url.'assets/iuma-members/members-options-validation.js"></script>';
        ob_get_flush();
    }

    public function shortcodePage()
    {
        ob_start();
            require_once("$this->plugin_path/templates/members/shortcode_page.php");
        ob_get_flush();
    }

    public function databaseSection()
    {
        ob_start();
            echo 'Manage credentials to access the database.';
        ob_get_flush();
    }

    public function visualizationSection()
    {
        ob_start();
            echo 'Visualization options, activate the options you want to see in the members table';
        ob_get_flush();
    }

    /**
     * Tabla para la visualización 
     */
    public function membersTable( $attr )
    {
        ob_start();
            require_once ( "$this->plugin_path/templates/members/members_table.php" );
            echo '<link rel="stylesheet" type="text/css" href="'.$this->plugin_url.'assets/datatables/css/jquery.dataTables.min.css">';
            echo '<link rel="stylesheet" type="text/css" href="'.$this->plugin_url.'assets/iuma-members/iuma-members.css">';
            echo '<script src="'.$this->plugin_url.'assets/datatables/js/jquery.dataTables.min.js"></script>';
            echo '<script src="'.$this->plugin_url.'assets/iuma-members/iuma-members.js"></script>';
        return ob_get_clean();
    }
}