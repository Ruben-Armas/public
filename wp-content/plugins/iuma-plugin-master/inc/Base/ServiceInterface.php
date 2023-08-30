<?php 
/**
 * @package IUMAPlugin
 */

namespace Inc\Base;
 
 /**
  * Interfaz común para todos los servicios
  */
interface ServiceInterface 
{
    /**
     * Función que permite utilizar el servicio. La clase Inc/Init.php 
     * lanza está función para preparar el servicio.
     */
    public function register();
}