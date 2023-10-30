function showPreviewFinalSeeMore(props){
  const { labelText, url } = props.attributes;

  return wp.element.createElement(
    'div', null,
    wp.element.createElement(
      'hr',
      { style: { marginBottom: '0' } },
    ),
    wp.element.createElement(
      'a',
      {
        className: 'ulpgcds-btn ulpgcds-btn--text',
        href: url,
        style: { float: 'right', margin: '0' }
      },
      labelText,      
      wp.element.createElement(
        'i',
        { className: 'ulpgcds-icon-arrow-right ulpgcds-icon--right' },
      )
    )
  );
}

// Registro del bloque
wp.blocks.registerBlockType('seemore-block/my-block', {
  title: 'Ver más',
  description: 'Línea de "Ver más" con el estilo de la ULPGC',
  icon: 'arrow-right-alt',
  category: 'ulpgc',
  example: {},
  attributes: {
    labelText: {
      type: 'string',
      default: 'Ver más',
    },
    url: {
      type: 'string',
      default: '',
    },
  },

  //Editor view
  edit: function (props) {
    const { labelText, url } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    
    var setLabelText = function(newLabelText) {
      props.setAttributes({ labelText: newLabelText });
    };
    var setUrl = function(newUrl) {
      props.setAttributes({ url: newUrl });
    };
    
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };

    // Edit
    const editContent = wp.element.createElement(
      wp.components.PanelBody,
      {
        title: 'Ver más',
        initialOpen: true,
      },
      wp.element.createElement(
        wp.components.TextControl,
        {
          label: 'texto para ver más',
          placeholder: 'Ej: ver más noticias',
          type: 'text',
          value: labelText,
          onChange: setLabelText
        }
      ),
      wp.element.createElement(
        wp.blockEditor.URLInput,
        {
          placeholder: 'Dirección (Url) del "Ver más"',
          value: url,
          onChange: setUrl
        }
      ),

      // Botón para salir de la edición
      wp.element.createElement(
        wp.components.Button,
        { isPrimary: true, onClick: handlePreview },
        'Vista previa'
      )
    );
    
    return wp.element.createElement(
      'div',
      null,
      // Muestra la vista previa o el editor
      isEditing ? editContent : showPreviewFinalSeeMore(props),
      // Botón editar
      !isEditing && wp.element.createElement(
        wp.components.Button,
        {
          isPrimary: true,
          onClick: handleEdit,
          style: { marginTop: '5px' }
        },
        'Editar'
      )
    );
  },

  //Page view
  save: function(props) {
    return showPreviewFinalSeeMore(props)
  }
})
