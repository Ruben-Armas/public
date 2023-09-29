/*class FirstBlockEdit extends wp.element.Component {
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
}*/

( function ( blocks, element, blockEditor ) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;
  var useBlockProps = blockEditor.useBlockProps;
  var useInnerBlocksProps = blockEditor.useInnerBlocksProps;

  // Registro del bloque
  wp.blocks.registerBlockType('carrusel-block/my-block', {
    title: 'Carrusel',
    description: 'Carrusel con el estilo de la ULPGC',

    icon: 'slides',
    category: 'ulpgc',
    example: {},
    attributes: {
      selectedType: {
        type: 'int',
        default: 0,
      }
    },
    
    edit: function(props) {
      const { selectedType } = props.attributes;
      console.log('selectedType-> '+selectedType);
      
      var blockProps = useBlockProps();
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ['carrusel-block/item'],
        template: [ [ 'carrusel-block/item' ] ],
        //allowedBlocks: ['core/heading', 'core/image'],
        //template: [['core/heading']], 
        templateLock: false,
      })

      var setSelectedType = function(newSelectedType) {
        props.setAttributes({ selectedType: newSelectedType });
      };

      const helpElement = el(
        wp.components.Notice,
        {
          status: 'success',
          isDismissible: false
        },
        'Para añadir más bloques hijos seleccione su bloque padre y pulse +'
      );
      const selector = el(
        wp.components.SelectControl,
        {
          label: 'Etiqueta de las Filas / Elementos /Títulos',
          value: selectedType,
          options: [
            { label: 'Grande', value: 'large' },
            { label: 'Mediano', value: 'medium' },
            { label: 'Pequeño', value: 'small' },
          ],
          onChange: setSelectedType
        }
      );

      return [
        //Block inspector
        el(
          wp.blockEditor.InspectorControls,
          null,
          helpElement,
          el(
            wp.components.PanelBody,
            null,
            selector
          ),
        ),
        // Create Carrusel
        el(
          'div',
          { style: { border: '2px solid #0066a1' } },
          el(
            wp.components.PanelBody,
            {
              title: 'Carrusel',              
              initialOpen: true,
            },
            helpElement,
            el( 
              'div',
              blockProps,
              el(
                'div',
                innerBlocksProps
              )
            )
          )
        )
      ];
      /*return element.createElement( 
        'div',
        blockProps,
        element.createElement(
          'div',
          innerBlocksProps
        )
      );*/

      /*const editContent = wp.element.createElement(
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
              allowedBlocks: ['core/heading', 'core/image'],
              template: [['core/heading']],            
              templateLock: false,
            }
          ),
          // Botón para salir de la edición
          wp.element.createElement(
            wp.components.Button,
            { isPrimary: true, onClick: handlePreview },
            'Vista previa'
          )
        )
      );*/    
    },

    save: function () {
      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      /*return el(
        'div',
        { className: 'ulpgcds-carrusel' },
        innerBlocksProps.children //Quita la envoltura del div adicional
      );
      return el( 'div', blockProps, el( 'div', innerBlocksProps ) );*/
      
      return el( 'div', innerBlocksProps ); // Sin div envolvente      
    }
  });

  wp.blocks.registerBlockType('carrusel-block/item', {
    title: 'Carrusel Item',
    icon: 'analytics',
    category: 'ulpgc',
    parent: ['carrusel-block/my-block'],
    attributes: {},
  
    edit: function(props) {
      //const { attributes, setAttributes } = props;

      var blockProps = useBlockProps();
      //Personalizando las opciones disponibles
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ['core/image', 'core/heading', 'core/paragraph'],
        template: [['core/image'], ['core/heading'], ['core/paragraph']], 
        templateLock: false,
      })

      /*return el( 
        'div',
        blockProps,
        el(
          'div',
          innerBlocksProps
        )
      );*/
      return el(
        'div',
        { style: { border: '2px solid #ffa100' } },
        el(
          wp.components.PanelBody,
          {
            title: 'Item',              
            initialOpen: true,
          },
          el( 
            'div',
            blockProps,
            el(
              'div',
              innerBlocksProps
            )
          )
        )
      )
    },

    save: function(props) {
      const { rowName, tagName, divCheck } = props.attributes;

      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        el(
          'h3',
          null,
          'Carusel'
        ),
        innerBlocksProps.children //Quita la envoltura del div adicional
        //el(
        //  'div',
        //  innerBlocksProps
        //)
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );