# Services/Base

* namespace: *Inc/Services/Base*

All the classes defined here are considered as a service and it is necessary to include in the *Inc\Init:get_services()* function (see [documentation](../../readme.md)).

## **Enqueue**
---
This class enqueues the styles (css files) and scripts (javascript files) whichs are going to be used in the **administration panel**.


### **Functions**:
####  enqueue():
Defines the files to be included in the administration panel. This files will be included when the services is registered.
```php
    public static function enqueue() 
    {
        // enqueue all our scripts
        wp_enqueue_style('my_style', 'my_style.css');
        wp_enqueue_script('my_script', 'my_script.js');
        wp_enqueue_script('another_script_which_depends_on_jquery', 'another.js', array('jquery'));
    }
```
--

## **SettingsLink**
---
This class defines the links which will be appear in the plugin panel (where you activate/deactivate the plugins).

### **Functions**:
####  settings_link():
Defines the links wich are going to to be included in the plugin panel.

**Example**:
```php
    public function settings_link( $links )
    {
        // Add custom settings link
        $settings_link = '<a href="admin.php?page=iuma_plugin">Settings</a>';
        array_push( $links, $settings_link );

        $another_settings_link = '<a href="https://bestwebever.es">Another setting link</a>';
        array_push( $links, $another_settings_link );

        return $links;
    }
```