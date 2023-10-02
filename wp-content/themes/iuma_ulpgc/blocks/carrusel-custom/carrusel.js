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
const defaultImage_carrusel = '/wp-content/themes/iuma_ulpgc/images/default.jpg';

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
              initialOpen: false,
            },
            helpElement,
            selector,
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

    save: function (props) {
      const { selectedType } = props.attributes;
      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      var hijos = props.innerBlocks;

      /*// Dependiendo de la opción seleccionada, mostramos diferentes elementos
      let content = null;
      if (selectedType === 'large') {
        content = el('div', innerBlocksProps);
      } else if (selectedType === 'medium') {
        content = el('div', null, innerBlocksProps.innerBlocks.slice(0, 2));
      } else if (selectedType === 'small') {
        content = el('div', null, innerBlocksProps.innerBlocks.slice(0, 1));
      }*/
      // Dependiendo de la opción seleccionada, mostramos diferentes elementos
      //const hijos = wp.data.select('core/block-editor').getBlocks(props.clientId);
      console.log('props');
      console.log(props);
      console.log('hijos');
      console.log(hijos);
      console.log('cantidad ->'+ hijos.length);
      
      for (let i=0; i<hijos.length; i++){
        console.log('[i]');
        console.log(hijos[i]);
        console.log('attributes');
        console.log(hijos[i].attributes.image);
        console.log(hijos[i].attributes.altImage);
        console.log(hijos[i].attributes.url);
        console.log(hijos[i].attributes.txtButton);
        console.log('[i].innerBlocks[1].content');
        console.log(hijos[i].innerBlocks[1].attributes.content);
        //console.log('slice');
        //console.log(hijos[i].innerBlocks[1].slice(0, 2));
      }

  //  
      /*let filteredBlocks;
      if (selectedType === 'large') {
        filteredBlocks = props.innerBlocks;
      } else if (selectedType === 'medium') {
        filteredBlocks = props.innerBlocks.slice(0, 2);
      } else if (selectedType === 'small') {
        filteredBlocks = props.innerBlocks.slice(0, 1);
      }*/

      /*return el(
        'div',
        { className: 'ulpgcds-carrusel' },
        innerBlocksProps.children //Quita la envoltura del div adicional
      );
      return el( 'div', blockProps, el( 'div', innerBlocksProps ) );*/
      
      return el( 'div', innerBlocksProps ); // Sin div envolvente
      /*return el(
        'div',
        blockProps,
        //filteredBlocks
      );*/
    }
  });

  wp.blocks.registerBlockType('carrusel-block/item', {
    title: 'Carrusel Item',
    icon: 'analytics',
    category: 'ulpgc',
    parent: ['carrusel-block/my-block'],
    attributes: {
      isInitialOpen: {
        type: 'boolean',
        default: '',
      },
      image: {
        type: 'string',
        default: '',
      },
      altImage: {
        type: 'string',
        default: '',
      },
      url: {
        type: 'string',
        default: '',
      },
      txtButton: {
        type: 'string',
        default: '',
      }
    },
  
    edit: function(props) {
      const { attributes, setAttributes } = props;
      const { isInitialOpen, image, altImage, url, txtButton } = attributes;

      // UseEffect para actualizar el atributo isInitialOpen solo una vez al cargar la página
      React.useEffect(() => {
        if (isInitialOpen === '') {
          setAttributes({ isInitialOpen: true });
        } else {
          setAttributes({ isInitialOpen: false });
        }
      }, []);

      var setAltImage = function(newAltImage) {
        props.setAttributes({ altImage: newAltImage });
      };
      const setImage = (newImage) => {
        props.setAttributes({ image: newImage.url });
      };
      const removeImage = () => {
        props.setAttributes({ image: '' });
      };
      const openMediaLibrary = () => {
        const mediaFrame = wp.media({
          title: 'Seleccionar imagen',
          library: { type: 'image' },
          multiple: false,
          button: { text: 'Seleccionar' },
        });
    
        mediaFrame.on('select', function() {
          const media = mediaFrame.state().get('selection').first().toJSON();
          if (media.url) {
            setImage(media); // Llamar a la función setImage con la imagen seleccionada
          }
        });
    
        mediaFrame.open();
      };

      var setUrl = function(newUrl) {
        props.setAttributes({ url: newUrl });
      };
      var setTxtButton = function(newTxtButton) {
        props.setAttributes({ txtButton: newTxtButton });
      };

      var blockProps = useBlockProps();
      //Personalizando las opciones disponibles
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ['core/image', 'core/heading', 'core/paragraph'],
        template: [/*['core/image'], */['core/heading'], ['core/paragraph', {placeholder:'Contenido'}]], 
        templateLock: true,
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
            initialOpen: isInitialOpen,
          },
          el( 'h3', {className: 'title-xl' }, 'Para todos los tipos de Carrusel' ),
          //Alt img
          el(
            wp.components.TextControl,
            {
              label: 'Descripción de la imagen (Alt))',
              type: 'text',
              value: altImage,
              onChange: setAltImage
            }
          ),
          //img
          el(
            wp.components.Placeholder,
            {
              icon: 'format-image',
              label: 'Imagen (Obligatoria)'
            },
            image ? 
              [
                el(
                  'img',
                  { src: image }
                ),
                el(
                  wp.components.Button,
                  {
                    isSecondary: true,
                    isDestructive: true,
                    onClick: removeImage,
                  },
                  'Eliminar imagen'
                )
              ]
              : 
              el(
                wp.components.Button,
                {
                  isPrimary: true,
                  onClick: openMediaLibrary,
                },
                'Seleccionar imagen'
              )            
          ),
          el( 'h3', {className: 'title-xl' }, 'Para los tipos Mediano y Grande' ),
          //Url
          el(
            wp.blockEditor.URLInput,
            {
              placeholder: 'Dirección (Url) del artículo /noticia',
              value: url,
              onChange: setUrl
            }
          ),

          //innerBlocks
          el( 
            'div',
            blockProps,
            el(
              'div',
              innerBlocksProps
            )
          ),
          
          el( 'h3', {className: 'title-xl' }, 'Solo para el tipo Grande' ),
          //Button
          el(
            wp.components.TextControl,
            {
              label: 'Texto del botón',
              type: 'text',
              value: txtButton,
              onChange: setTxtButton
            }
          ),
        ),        
      )
    },

    save: function(props) {
      const { image, altImage } = props.attributes;

      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        /*el(
          'h3',
          null,
          'Carusel'
        ),*/
        innerBlocksProps.children //Quita la envoltura del div adicional
        //el(
        //  'div',
        //  innerBlocksProps
        //)
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );