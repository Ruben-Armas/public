function showPreviewFinalDivider(props){
  const { selectedType } = props.attributes;

  let dividerElement;

  switch (selectedType) {
    case 'small':
      dividerElement = wp.element.createElement('hr', null);
      break;
    case 'medium':
      dividerElement = wp.element.createElement(
        'hr',
        { className: 'divider-2' }
      );
      break;
    case 'large':
      dividerElement = wp.element.createElement(
        'hr',
        { className: 'divider-4' }
      );
      break;
    default:
      dividerElement = null;
      break;
  }

  return wp.element.createElement(
    'div',
    null,
    dividerElement
  );
}

// Registro del bloque
wp.blocks.registerBlockType('divider-block/my-block', {
  title: 'Divisor',
  description: 'Línea divisoria con el estilo de la ULPGC',
  icon: 'minus',
  category: 'ulpgc',
  example: {},
  attributes: {
    selectedType: {
      type: 'int',
      default: 'medium',
    },
  },

  //Editor view
  edit: function (props) {
    const { selectedType } = props.attributes;
    
    var setSelectedType = function(newSelectedType) {
      props.setAttributes({ selectedType: newSelectedType });
    };

    let options = [
      { label: 'Grande', value: 'large' },
      { label: 'Mediano', value: 'medium' },
      { label: 'Pequeño', value: 'small' },
    ];

    // Edit
    return wp.element.createElement(
      'div', null,      
      //Block inspector
      wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          wp.element.createElement(
            wp.components.SelectControl,
            {
              label: 'Tamaño de la línea divisoria',
              value: selectedType,
              options: options,
              onChange: setSelectedType
            }
          ),
        )
      ),
      //Preview
      wp.element.createElement(
        wp.components.Flex,
        { direction: 'row', wrap: 'wrap' },
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          
          wp.element.createElement(
            'p', null,
            'Divisor (' + options.find(option => option.value === selectedType).label + ')'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 11 } },
          
          showPreviewFinalDivider(props)
        )       
      )
    );
  },

  //Page view
  save: function(props) {
    return showPreviewFinalDivider(props)
  }
})
