const { withSelect, select } = wp.data;

const postsVal = 5;
const wordsVal = 35;


class FirstBlockEdit extends wp.element.Component {
  render() {
    const { attributes, setAttributes, categories } = this.props;
    const {maxPosts, maxWords, selectedCategory, isEditingBlock} = attributes;

		//console.log('isEditingBlock-> '+isEditingBlock);
		//console.log(this.props);
		//console.log(this.props.posts);

    //Guarda las categorías obtenidas en el edit
    let choices = [];
    if (categories) {
      choices.push({ value: 0, label: 'Sin especificar' });
      categories.forEach(category => {
        //choices.push({ value: post.id, label: post.title.rendered });
        choices.push({ value: category.id, label: category.name });
      });
    } else {
      choices.push({ value: 0, label: 'Cargando...' })
    }

    var setMaxPosts = function(newMaxPosts) {
      setAttributes({ maxPosts: newMaxPosts });
    };
    var setMaxWords = function(newMaxWords) {
      setAttributes({ maxWords: newMaxWords });
    };
    var setSelectedCategory = function(newSelectedCategory) {
      setAttributes({ selectedCategory: parseInt(newSelectedCategory) });
    };
  
    const handleEdit = () => {
      setAttributes({ isEditingBlock: true });
    };  
    const handlePreview = () => {
      setAttributes({ isEditingBlock: false });
    }; 

    // Preview (Le paso al php los atributos y elementos a mostrar)
    const previewContent = wp.element.createElement(
      wp.components.PanelBody,
      {
        title: 'Carrusel de Entradas/Categorías (Dinámico)',
        initialOpen: true,
      },
      wp.element.createElement(
        wp.serverSideRender,
        {
          block: this.props.name,
          attributes:
            { 
              maxPosts: maxPosts,
              maxWords: maxWords,
              selectedCategory: selectedCategory,
            },
        }
      )
    );

    // Edit
    const editContent = wp.element.createElement(
      'div',
      null,
      //Create Carrusel news Dynamic
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Carrusel de Entradas/Categorías (Dinámico)',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.RangeControl,
          {
            label: 'Nº máximo de entradas',
            type: 'number',
            value: maxPosts,
            initialPosition: postsVal,
            onChange: setMaxPosts,
            min: '0',
            max: '15',
            allowReset: true,
            railColor: 'red'
          },
        ),
        wp.element.createElement(
          wp.components.RangeControl,
          {
            label: 'Nº máximo de palabras por entrada',
            type: 'number',
            value: maxWords,
            initialPosition: wordsVal,
            onChange: setMaxWords,
            min: '0',
            max: '100',
            allowReset: true,
            railColor: 'red'
          },
        ),
        wp.element.createElement(
          wp.components.SelectControl,
          {
            label: 'Seleccione una categoría a mostrar (si no, se mostrarán todas)',
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
      isEditingBlock ? editContent : previewContent,
      // Botón editar
      !isEditingBlock && wp.element.createElement(
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
wp.blocks.registerBlockType('carruselcategory-block/my-block', {
  title: 'Carrusel Entradas / Categorías',
  className: 'ulpgcds-carrusel',
  description: '(Bloque dinámico) Carrusel de Entradas/Categorías con el estilo de la ULPGC',

  icon: 'slides',
  category: 'ulpgc',
  example: {},
  attributes: {
    maxPosts: {
      type: 'number',
      default: postsVal
    },
    maxWords: {
      type: 'number',
      default: wordsVal
    },
    selectedCategory: {
      type: 'int',
      default: 0,
    },
    isEditingBlock: {
      type: 'boolean',
      default: false,
    },
    // Flag para mostrar html diferente en el edit(false) y el save
    isWebView: {
      type:'boolean',
      default: false,
    }
  },
  
  edit: withSelect(select => {
    const currentPostId = select('core/editor').getCurrentPostId();
    const query = {
      per_page: -1,
      exclude: currentPostId
    }
    return {
      //posts: select('core').getEntityRecords('postType', 'post', query) // Obtener los post
      categories: select('core').getEntityRecords('taxonomy', 'category', query), // Obtener las categorías
    }
  })(FirstBlockEdit),

  save:() => { return null }
});