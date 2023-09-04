const isURLValid = function (url) {
    // Verificar si la URL es válida
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };
  
  function showPreviewFinalWebView(props){
    const { url } = props.attributes;
  
    const view = wp.element.createElement(
      'iframe',
      {
        src: url,
        style: { width: '100%', height: '100%' }
      },
    );
  
    return isURLValid(url) ? view : console.log("No se pudo mostrar la web embebida");  
  };
  
  // Registro del bloque
  wp.blocks.registerBlockType('webview-block/my-block', {
    title: 'Web embebida',
    description: 'Web embebida',  
    icon: 'editor-code',
    category: 'ulpgc',
    example: {},
    attributes: {
      url: {
        type: 'string',
        default: '',
      }
    },
  
    //Editor view
    edit: function (props) {
      const { url } = props.attributes;
      const [isEditing, setIsEditing] = wp.element.useState(false);
      var setUrl = function(newUrl) {
        props.setAttributes({ url: newUrl });
      };
    
      const handleEdit = () => {
        setIsEditing(true);
      };  
      const handlePreview = () => {
        setIsEditing(false);
      };
  
      // Preview
      previewContent = isURLValid(url) ? showPreviewFinalWebView(props) : 
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Web embebida',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'warning',
            isDismissible: false
          },
          'No se ha introducido ninguna url para mostrar o es incorrecta'
        )
      );
      
      // Edit
      const editContent = wp.element.createElement(
        'div',
        null,
  
        //Create WebView
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Web embebida',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.blockEditor.URLInput,
            {
              label: 'Dirección (Url) de la web a mostrar',
              placeholder: 'url',
              value: url,
              onChange: setUrl
            }
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
  
    //Page view
    save: function (props) {
      return showPreviewFinalWebView(props)
    }
  })
  