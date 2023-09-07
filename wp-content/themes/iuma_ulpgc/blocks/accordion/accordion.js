( function ( blocks, element, blockEditor ) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;
  var useBlockProps = blockEditor.useBlockProps;
  var useInnerBlocksProps = blockEditor.useInnerBlocksProps;

  blocks.registerBlockType('accordion-block/my-block', {
    title: 'Acordeón',
    className: 'ulpgcds-accordion',
    description: 'Acordeón con el estilo de la ULPGC',
    icon: 'menu-alt3',
    category: 'ulpgc',
    example: {},

    edit: function () {
      var blockProps = useBlockProps();
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ['accordion-block/row-item'],
        template: [ [ 'accordion-block/row-item', {isInitialOpen: true} ] ],
        templateLock: false,
      })

      const helpElement = el(
        wp.components.Notice,
        {
          status: 'success',
          isDismissible: false
        },
        'Para añadir más bloques hijos seleccione su bloque padre y pulse +',
        wp.element.createElement('br'),
        'Cada recuadro representa un nive de jeararquía.'
      );

      return [
        //Block inspector
        el(
          wp.blockEditor.InspectorControls,
          null,
          helpElement,
        ),
        // Create Accordion
        el(
          'div',
          { style: { border: '2px solid #0066a1' } },
          el(
            wp.components.PanelBody,
            {
              title: 'Acordeón',              
              initialOpen: true,
            },
            helpElement,
            el( 
              'div',
              blockProps,
              el(
                'div',
                innerBlocksProps
              )
            )
          )
        )
      ];
    },

    save: function () {
      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      return el(
        'div',
        { className: 'ulpgcds-accordion' },
        innerBlocksProps.children //Quita la envoltura del div adicional
      );
      
    }
  });


  wp.blocks.registerBlockType('accordion-block/row-item', {
    title: 'Accordion Row',
    icon: 'list-view',
    category: 'ulpgc',
    parent: ['accordion-block/my-block'],
    attributes: {
      rowName: {
        type: 'string',
        default: '',
      },
      tagName: {
        type: 'string',
        default: 'h3',
      },
      divCheck: {
        type: 'boolean',
        default: false,
      },
      isInitialOpen: {
        type: 'boolean',
        default: false,
      },
    },
  
    edit: function(props) {
      const { attributes, setAttributes } = props;
      const { rowName, tagName, divCheck, isInitialOpen } = attributes;
  
      var setRowName = function(newRowName) {
        setAttributes({ rowName: newRowName });
      };
      var setTagName = function(newTagName) {
        props.setAttributes({ tagName: newTagName });
      }
      var setDivCheck = function() {
        props.setAttributes({ divCheck: !divCheck });
      };

      //Label Notice Warning
      const [showWarning, setShowWarning] = wp.element.useState(false);
      wp.element.useEffect(() => {
        if (tagName === 'h2') {
          setShowWarning(true);
        } else {
          setShowWarning(false);
        }
      }, [tagName]);
  
      const warningElement = el(
        wp.components.Notice,
        {
          status: 'warning',
          isDismissible: false
        },
        'La etiqueta H2, sólo se recomienda si no tenemos elementos <h2>, para mantener la secuencia en los niveles.',
        el('br'),
        el('strong', null, 'Todas las etiquetas de los acordeones de la página deben coincidir, si no, fallarán los estilos'),
      );

      var blockProps = useBlockProps();
      //Personalizando las opciones disponibles
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        template: [ ['core/paragraph'] ],
        templateLock: false,
      })
      return [
        //Block inspector
        el(
          wp.blockEditor.InspectorControls,
          null,
          el(
            wp.components.Notice,
            {
              status: 'success',
              isDismissible: false
            },
            'Para añadir más bloques hijos seleccione su bloque padre y pulse +'
          ),
          //Label Notice Warning H2
          showWarning && warningElement,
          // Options
          el(
            wp.components.PanelBody,
            null,
            el(
              wp.components.SelectControl,
              {
                label: 'Etiqueta de las Filas / Elementos /Títulos',
                value: tagName,
                options: [
                  { label: 'H3', value: 'h3' },
                  { label: 'H2', value: 'h2' },
                ],
                onChange: setTagName
              }
            ),
            el(
              wp.components.ToggleControl,
              {
                label: 'Encapsular contenidos en \'div\'',
                checked: divCheck,
                onChange: setDivCheck
              }
            )
          ),
        ),
        // Create Accordion Row        
        el(
          'div',
          { style: { border: '2px solid #ffa100' } },
          el(
            wp.components.PanelBody,
            {
              title: `Fila/Elemento --> ${rowName}`,
              initialOpen: isInitialOpen,
            },
            el(
              wp.components.TextControl,
              {
                label: 'Nombre de la Fila/Elemento',
                type: 'text',
                value: rowName,
                onChange: setRowName
              },
            ),
            'Contenido: (Puede añadir todos los bloques que necesite)',
            /*el(
              'div',
              innerBlocksProps
            )*/
            el (
              'div',
              {
                style: {
                  border: '2px solid #565a66', // Define el estilo del borde
                  padding: '20px', // Define el relleno
                }
              },
              el( 
                'div',
                blockProps,
                el(
                  'div',
                  innerBlocksProps
                )
              )
            )
          )
        )
      ];
    },

    save: function(props) {
      const { rowName, tagName, divCheck } = props.attributes;

      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();
      
      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        el(
          tagName,
          null, rowName
        ),
        divCheck ? (
          el(
            'div', null,
            innerBlocksProps.children //Quita la envoltura del div adicional
          )
        ) : innerBlocksProps.children
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );