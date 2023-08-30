<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Base;

/**
 * Define que hacer al activar el plugin. Es recomendable inicializar
 * las opciones del plugin en caso de no existir.
 */
class Activate
{
    /**
     * En caso de no existir las opciones del plugin, crea los 
     * campos en la base de datos con un array vacío.
     */
    public static function activate()
    {
        flush_rewrite_rules();
        
        $default = array();

        if ( ! get_option( 'iuma_plugin' ) )
            update_option('iuma_plugin', $default );

        if ( ! get_option( 'iuma_plugin_cpt' ) )
            update_option('iuma_plugin_cpt', $default );

        if ( ! get_option( 'iuma_plugin_members' ) )
            update_option('iuma_plugin_members', $default );

        if ( ! get_option( 'iuma_plugin_cst' ) )
            update_option('iuma_plugin_cst', $default );    
    }
 }
