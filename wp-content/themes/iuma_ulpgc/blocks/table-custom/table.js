// Registro del bloque
wp.blocks.registerBlockType('table-block/my-block', {
  title: 'Tabla',
  description: 'Tabla con el estilo de la ULPGC',
  icon: 'editor-table',
  category: 'ulpgc',
  example: {},
  attributes: {
    dateCheck: {
      type: 'boolean',
      default: false
    },
    date: {
      type: 'string',
      default: ''
    },
    phoneView: {
      type: 'boolean',
      default: false
    },
    url: {
      type: 'string',
      default: ''
    },
    image: {
      type: 'string',
      default: ''
    },
    altImage: {
      type: 'string',
      default: ''
    },
    title: {
      type: 'string',
      default: ''
    },
    content: {
      type: 'string',
      default: ''
    }
  },

  edit: function(props) {
    const { title, content } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    var setTitle = function(newTitle) {
      props.setAttributes({ title: newTitle });
    };
    var setContent = function(newContent) {
      props.setAttributes({ content: newContent });
    };
    
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };

    const defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';

    // Preview
    const previewContent = wp.element.createElement(
      'div',
      {
        className: 'ulpgcds-article'
      },
      wp.element.createElement(
      'h3', null,
        title ? title : 'Título del artículo'
      ),
      wp.element.createElement(
        'p', null,
        content ? content : 'Contenido del artículo'
      )
    );

    // Edit
    const editContent = wp.element.createElement(
      'div', null,
      //Block inspector
      /*wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          wp.element.createElement(
            wp.blockEditor.URLInput,
            {
              label: 'Dirección (Url) del artículo',
              value: url,
              onChange: setUrl
            }
          ),
        )
      ),*/
      //Create Article
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Cards',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Título',
            value: title,
            onChange: setTitle
          }
        ),
        wp.element.createElement(
          wp.components.TextareaControl,
          {
            label: 'Contenido (Opcional)',
            rows: 4,
            multiline: true,
            value: content,
            onChange: setContent
          }
        ),
        // Botón para salir de la edición
        wp.element.createElement(
          wp.components.Button,
          { isPrimary: true, onClick: handlePreview },
          'Vista previa'
        )
      ),
    );
  
    return wp.element.createElement(
      'div',
      null,
      // Muestra la vista previa o el editor
      isEditing ? editContent : previewContent,
      // Botón editar
      !isEditing && wp.element.createElement(
        wp.components.Button,
        {
          isPrimary: true,
          onClick: handleEdit
        },
        'Editar'
      )
    );    
  },
  // Save view
  save: function(props) {
    const { title, content } = props.attributes;
    
    return wp.element.createElement(
      'div',
      {
        className: 'ulpgcds-article'
      },
      wp.element.createElement(
        'h3', null,
        title
      ),
      wp.element.createElement(
        'p', null,
        content
      )
    )
  }
});