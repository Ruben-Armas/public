function showPreviewFinalTest(props){
  const { items } = props.attributes;

  return wp.element.createElement(
    'div',
    null,
    wp.element.createElement(
      'ul',
      { className: 'ulpgcds-tabs' },
      items.map((itemObj, index) => (
        wp.element.createElement(
          'li',
          {
            key: itemObj.randomId,
            href: `#tab-${itemObj.randomId}`,
            className: index === 0 ? 'active' : ''
          },
          itemObj.tabIcon && wp.element.createElement(
            'span',
            { className: `icon ${itemObj.tabIcon}` }
            ),
          itemObj.tabName
        )
      ))
    ),
    wp.element.createElement(
      wp.blockEditor.InnerBlocks.Content,
      null
    )
  );
}

// Registro del bloque
wp.blocks.registerBlockType('test-block/my-block', {
  title: 'Test Innerblocks',
  icon: 'admin-tools',
  category: 'ulpgc',
  example: {},
  attributes: {
    title: {
      type: 'string',
      default: ''
    }
  },

  edit: function(props) {
    const { title } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    console.log('title-> '+title);
    
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };

    // Preview
    const previewContent = wp.element.createElement(
      'div', null,
      'Titulo'      
    );

    // Edit
    const editContent = wp.element.createElement(
      'div', null,
      // Create Test
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Test Innerblocks',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.blockEditor.InnerBlocks,
          {
            allowedBlocks: ['core/heading'],
            template: [['core/heading']],            
            templateLock: false,
          }
        ),
        // Muestra una vista previa del contenido usando InnerBlocks.Content
        /*wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        ),*/
        // Botón para salir de la edición
        wp.element.createElement(
          wp.components.Button,
          { isPrimary: true, onClick: handlePreview },
          'Vista previa'
        )
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
  save: function(props) {
    //return showPreviewFinalTabs(props);
  }
  //save:() => { return null }
});
