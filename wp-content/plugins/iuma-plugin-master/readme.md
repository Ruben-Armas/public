# IUMA Plugin
Plugin interno del IUMA para la elaboración de herramientas utilizadas en sus entornos webs basados en wordpress. Todas las funcionalidades se encuentran listadas y descritas en el apartado [Sections](#Sections). 

**Version**: 0.9.0

## Prerequisites
It's necessary to install and activate the following wordpress plugins:

* [Email Encoder](https://es.wordpress.org/plugins/email-encoder-bundle/)
    * Version 2.0.7 or above

*If the plugins are not available or activated, the plugin will indicate to activate these plugins with an **error message**.*

*The list of dependencies is defined in the **DependencyChecker** class. If you are interested in included more dependencies, see the [documentation](inc/Base/readme.md).*

## Libraries
* [Composer](https://getcomposer.org/)
* [jQuery Validation](https://jqueryvalidation.org/)
    * Included in the repository
* [jQuery Datatables](https://datatables.net/)
    * Included in the repository
* [Select2](https://select2.org/)
    * Included in the repository

## Sections

Full list of sections and features:

* [***Services Manager***](inc/Services/ServicesManager/readme.md): Modular administration area which can be used in order to activate or deactivate the another services.
* [***CPT Manager***](inc/Services/CustomPostType/readme.md): Custom Post Manager (It was created just for testing).
* [***IUMA Members***](inc/Services/Members/readme.md): CreateS a table using a shortcode that visualize the IUMA members.
* [***Custom SQL Table***](inc/Services/CustomSQLTable/readme.md): Displays a table whose data is obtained from a SQL query.

## Install Instructions
... 

```bash
    php composer install
```
Now, you will find a directory called *vendor* here you will find the *autoload* module necessary to use this plugin.

## TODO List
* Uninstall process...
* To fix sanitize options
* NPM Support

## References
1. [Tutorial: How to build a Wordpres Plugin from scratch](https://github.com/Alecaddd/WordPressPlugin101)
1. [Check Plugin Dependencies](https://github.com/waclawjacek/code-examples/tree/master/check-plugin-dependencies)

