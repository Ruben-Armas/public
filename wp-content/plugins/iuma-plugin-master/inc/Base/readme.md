# Base 
Aquí se encuentran las clases básicas para utilizar en el plugin
* **Namespace**: *Inc\Base*

# Interfaces
## **ServiceInterface**

Interfaz común para todos los servicios

### ***Functions to implement***:
  
1. ***register()***:
    
    Función que permite utilizar el servicio. La clase [Inc/Init](../readme.md) lanza está función para preparar el servicio.

---

## **ServiceWithOptionsInterface**
* Extends: *ServiceInterface*


Interfaz común para los servicios que tengan opciones y, por lo tanto, es necesario añadir una página para la configuración de las opciones.

### ***Functions to implement***:

1. ***setSettings()***:
    
    Para preparar el grupo de opciones del servicio.

1. ***setSections()***:
    
    Indica las distintas secciones para visualizar las distintas opciones.

1. ***setFields()***:
    
    Indicar los campos de opciones. Véase la clase [Utils\OptionFields](../Utils/readme.md) para declarar los campos.

---

# Classes
## **Activate**
---
This class contains a static function which defines the activation of the plugin. It is recommended to included a initialization of the plugin options in order to rule out problems if the options does not exist in the database.


### **Functions**:
####  activate():
Defines the steps to do when the plugin is activated. This function has to be hooked using the *register_activation_hook()*.

**Example**:
```php
    register_activation_hook( __FILE__, array( Inc\Base\Activate::class, 'activate' ));
```

## **Deactivate**
---
This class contains a static function which defines the deactivation of the plugin.


### **Functions**:
####  deactivate():
Defines the steps to do when the plugin is deactivated. This function has to be hooked using the *register_deactivation_hook()*.

**Example**:
```php
    register_deactivation_hook( __FILE__, array( Inc\Base\Deactivate::class, 'deactivate' ));
```

## **DependencyChecker**
---
Performs the actual check whether the required plugins are active. Plugins have to be both installed and active to pass the check.

### **Attributes**:
#### REQUIRED_PLUGINS:
Define the plugins that our plugin requires to function. The definition is a string[].

**Example**:
```php
    const REQUIRED_PLUGINS = array(
        'Some Plugin'    => 'some-plugin/some-plugin.php',
        'Another Plugin' => 'another-plugin/another-plugin.php',
    );
```

### **Functions**:
####  check():
Check if all required plugins are active. If not, throw an exception (see [DependencyException](../Exception/readme.md)).

####  get_missing_plugin_list():
Iterates the list of required plugins and returns the names of inactive ones in array format.

#
