function showPreviewFinalSpacing(props){
  const { selectedType } = props.attributes;

  let spacingElement;

  switch (selectedType) {
    case 'xxs': spacingElement = '4px'; break;
    case 'xs': spacingElement = '8px'; break;
    case 's': spacingElement = '12px'; break;
    case 'm': spacingElement = '16px'; break;
    case 'l': spacingElement = '24px'; break;
    case 'xl': spacingElement = '32px'; break;
    case 'xxl': spacingElement = '40px'; break;
    case 'xxxl': spacingElement = '48px'; break;
    default:
      spacingElement = null;
      break;
  }

  return wp.element.createElement(
    'div',
    { 
      style: { height: spacingElement },
      className: 'spacing-'+selectedType 
    }
  );
}

// Registro del bloque
wp.blocks.registerBlockType('spacing-block/my-block', {
  title: 'Espaciado vertical',
  description: 'Línea divisoria con el estilo de la ULPGC',
  icon: 'sort',
  category: 'ulpgc',
  example: {},
  attributes: {
    selectedType: {
      type: 'int',
      default: 'l',
    },
  },

  //Editor view
  edit: function (props) {
    const { selectedType } = props.attributes;
    
    var setSelectedType = function(newSelectedType) {
      props.setAttributes({ selectedType: newSelectedType });
    };

    let options = [
      { label: 'xxs - 4px', value: 'xxs' },
      { label: 'xs - 8px', value: 'xs' },
      { label: 's - 12px', value: 's' },
      { label: 'm - 16px', value: 'm' },
      { label: 'l - 24px', value: 'l' },
      { label: 'xl - 32px', value: 'xl' },
      { label: 'xxl - 40px', value: 'xxl' },
      { label: 'xxxl - 48px', value: 'xxxl' },
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
              label: 'Espaciado vertical',
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
            'Espaciado (' + options.find(option => option.value === selectedType).label + ')'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 11 } },
          
          wp.element.createElement(
            'div',
            { style: { 'background-color': '#7FB2D0' } },
            showPreviewFinalSpacing(props)
          )
        )       
      )
    );
  },

  //Page view
  save: function(props) {
    return showPreviewFinalSpacing(props)
  }
})
