// Registro del bloque
wp.blocks.registerBlockType('accordion-block/my-block', {
  title: 'Acordeón',
  className: 'ulpgcds-accordion',
  description: 'Acordeón con el estilo de la ULPGC',
  icon: 'menu-alt3',
  category: 'ulpgc',
  example: {},
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },

  edit: function(props) {
    const { items } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    const [showSavedMessage, setShowSavedMessage] = React.useState(false);
    //console.log('props block edit');
    //console.log(items);
    
    /*function showMessage() {
      setShowSavedMessage(true);

      // Después de 2 segundos, ocultar el mensaje de "guardado"
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 2000);
    }
    // Actualiza los atributos obtenidos de los hijos
    function updateData(){
      const hijos = wp.data.select('core/block-editor').getBlocks(props.clientId);

      const atributosHijos = hijos.map((block) => {
        if (block.name === 'accordion-block/row-item' && block.attributes.rowName !== '') {
          return {
            rowName: block.attributes.rowName,
          };
        }
        return null; // Si no es el bloque esperado o no cumple la condición, retorna null
      }).filter((atributo) => atributo !== null); // filter para eliminar los elementos null del resultado.

      // Actualizar los atributos items en el bloque padre solo una vez
      props.setAttributes({ items: atributosHijos });
    }
    function handleSaveButtonClick() {
      showMessage();
      updateData();
    };

    // UseEffect para actualizar los atributos tabNames solo una vez al cargar la página
    React.useEffect(() => {
      updateData();
    }, []);

    const savedMessageElement = showSavedMessage && wp.element.createElement(
      wp.components.Notice,
      {
        status: 'success',
        isDismissible: false
      },
      'Guardado'
    );
    const saveElements = [
      wp.element.createElement(
        wp.components.Notice,
        {
          status: 'warning',
          isDismissible: false
        },
        'Recuerde Guardar / Actualizar el Bloque'
      ),
      // Muestra el mensaje de guardado
      savedMessageElement,
      // Help Element
      wp.element.createElement(
        wp.components.Flex,
        { direction: 'row', wrap: 'wrap' },
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          wp.element.createElement(
            wp.components.Button,
            { 
              isPrimary: true,
              onClick: handleSaveButtonClick,
              style: { marginLeft: '15px' }
            },
            'Guardar / Actualizar Bloque'
          )
        )
      )
    ];*/

    // Edit
    return wp.element.createElement(
      'div', null,
      //Block inspector
      wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        //saveElements,
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          'Para añadir más bloques hijos hay que seleccionar su bloque padre y pulsar el +'
        ),
      ),
      // Create Accordion
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Acordeón',
          initialOpen: true,
        },
        //saveElements,
        wp.element.createElement(
          wp.blockEditor.InnerBlocks,
          {
            allowedBlocks: ['accordion-block/row-item'],
            template: [['accordion-block/row-item', {isInitialOpen: true}]],
            //template: [['core/paragraph']],
            templateLock: false,
          }
        )
      )
    );
  },
  save: function(props) {
    const { items } = props.attributes;

    return wp.element.createElement(
      'div',
      { className: 'ulpgcds-accordion' },
      /*items.map((itemObj, index) => (
        wp.element.createElement(
          'p', null,
          itemObj.rowName
        )
      )),*/
      wp.element.createElement(
        wp.blockEditor.InnerBlocks.Content,
        null
      )
    );
  }
});

wp.blocks.registerBlockType('accordion-block/row-item', {
  title: 'Fila / Elemento',
  icon: 'list-view',
  category: 'ulpgc',
  parent: ['tabs-block/my-block'],
  attributes: {
    rowName: {
      type: 'string',
      default: '',
    },
    tagName: {
      type: 'string',
      default: '',
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
      props.setAttributes({ newTagName: newTagName });
    }
    var setDivCheck = function() {
      props.setAttributes({ divCheck: !divCheck });
    };

    return [
      //Block inspector
      /*wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          'Para añadir más bloques hijos hay que seleccionar su bloque padre y pulsar el +'
        ),
        // Options
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          wp.element.createElement(
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
          wp.element.createElement(
            wp.components.ToggleControl,
            {
              label: 'Encapsular contenidos en \'div\'',
              checked: divCheck,
              onChange: setDivCheck
            }
          )
        ),
      ),*/
      // Create Accordion Row
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: `Fila/Elemento --> ${rowName}`,
          initialOpen: isInitialOpen,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Nombre de la Fila/Elemento',
            type: 'text',
            value: rowName,
            onChange: setRowName
          },
        ),
        //'Contenido: (Puede añadir todos los bloques que necesite)',
        wp.element.createElement(
          wp.blockEditor.InnerBlocks,
          {
            template: [['core/paragraph']],
            templateLock: false
          }
        ),
      )
    ];
  },
  save: function(props) {
    const { rowName, tagName, divCheck } = props.attributes;
    
    const contentRow = wp.element.createElement(
      wp.blockEditor.InnerBlocks.Content,
      null
    );

    return [
      wp.element.createElement(
        'div', null,
        wp.element.createElement(
          'h3',//tagName,
          null, rowName
        ),
        //divCheck ? (
          wp.element.createElement(
            'div', null,
            //contentRow
            wp.element.createElement(
              wp.blockEditor.InnerBlocks.Content,
              null
            )
          )
        //) : ''
      )
    ];
  }
});