<?php
/**
 * @package IUMAPlugin
 */

namespace Inc;

final class Init // Non-extended class
{
    /**
     * Store the full list of services into an array.
     * This services has to be included into the array
     * with the following sintax:
     *   [Namespace]\[Class name]::class
     *
     * '::class' is important because if you dont use it
     * the result is the file where is located the class.
     * 
     * @return array Full list of classes.
     */
    public static function get_services() 
    {
        return array(
            Services\Base\Enqueue::class,
            Services\Base\SettingsLinks::class,
            Services\ServicesManager\ServicesManagerController::class, //Main menu_slug
            Services\CustomPostType\CustomPostTypeController::class,
            Services\Members\MembersController::class,
            Services\CustomSQLTable\CustomSQLTableController::class
        );
    }

    /**
     * Loop through the services (classes), initialize them, and call
     * the register() method if it exists.
     * Every class is considered as a service.
     * 
     * @return 
     */
    public static function register_services()
    {
        foreach ( self::get_services() as $class )
        {
            $service = self::instantiate( $class );
            if ( method_exists($service, 'register') )
            {
                $service->register();
            }
        }
    }

    /**
     * Initialize the class
     * 
     * @param class $class      class from the services array
     * @return class instance   new instance of the class
     */
    private static function instantiate( $class )
    {
        return new $class();
    }
}
