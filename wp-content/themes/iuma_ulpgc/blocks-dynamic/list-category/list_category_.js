// Registro del bloque
wp.blocks.registerBlockType('listcategory-block/my-block', {
  title: 'Lista de Entradas / Categorías',
  description: '(Bloque dinámico) Lista de Entradas/Categorías en forma de Tarjeta/Card con el estilo de la ULPGC',

  icon: 'excerpt-view',
  category: 'ulpgc',
  example: {},
  attributes: {
    selectedCategory: {
      type: 'int',
      default: 0,
    }
  },
  
  edit: function(props) {
    const {selectedCategory} = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);

    var setSelectedCategory = function(newSelectedCategory) {
      props.setAttributes({ selectedCategory: parseInt(newSelectedCategory) });
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
            selectedCategory: selectedCategory,
          },
      }
    );

    // Edit
    const editContent = wp.element.createElement(
      'div',
      null,
      //Create Carrusel news Dynamic
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Lista de Entradas/Categorías (Dinámico)',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Type in post ID',
            type: 'number',
            value: selectedCategory,
            onChange: setSelectedCategory
          },
        ),
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