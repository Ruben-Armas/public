// Registro del bloque
wp.blocks.registerBlockType('prueba-block/my-block', {
    title: 'Prueba Bloque Dinámico',
    className: '',
    description: 'Prueba de bloque dinámico',
  
    icon: 'slides',
    category: 'ulpgc',
    example: {},
    attributes: {
      selectedPostId: {
        type: 'number',
        default: 0
      }
    },
    
    //Editor view
    edit: function(props) {
      const {selectedPostId} = props.attributes;
      const [isEditing, setIsEditing] = wp.element.useState(false);
  
      var setPostId = function(newPostId) {
        props.setAttributes({ selectedPostId: newPostId });
      };
    
      const handleEdit = () => {
        setIsEditing(true);
      };  
      const handlePreview = () => {
        setIsEditing(false);
      };
      
      
      // Preview
      const previewContent = wp.element.createElement(
        wp.serverSideRender,
        {
          block: props.name,//this.props.name,
          attributes:
            { 
            selectedPostId: selectedPostId,
            },
        }
      );
  
      // Edit
      const editContent = wp.element.createElement(
        'div',
        null,
        //Create Prueba Dynamic
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Prueba de bloque dinámico',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Type in post ID',
              type: 'number',
              value: selectedPostId,
              //placeholder: (newval) => setAttributes({ selectedPostId: parseInt(newval) }),
              onChange: setPostId
            },
          )
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
    save:() => { return null }
  });