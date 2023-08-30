# Inc
Aquí se encuentra la lógica del plugin.

# Clases 
## Init
Esta clase se encarga de inicializar el plugin, es decir, realiza la activación de todos los servicios que proporciona el plugin. Esta clase está definida como una *Non-extended class* de tal forma que es imposible crear clases herederas de dicha clase.

### **Functions**:
#### get_services()
A static function which returns the full list of services into an array.

This services has to be included into the array
with the following sintax:

     [Namespace]\[Class name]::class
     
The suffix **'::class'** is important because if you dont use it the result is the file where is located the class.

#### register_services()
Loop through the services (classes), initialize them, and call the register() method if it exists.

Every class is considered as a service.

#### instantiate( $class ) 
Initialize the class.

**Paramters**:
* **$class** : class from the services array

**Return**:
Returns a new instance of the class.

### **Location**:
 * File: **Init.php**