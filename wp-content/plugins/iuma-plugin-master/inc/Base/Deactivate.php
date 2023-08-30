<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Base;

/**
 * Define que hacer al desactivar el plugin. 
 */
class Deactivate
{
    public static function deactivate()
    {
        flush_rewrite_rules();
    }
}