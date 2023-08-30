<?php 
/**
 * @package IUMAPlugin
 */

namespace Inc\Base;

use \Inc\Base\ServiceInterface;

/**
 * Interfaz común para los servicios que tengan opciones y, por lo tanto,
 * es necesario añadir una página para la configuración de las opciones.
 * 
 * This class extends from Base/ServiceInterface.
 */
interface ServiceWithOptionsInterface extends ServiceInterface
{
    /**
     * Para preparar el grupo de opciones del servicio
     */
    public function setSettings();

    /**
     * Indica como visualizar las distintas opciones repartidas en secciones.
     */
    public function setSections();

    /**
     * Indicar los campos de opciones. Véase la clase Utils\OptionFields para
     * declarar los campos.
     */
    public function setFields();
}