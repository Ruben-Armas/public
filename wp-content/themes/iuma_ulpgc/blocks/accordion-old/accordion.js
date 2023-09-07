wp.blocks.registerBlockType('accordionold-block/my-block', {
    title: 'Acordeón',
    className: 'ulpgcds-accordion',
    description: 'Acordeón con el estilo de la ULPGC',
  
    icon: 'menu-alt3',
    category: 'ulpgc',
    example: {},
    attributes: {
      filas: {
        type: 'array',
        default: [
          {
            id: '',
            elemento: '',
            contenido: ''
          }
        ],
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
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
  
    //Editor view
    edit: function(props) {
      const filas = props.attributes.filas;
      const blockId = props.clientId;
      // Estado para almacenar si se asignó el ID a la primera fila
      const [isFirstRow, setIsFirstRow] = wp.element.useState(false);
  
      //Row Options functions
      function addFila() {
        var nuevasFilas = [...filas];
        nuevasFilas.push({ id: blockId, elemento: '', contenido: '' });
        props.setAttributes({ filas: nuevasFilas });
      }
      function removeFila(index) {
        const nuevasFilas = filas.filter((fila, i) => i !== index);
        props.setAttributes({ filas: nuevasFilas });
      }
  
      //Rom Element & Content
      function setElemento(props, nuevasFilas, index) {
        return function(event) {
          const nuevoElemento = event;
          nuevasFilas[index].elemento = nuevoElemento;
          props.setAttributes({ filas: nuevasFilas });
        };
      }   
      function setContenido(props, nuevasFilas, index) {
        return function(event) {
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
  
      const warningElement = wp.element.createElement(
        wp.components.Notice,
        {
          status: 'warning',
          isDismissible: false
        },
        'La etiqueta H2, sólo se recomienda si no tenemos elementos <h2>, para mantener la secuencia en los niveles.',
        wp.element.createElement('br'),
        'Si las etiquetas de los acordeones de la página no coinciden, no se mostrará el estilo de forma correcta.',
      );
  
      // Help Element
      const helpElement = wp.element.createElement(
        wp.components.Flex,
        { direction: 'row', wrap: 'wrap' },
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          wp.element.createElement(
            wp.components.Notice,
            {
              status: 'success',
              isDismissible: false
            },
            'Salto de línea --> <br>',
            wp.element.createElement('br'),
            'Párrafo --> <p>...</p>',
            wp.element.createElement('br'),
            'Divisores:',
            wp.element.createElement('br'),
            '<hr> | <hr 2> | <hr 4>'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          wp.element.createElement(
            wp.components.Notice,
            {
              status: 'success',
              isDismissible: false
            },
            'Encabezados:',
            wp.element.createElement('br'),
            '  <h2>...</h2>',
            wp.element.createElement('br'),
            '  <h3>...</h3>',
            wp.element.createElement('br'),
            '  <h 1, 2 ... 6>'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          wp.element.createElement(
            wp.components.Notice,
            {
              status: 'success',
              isDismissible: false
            },
            '(Lista) <ol> o <ul>',
            wp.element.createElement('br'),
            '  <li><a href="#">Con link</a></li>',
            wp.element.createElement('br'),
            '  <li>Puedes poner links desde la Toolbar</li>',
            wp.element.createElement('br'),
            '<ol> o <ul>'
          )
        )
      );
  
      return [
        // Accordion Help
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Acordeón Ayuda',
            initialOpen: true
          },
          /*// Debug attributes
            wp.element.createElement(
            wp.components.TextareaControl,
            {placeholder: JSON.stringify(props.attributes, null, 2)},
            
          ),*/
          helpElement
        ),     
        //Label Notice Warning
        showWarning && wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Advertencia etiqueta H2',
            initialOpen: true
          },
          warningElement
        ),
      
        //Block inspector
        wp.element.createElement(
          wp.blockEditor.InspectorControls,
          null,
          // Accordion Help
          wp.element.createElement(
            wp.components.PanelBody,
            {
              title: 'Acordeón Ayuda',
              initialOpen: false
            },
            helpElement
          ),
          // Options
          wp.element.createElement(
            wp.components.PanelBody,
            null,
            wp.element.createElement(
              wp.components.SelectControl,
              {
                label: 'Etiqueta de los elementos /Títulos',
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
            ),
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
              'div',
              null,
              filas.map((fila, index) => (
                wp.element.createElement(
                  wp.components.Button,
                  {
                    isDestructive: true,
                    onClick: () => removeFila(index),
                    style: { marginBottom: '5px', marginRight: '10px' },
                    key: `remove-button-${index}`,
                  },
                  'Eliminar fila ' + (index + 1)
                )
              ))
            )
          ),       
          //Label Notice Warning
          showWarning && warningElement
        ),
  
        //Create Accordion
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Acordeón',
            initialOpen: true,
          },
          filas.map((fila, index) => {
            var nuevasFilas = [...filas];
            // Verifica si es la primera fila y asigna el ID del bloque
            if (index === 0 && !isFirstRow && !fila.id) {
              /*console.log("---------");
              console.log("id fila  ", fila.id);
              console.log("id new   ", props.clientId);
              console.log("id block ", blockId);*/
  
              nuevasFilas[0] = { ...fila }; // Crear una copia independiente de la primera fila
              nuevasFilas[0].id = blockId;
              nuevasFilas[0].elemento = '';
              nuevasFilas[0].contenido = '';
              setIsFirstRow(true); // Actualiza el estado para indicar que se asignó el ID
              props.setAttributes({ filas: nuevasFilas });
            }
  
            // Verifica si la fila pertenece al bloque actual
            //if (fila.id === blockId) {
            const isLastRow = index === filas.length - 1;
            return [
              wp.element.createElement(
                wp.components.PanelBody,
                {
                  title: 'Fila ' + (index + 1),
                  initialOpen: true,
                  key: 'panel-body-' + blockId + '-' + index
                },
                wp.element.createElement(
                  wp.components.TextControl,
                  {
                    key: 'elemento-' + blockId + '-' + index,
                    type: 'text',
                    value: fila.elemento,
                    onChange: setElemento(props, nuevasFilas, index),
                    placeholder: 'Elemento ' + (index + 1),
                  }
                ),
                wp.element.createElement(
                  wp.blockEditor.RichText,
                  {
                    preserveWhiteSpace: true, // Permitir saltos de línea
                    key: 'contenido-' + blockId + '-' + index,
                    value: fila.contenido,
                    placeholder: 'Contenido ' + (index + 1),
                    onChange: setContenido(props, nuevasFilas, index),
                    style: { fontSize: '14px' }
                  }
                )
              ),
              wp.element.createElement(
                wp.components.Button,
                {
                  isDestructive: true,
                  onClick: () => {
                    removeFila(index);
                  },
                },
                'Eliminar fila ' + (index + 1)
              ),
              isLastRow ? (
                wp.element.createElement(
                  wp.components.Button,
                  { 
                    isSecondary: true,
                    onClick: addFila,
                    style: { marginBottom: '5px' }
                  },
                  'Añadir fila'
                )
              ) : '',
            ];
            //}
          })
        ),
      ];
    },
  
    //Page view
    save: function(props) {
      const blockId = props.clientId;
      const filas = props.attributes.filas;
  
      // Interpretar etiquetas
      function transformContent(content) {
        let modifiedContent = content;
        
        // Eliminar párrafos que contienen otras etiquetas
        const pContentRegex = /(<p>)(?!<\/p>)([\s\S]+?)(<\/p>)/gi;
        modifiedContent = modifiedContent.replace(pContentRegex, function(match, p_init_tag, p_content, p_end_tag) {
          //console.log('match='+match + ' p_init_tag='+p_init_tag +' p_content='+p_content +' p_end_tag='+p_end_tag);
          const hasTags = /(<|&lt;)[^>]+>/i.test(p_content);
          return hasTags ? match.replace(match, p_content) : match; // Elimina <p></p> si dentro hay más etiquetas
        });
  
        // Heading
        modifiedContent = modifiedContent.replace(/&lt;(h[123456])>([\s\S]*?)&lt;\/h[123456]>/gi, function(match, head_tag, head_content) {
          return '<'+ head_tag +'>'+ head_content +'</'+ head_tag +'>';
        });
  
        // Paragraph
        modifiedContent = modifiedContent.replace(/&lt;(\/)?p>/gi, function(match, tag) {
          return tag ? '</p>' : '<p>';
        });
  
        // <br>
        modifiedContent = modifiedContent.replace(/&lt;br>/gi, '<br>');
  
        // Divider
        modifiedContent = modifiedContent.replace(/&lt;hr ?([24]?)>/gi, function(match, divider_tag) {
          //console.log('divider_tag='+divider_tag);
          return divider_tag != '' ? '<hr class="divider-'+ divider_tag +'"></hr>' : '<hr>';
        });
  
        // Listas <ol> y <ul>
        const olRegex = /&lt; *(ol|ul) *>([\s\S]*?)&lt;\/(ol|ul)>/gi;
        modifiedContent = modifiedContent.replace(olRegex, function(match, olul_tag, olul_content) {
          // <p> - Eliminar párrafos en la lista
          const pRegex = /<\/*p>/gi;
          //pRegex.test(olul_content) ? console.log('Lista - Párrajos encontrados y eliminados') : console.log('Lista - Párrajos NO encontrados');
          olul_content = olul_content.replace(pRegex, '');
          
          // <li>
          const liRegex = /&lt; *(li) *>(&lt;a href="([^<>]*)">)?([\s\S]*?)(&lt;\/a>)?&lt;\/li>/gi;
          const modifiedOlUlContent = olul_content.replace(liRegex, function(liMatch, li_tag, li_a, li_href, li_content) {
            //console.log(' liMatch='+liMatch +' li_tag='+li_tag +' li_a='+li_a +' li_href='+li_href +' li_content='+li_content);
            if (li_href)
            return '<li><a href="'+ li_href +'">'+ li_content +'</a></li>';
  
            return '<li>'+ li_content +'</li>';
          });
          //console.log('olul_tag='+olul_tag + modifiedOlUlContent);
          return '<'+ olul_tag +' class="ulpgcds-list">' + modifiedOlUlContent + '</'+ olul_tag +'>';
        });
  
        return modifiedContent
      }
  
      return wp.element.createElement(
        'div',
        {
          className: 'ulpgcds-accordion'
        },
        // Cada fila
        filas.map(function(fila, index) {
          const elemento = 
            wp.element.createElement(
              props.attributes.etiqueta,  //Label attribute 'h2'//'h3',
              { key: 'elemento-' + blockId + '-' + index },
              fila.elemento
            );
          const contenido = 
            wp.element.createElement(
              'div',
              {},
              wp.element.createElement(
                wp.blockEditor.RichText.Content,
                {
                  key: 'contenido-' + blockId + '-' + index,
                  value: transformContent(fila.contenido)
                }              
              )
            );
            
          let contenidoWrap;
          if (props.attributes.divGroup) {
            contenidoWrap = wp.element.createElement('div', { key: 'contenido-wrap-' + index }, contenido);
          } else {
            contenidoWrap = contenido;
          }
  
          return [elemento, contenidoWrap];
        })
      );
    }  
  })
  