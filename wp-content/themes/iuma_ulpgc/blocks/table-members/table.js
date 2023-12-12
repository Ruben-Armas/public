const rowsPerPageVal = 10;

function showPreviewFinalTableMembers(props){
  const { selectedType, maxRows } = props.attributes;

  return wp.element.createElement(
    'div', 
    { 'data-members-maxrows': maxRows },
    selectedType !== 'ALL' ? `[iuma-members division='${selectedType}']` : "[iuma-members division]"
  );
}

// Registro del bloque
wp.blocks.registerBlockType('table-members-block/my-block', {
  title: 'Tabla de miembros',
  description: 'Tabla de miembros del IUMA con el estilo de la ULPGC',
  icon: 'editor-table',
  category: 'ulpgc',
  example: {},
  attributes: {
    selectedType: {
      type: 'int',
      default: 'ALL',
    },
    maxRows: {
      type: 'number',
      default: rowsPerPageVal
    },
  },

  edit: function(props) {
    const { attributes, setAttributes } = props;
    const { selectedType, maxRows } = attributes;
    
    var setSelectedType = function(newSelectedType) {
      setAttributes({ selectedType: newSelectedType });
    };
    var setMaxRows = function(newMaxRows) {
      setAttributes({ maxRows: newMaxRows });
    };

    let options = [
      { label: 'Todas', value: 'ALL' },
      { label: 'COM', value: 'COM' },
      { label: 'DSI', value: 'DSI' },
      { label: 'MAGIC', value: 'MAGIC' },
      { label: 'MEMS', value: 'MEMS' },
      { label: 'SICAD', value: 'SICAD' },
      { label: 'TI', value: 'TI' },
      { label: 'TME', value: 'TME' },
    ];

    const divisionSelector = wp.element.createElement(
      wp.components.SelectControl,
      {
        label: 'Seleccione la división',
        value: selectedType,
        options: options,
        onChange: setSelectedType
      }
    );
    const rangeMaxRows = wp.element.createElement(
      wp.components.RangeControl,
      {
        label: 'Nº de filas por página',
        type: 'number',
        value: maxRows,
        initialPosition: rowsPerPageVal,
        onChange: setMaxRows,
        min: '1',
        max: '25',
        allowReset: true,
        railColor: 'red'
      },
    );

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
          divisionSelector,
          rangeMaxRows
        )
      ),

      //Create Member Table
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Tabla de Miembros del IUMA',
          initialOpen: true,
        },

        wp.element.createElement(
          wp.components.Flex,
          { direction: 'row', wrap: 'wrap' },
          wp.element.createElement(
            wp.components.FlexItem,
            { style: { flexGrow: 1 } },
            
            divisionSelector
          ),
          wp.element.createElement(
            wp.components.FlexItem,
            { style: { flexGrow: 1 } },
            
            rangeMaxRows
          )       
        ),

        //Preview
        wp.element.createElement(
          'div', null,
          'Shortcode',
          showPreviewFinalTableMembers(props)
        )
      ),
    );
  },
  // Save view
  save: function(props) {    
    return showPreviewFinalTableMembers(props);
  }
});