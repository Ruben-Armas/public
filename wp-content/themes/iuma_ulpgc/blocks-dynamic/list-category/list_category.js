//const { withSelect, list_select } = wp.data;
const listCatWordsVal = 35;
const listCatElPerPage = 7;
const listCatElPerLargePagination = 5;


class ListCategoryEdit extends wp.element.Component {
  render() {
    const { attributes, setAttributes, categories } = this.props;
    const {maxWords, selectedCategory, pagination, pagIndicator, maxElementsPerPage, elementsPerLargePagination, isEditingBlock} = attributes;

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

    var setMaxWords = function(newMaxWords) {
      setAttributes({ maxWords: newMaxWords });
    };
    var setSelectedCategory = function(newSelectedCategory) {
      setAttributes({ selectedCategory: parseInt(newSelectedCategory) });
    };

    var setPagination = function() {
      setAttributes({ pagination: !pagination });
    }
    var setPagIndicator = function() {
      setAttributes({ pagIndicator: !pagIndicator });
    }
    var setMaxElementsPerPage = function(newMaxElementsPerPage) {
      setAttributes({ maxElementsPerPage: newMaxElementsPerPage });
    };
    var setElementsPerLargePagination = function(newElementsPerLargePagination) {
      setAttributes({ elementsPerLargePagination: newElementsPerLargePagination });
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
        title: 'lista de Entradas/Categorías (Dinámico)',
        initialOpen: true,
      },
      wp.element.createElement(
        wp.serverSideRender,
        {
          block: this.props.name,
          attributes:
            {
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
          title: 'Lista de Entradas/Categorías (Dinámico)',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.SelectControl,
          {
            label: 'Seleccione una categoría a mostrar (si no, se mostrarán todas)',
            options: choices,
            value: attributes.selectedCategory,
            onChange: setSelectedCategory
          }
        ),
        wp.element.createElement(
          wp.components.RangeControl,
          {
            label: 'Nº máximo de palabras por entrada',
            type: 'number',
            value: maxWords,
            initialPosition: listCatWordsVal,
            onChange: setMaxWords,
            min: '0',
            max: '100',
            allowReset: true,
            railColor: 'red'
          },
        ),
        wp.element.createElement(
          wp.components.ToggleControl,
          {
            label: 'Añadir paginación',
            checked: pagination,
            onChange: setPagination
          }
        ),
        pagination && [
          wp.element.createElement(
            wp.components.RangeControl,
            {
              label: 'Nº máximo de elementos por página',
              type: 'number',
              value: maxElementsPerPage,
              initialPosition: listCatElPerPage,
              onChange: setMaxElementsPerPage,
              min: '1',
              max: '20',
              allowReset: true,
              railColor: 'red'
            },
          ),
          wp.element.createElement(
            wp.components.ToggleControl,
            {
              label: 'Añadir indicador de resultados y estado',
              checked: pagIndicator,
              onChange: setPagIndicator
            }
          ),
          pagIndicator && wp.element.createElement(
            wp.components.RangeControl,
            {
              label: 'Nº máximo de páginas a mostrar en la línea de paginación grande',
              type: 'number',
              value: elementsPerLargePagination,
              initialPosition: listCatElPerLargePagination,
              onChange: setElementsPerLargePagination,
              min: '5',
              max: '20',
              allowReset: true,
              railColor: 'red'
            },
          )
        ]
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
wp.blocks.registerBlockType('listcategory-block/my-block', {
  title: 'Lista de Entradas / Categorías',
  description: '(Bloque dinámico) Lista de Entradas/Categorías en forma de Tarjeta/Card con el estilo de la ULPGC',

  icon: 'list-view',
  category: 'ulpgc',
  example: {},
  attributes: {
    maxWords: {
      type: 'number',
      default: listCatWordsVal
    },
    selectedCategory: {
      type: 'int',
      default: 0,
    },
    pagination: {
      type: 'boolean',
      default: false,
    },
    pagIndicator: {
      type: 'boolean',
      default: false,
    },
    maxElementsPerPage: {
      type: 'number',
      default: listCatElPerPage
    },
    elementsPerLargePagination: {
      type: 'number',
      default: listCatElPerLargePagination
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
  
  edit: withSelect(list_select => {
    const currentPostId = list_select('core/editor').getCurrentPostId();
    const query = {
      per_page: -1,
      exclude: currentPostId
    }
    return {
      //posts: select('core').getEntityRecords('postType', 'post', query) // Obtener los post
      categories: list_select('core').getEntityRecords('taxonomy', 'category', query), // Obtener las categorías
    }
  })(ListCategoryEdit),

  save:() => { return null }
});