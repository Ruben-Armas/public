/* Intento de Import supports
// Importa la constante de configuración de supports
//import { supportsConfig } from './config.js';
//console.log(supportsConfig);
//var config = document.createElement('script');
//config.type = 'text/javascript';
//config.src = './config.js';
//document.getElementsByTagName('head')[0].appendChild(config);

//const confSupports = require('./block-supports.json');
//console.log(confSupports);

//const { CustomToolbar } = require('./toolbar/toolbar1.js');
//import CustomToolbar from "./toolbar/toolbar1.js";
//console.log("accordion");

//import supports from './block-supports.json';
//import { supports } from './config.js';
//const supports = window.wp.blocks.getQueryArg('blockType').supports;

// Encola el archivo "common.js"
wp_enqueue_script('config', './config.js');
// Código específico para el primer sitio
myFunction();
console.log('Este es el código específico para el primer sitio');
*/

wp.blocks.registerBlockType('accordion-block/my-block', {
  title: 'Acordeón',
  className: 'ulpgcds-accordion',
  description: 'Acordeón con el estilo de la ULPGC',

  icon: 'media-spreadsheet',
  category: 'ulpgc',
  example: {},
  attributes: {
    filas: {
      type: 'array',
      default: [
        {
          elemento: '',
          contenido: ''
        }
      ],
      items: {
        type: 'object',
        properties: {
          elemento: {
            type: 'string'
          },
          contenido: {
            type: 'string'
          }
        }
      }
    },
    etiqueta: {
      type: 'string',
      default: 'h3',
    },
    divGroup: {
      type: 'boolean',
      default: false,
    }
  },
  /*supports: {
    align: true,
    color: {
      gradients: true,
      text: true,
      background: true,
      link: true,
    },
    anchor: true,
    ariaLabel: true,
    spacing: {
      margin: [ 'top', 'bottom' ],             // Enable margin for arbitrary sides.
      padding: true,                           // Enable padding for all sides.
      blockGap: [ 'horizontal', 'vertical' ],  // Enables axial (column/row) block spacing controls
    },  
  },*/

/*//Editor view
edit: function(props) {
  //Rom Element & Content
  function setElemento(props, nuevasFilas, index) {
    return function(nuevoElemento) {
      nuevasFilas[index].elemento = nuevoElemento;
      props.setAttributes({ filas: nuevasFilas });
    };
  }   
  function setContenido(props, nuevasFilas, index) {
    return function(nuevoContenido) {
      nuevasFilas[index].contenido = nuevoContenido;
      props.setAttributes({ filas: nuevasFilas });
    };
  }

  return [
    //Create Accordion
    wp.element.createElement(
      'div',
      {
        className: 'ulpgcds-accordion'
        //style: blockStyle 
      },
      props.attributes.filas.map((fila, index) => {
        var nuevasFilas = [...props.attributes.filas];
              
        return [
          wp.element.createElement(
            'h3',
            { key: 'titulo-' + index },
            wp.element.createElement(
              'div',
              { className: 'ulpgcds-accordion-elemento' },
              wp.element.createElement(
                wp.components.TextControl,
                {
                  label: 'Elemento',
                  value: fila.elemento,
                  onChange: setElemento(props, nuevasFilas, index)
                }
              )
            )
          ),
          wp.element.createElement(
            'p',
            { key: 'contenido-' + index },
            wp.element.createElement(
              'div',
              { className: 'ulpgcds-accordion-contenido' },
              wp.element.createElement(
                wp.components.TextareaControl,
                {
                  label: 'Contenido',
                  value: fila.contenido,
                  onChange: setContenido(props, nuevasFilas, index)
                }
              )
            )
          )
        ];
      })
    )
  ];
},*/

  //Editor view
  edit: function(props) {
    //Row Options functions
    function addFila() {
      var nuevasFilas = [...props.attributes.filas];
      nuevasFilas.push({ elemento: '', contenido: '' });
      props.setAttributes({ filas: nuevasFilas });
    };
    function removeFila() {
      var nuevasFilas = [...props.attributes.filas];
      nuevasFilas.pop();
      props.setAttributes({ filas: nuevasFilas });
    };

    //Rom Element & Content
    function setElemento(props, nuevasFilas, index) {
      return function(event) {
        //Only set the changed value
        //const nuevoElemento = event.target.value; //Not neccesary with wp.components (only with 'input', etc)
        const nuevoElemento = event;
        nuevasFilas[index].elemento = nuevoElemento;
        props.setAttributes({ filas: nuevasFilas });
      };
    }   
    function setContenido(props, nuevasFilas, index) {
      return function(event) {
        //only set the changed value
        const nuevoContenido = event;
        nuevasFilas[index].contenido = nuevoContenido;
        props.setAttributes({ filas: nuevasFilas });
      };
    }

    //Label Notice Warning
    const [showWarning, setShowWarning] = wp.element.useState(false);
    wp.element.useEffect(() => {
      if (props.attributes.etiqueta === 'h2') {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    }, [props.attributes.etiqueta]);

    return [
      //Row Options
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Opciones del Acordeón',
          initialOpen: true
        },
        wp.element.createElement(
          wp.components.Flex,
          { direction: 'row', wrap: 'wrap' },
          wp.element.createElement(
            wp.components.FlexItem,
            {
              style: { flexBasis: '20%', flexGrow: 1 },
              direction: 'column'
            },
            wp.element.createElement(
              wp.components.Button,
              { 
                isSecondary: true,
                onClick: addFila,
                style: { marginBottom: '5px' }
              },
              'Añadir fila'
            ),
            wp.element.createElement(
              wp.components.Button,
              {
                isSecondary: true,
                onClick: removeFila,
                disabled: props.attributes.filas.length === 1
              },
              'Eliminar última fila'
            )
          ),
          wp.element.createElement(
            wp.components.FlexItem,
            { style: { flexBasis: '25%', flexGrow: 1 } },
            wp.element.createElement(
              wp.components.SelectControl,
              {
                label: 'Etiqueta de los elementos',
                value: props.attributes.etiqueta,
                options: [
                  { label: 'H3', value: 'h3' },
                  { label: 'H2', value: 'h2' },
                ],
                onChange: function(etiqueta) {
                  props.setAttributes({ etiqueta: etiqueta });
                }
              }
            )
          ),
          wp.element.createElement(
            wp.components.FlexItem,
            { style: { flexBasis: '25%', flexGrow: 1 } },
            wp.element.createElement(
              wp.components.ToggleControl,
              {
                label: 'Encapsular contenidos en \'div\'',
                checked: props.attributes.divGroup,
                onChange: function() {
                  props.setAttributes({ divGroup: !props.attributes.divGroup });
                }
              }
            )
          ),
          wp.element.createElement(
            wp.components.FlexItem,
            { style: { flexBasis: '25%', flexGrow: 1 } },
            wp.element.createElement(
              wp.components.Notice,
              {
                status: 'success',
                isDismissible: false
              },
              'Salto de línea --> (Shift + Enter)',
              wp.element.createElement('br'),
              'Párrafo --> (Enter)'
            )
          )
        ),
        
        //Label Notice Warning
        showWarning && wp.element.createElement(
          wp.components.Notice,
          {
            status: 'warning',
            isDismissible: false
          },
          'La etiqueta H2, sólo se recomienda si no tenemos elementos <h2>, para mantener la secuencia en los niveles.',
          wp.element.createElement('br'),
          'Si las etiquetas de los acordeones de la página no coinciden, no se mostrará el estilo de forma correcta.',
        )
      ),

      //Create Accordion
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Acordeón',
          initialOpen: true,
        },
        props.attributes.filas.map((fila, index) => {
          var nuevasFilas = [...props.attributes.filas];
          return [
            wp.element.createElement(
              wp.components.PanelBody,
              {
                title: 'Fila ' + (index + 1),
                initialOpen: true
              },
              wp.element.createElement(
                wp.components.TextControl,//'input',
                {
                  key: 'titulo-' + index,
                  type: 'text',
                  value: fila.elemento,
                  onChange: setElemento(props, nuevasFilas, index),
                  placeholder: 'Elemento ' + (index + 1),
                }
              ),
              wp.element.createElement(
                wp.editor.RichText,
                {
                  multiline: true,
                  preserveWhiteSpace: true, // Permitir saltos de línea
                  key: 'contenido-' + index,
                  value: fila.contenido,
                  placeholder: 'Contenido ' + (index + 1),
                  onChange: setContenido(props, nuevasFilas, index),
                  style: { fontSize: '14px' }
                }
              )
              /*wp.element.createElement(
                wp.components.TextareaControl,//'input',
                {
                  key: 'contenido-' + index,
                  type: 'text',
                  value: fila.contenido,
                  placeholder: 'Contenido ' + (index + 1),
                  onChange: setContenido(props, nuevasFilas, index)
                }
              )*/
            )
          ];
        })
      ),
    
      //Block inspector
      wp.element.createElement(
        wp.editor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          wp.element.createElement(
            wp.components.Button,
            { 
              isSecondary: true,
              onClick: addFila,
              style: { marginBottom: '5px', marginRight: '10px' }
            },
            'Añadir fila'
          ),
          wp.element.createElement(
            wp.components.Button,
            {
              isSecondary: true,
              onClick: removeFila,
              disabled: props.attributes.filas.length === 1,
              style: { marginBottom: '20px' }
            },
            'Eliminar última fila'
          ),
          wp.element.createElement(
            wp.components.SelectControl,
            {
              label: 'Etiqueta de los elementos',
              value: props.attributes.etiqueta,
              options: [
                { label: 'H3', value: 'h3' },
                { label: 'H2', value: 'h2' },
              ],
              onChange: function(etiqueta) {
                props.setAttributes({ etiqueta: etiqueta });
              }
            }
          ),
          wp.element.createElement(
            wp.components.ToggleControl,
            {
              label: 'Encapsular contenidos en \'div\'',
              checked: props.attributes.divGroup,
              onChange: function() {
                props.setAttributes({ divGroup: !props.attributes.divGroup });
              }
            }
          )
        ),
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          'Salto de línea --> (Shift + Enter)',
          wp.element.createElement('br'),
          'Párrafo --> (Enter)'
        )
      ),
    ];
  },

  //Page view
  save: function(props) {
    return wp.element.createElement(
      'div',
      {
        className: 'ulpgcds-accordion'
      },
      // Cada fila
      props.attributes.filas.map(function(fila, index) {
        const elemento = 
          wp.element.createElement(
            props.attributes.etiqueta,  //Label attribute 'h2'//'h3',
            { key: 'elemento-' + index },
            fila.elemento
          );
        const contenido = 
          wp.element.createElement(
            'div',
            { style: { whiteSpace: 'pre-wrap' } },  // Conservar saltos de línea
            wp.element.createElement(
              wp.editor.RichText.Content,
              {
                key: 'contenido-' + index,
                value: fila.contenido
              }
            )
          );
          /*console.log('log ',fila.contenido);
          wp.element.createElement(
            'p',
            { key: 'contenido-' + index },
            fila.contenido
          );*/
          
        let contenidoWrap;
        if (props.attributes.divGroup) {
          contenidoWrap = wp.element.createElement('div', { key: 'contenido-wrap-' + index }, contenido);
        } else {
          contenidoWrap = contenido;
        }

        return [elemento, contenidoWrap];

        /*
        const procesarLineas = function(lineas) {
          const elementos = [];
          let listaActual = null;
        
          for (let i = 0; i < lineas.length; i++) {
            const linea = lineas[i].trim();
        
            if (linea.startsWith('* ')) {
              if (!listaActual) {
                listaActual = wp.element.createElement('ul', { key: 'ul-' + i });
                elementos.push(listaActual);
              }
        
              const texto = linea.substring(2);
              const elementoLista = wp.element.createElement('li', { key: 'li-' + i }, texto);
              listaActual.props.children.push(elementoLista);
            } else {
              listaActual = null;
              const elementoParrafo = wp.element.createElement('p', { key: 'p-' + i }, linea);
              elementos.push(elementoParrafo);
            }
          }
        
          return elementos;
        };
      
        const lineas = props.attributes.contenido.split('\n');
        const contenido = wp.element.createElement(
          'div',
          { style: { whiteSpace: 'pre-wrap' } },
          procesarLineas(lineas)
        );
  
        return contenido;
        */  
        /*return [
          wp.element.createElement(
            props.attributes.etiqueta,  //Label attribute 'h2'//'h3',
            { key: 'elemento-' + index },
            fila.elemento
          ),
          wp.element.createElement(
            'p',
            { key: 'contenido-' + index },
            fila.contenido
          ),

          divGroup && wp.element.createElement(
            'div',
            { key: 'contenido-div-' + index },
            wp.element.createElement(
              'p',
              { key: 'contenido-' + index },
              fila.contenido
            )
          ),
          !divGroup && wp.element.createElement(
            'p',
            { key: 'contenido-' + index },
            fila.contenido
          )
        ];*/
      })
    );
  }  
})
