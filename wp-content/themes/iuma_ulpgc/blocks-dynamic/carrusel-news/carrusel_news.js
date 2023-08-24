const { withSelect, select } = wp.data;

class FirstBlockEdit extends wp.element.Component {
  render() {
    const { attributes, setAttributes, categories } = this.props;
    const {maxPosts, isEditing} = attributes;

    let choices = [];
    if (this.props.posts) {
      choices.push({ value: 0, label: 'Select a post' });
      this.props.posts.forEach(post => {
        choices.push({ value: post.id, label: post.title.rendered });
      });
    } else {
      choices.push({ value: 0, label: 'Loading...' })
    }

    var setMaxPosts = function(newMaxPosts) {
      setAttributes({ maxPosts: newMaxPosts });
    };
    var setSelectedCategory = function(newSelectedCategory) {
      setAttributes({ selectedCategory: parseInt(newSelectedCategory) });
    };
  
    const handleEdit = () => {
      setAttributes({ isEditing: true });
      console.log('set_true');
    };  
    const handlePreview = () => {
      setAttributes({ isEditing: false });
      console.log('set_false');
    }; 

    // Preview
    const previewContent = wp.element.createElement(
      wp.serverSideRender,
      {
        block: this.props.name,
        attributes:
          { 
            maxPosts: maxPosts,
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
          title: 'Carrusel de Noticias (Dinámico)',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Nº máximo de posts',
            type: 'number',
            value: maxPosts,
            placeholder: '5',
            onChange: setMaxPosts
          },
        ),
        wp.element.createElement(
          wp.components.SelectControl,
          {
            label: 'Seleccione una categoría a mostrar',
            options: choices,
            value: attributes.selectedCategory,
            onChange: setSelectedCategory
          }
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
  }
}

// Registro del bloque
wp.blocks.registerBlockType('carruselnews-block/my-block', {
  title: 'Carrusel Noticias Recientes',
  className: 'ulpgcds-carrusel',
  description: '(Bloque dinámico) Carrusel de noticias recientes con el estilo de la ULPGC',

  icon: 'slides',
  category: 'ulpgc',
  example: {},
  attributes: {
    maxPosts: {
      type: 'number',
      default: 5
    },
    selectedCategory: {
      type: 'int',
      default: 0,
    },
    isEditing: {
      type: 'boolean',
      default: false,
    },
  },
  
  edit: withSelect(select => {
    const currentPostId = select('core/editor').getCurrentPostId();
    const query = {
      per_page: -1,
      exclude: currentPostId
    }
    return {
      posts: select('core').getEntityRecords('postType', 'post', query)
    }
  })(FirstBlockEdit),

  save:() => { return null }
});