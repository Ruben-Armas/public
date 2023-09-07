// Registro del bloque
wp.blocks.registerBlockType('accordion-block/my-block', {
  title: 'Acordeón',
  className: 'ulpgcds-accordion',
  description: 'Acordeón con el estilo de la ULPGC',
  icon: 'menu-alt3',
  category: 'ulpgc',
  example: {},

  edit: function(props) {
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
      // Create Tabs
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
            templateLock: false,
          }
        )
      )
    );
  },
  save: function(props) {  
    return wp.element.createElement(
      'div',
      { className: 'ulpgcds-accordion' },      
      wp.element.createElement(
        wp.blockEditor.InnerBlocks.Content,
        null
      )
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

    return [
      //Block inspector
      wp.element.createElement(
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
      ),
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
        'Contenido: (Puede añadir todos los bloques que necesite)',
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
    
    return wp.element.createElement(
      'div', null,
      wp.element.createElement(
        tagName,
        null, rowName
      ),
      divCheck ? (
        wp.element.createElement(
          'div', null,
          contentRow
        )
      ) : contentRow
    );
  }
});