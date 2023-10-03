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

      var setSelectedType = function(newSelectedType) {
        props.setAttributes({ selectedType: newSelectedType });
      };

      const helpElement = element.createElement(
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
        element.createElement(
          wp.blockEditor.InspectorControls,
          null,
          helpElement,
          element.createElement(
            wp.components.PanelBody,
            null,
            selector
          ),
        ),
        // Create Carrusel
        element.createElement(
          'div',
          { style: { border: '2px solid #0066a1' } },
          element.createElement(
            wp.components.PanelBody,
            {
              title: 'Carrusel',              
              initialOpen: false,
            },
            helpElement,
            selector,
            /*el( 
              'div',
              blockProps,
              el(
                'div',
                innerBlocksProps
              )
            )*/
            element.createElement(
              wp.blockEditor.InnerBlocks,
              {
                allowedBlocks: ['carrusel-block/item'],
              template: [ [ 'carrusel-block/item' ] ],
                templateLock: false,
              }
            ),
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
    },

    save: function (props) {
      const { selectedType } = props.attributes;

      var hijos = props.innerBlocks;

      console.log('props');
      console.log(props);
      console.log('hijos');
      console.log(hijos);
      console.log('cantidad ->'+ hijos.length);

      const generateSmall = (url_img, alt_img) => {
        return element.createElement(
          'li', null,
          element.createElement(
            'img',
            {
              src: url_img,
              alt: alt_img,
            }
          )
        );
      }
      const generateMedium = (url, url_img, alt_img, title) => {
        return element.createElement(
          'li', null,
          element.createElement(
            'a',
            { href: url },
            element.createElement(
              'span',
              { className: 'ulpgcds-carrusel--medium__img' },
              element.createElement(
                'img',
                {
                  src: url_img,
                  alt: alt_img,
                }
              ),
              element.createElement(
                'span',
                { className: 'ulpgcds-carrusel--medium__txt' },
                title
              )
            )
          )
        );
      }
      const generateLarge = (url_img, alt_img, title, text, txtButton, url) => {
        return wp.element.createElement(
          'li', null,
          wp.element.createElement(
            'span',
            { className: 'ulpgcds-carrusel--large__img' },
            element.createElement(
              'img',
              {
                src: url_img,
                alt: alt_img,
              }
            ),
            wp.element.createElement(
              'span',
              { className: 'ulpgcds-carrusel--large__box' },
              wp.element.createElement(
                'span',
                { className: 'ulpgcds-carrusel__center' },
                wp.element.createElement(
                  'h2', null,
                  title
                ),
                element.createElement(
                  'p', null,
                  text
                ),
                /*wp.element.createElement(
                  wp.blockEditor.InnerBlocks.Content,
                  null
                ),*/
                wp.element.createElement(
                  'a', 
                  {
                    href: url,
                    className: 'ulpgcds-btn ulpgcds-btn--primary',
                  },
                  txtButton
                )
              )
            )
          )
        );
      }
      
      const type = selectedType;
      const htmlItems = '';
      for (let i=0; i<hijos.length; i++){
        console.log('[i]');
        console.log(hijos[i]);
        /*console.log('attributes');
        console.log('img '+ hijos[i].attributes.image);           //img
        console.log('alt '+ hijos[i].attributes.altImage);        //alt_img
        console.log('url '+ hijos[i].attributes.url);             //url
        console.log('txtButton '+ hijos[i].attributes.txtButton); //txtButton
        //InnerBlocks
        //console.log('[i].innerBlocks[1].content');
        //console.log(hijos[i].innerBlocks[0].attributes.content);  //img
        console.log('title '+ hijos[i].innerBlocks[0].attributes.content);  //title
        console.log('text '+ hijos[i].innerBlocks[1].attributes.content);   //text
        */
        
        let url_img = hijos[i].attributes.image;
        let alt_img = hijos[i].attributes.altImage;
        let url = hijos[i].attributes.url;
        let txtButton = hijos[i].attributes.txtButton;
        let title = hijos[i].attributes.title;
        let text = hijos[i].attributes.text;

        //let title = hijos[i].innerBlocks[0].attributes.content;
        //let text = hijos[i].innerBlocks[1].attributes.content;

        switch (selectedType) {
          case 'small':wp.element.createElement(
            wp.blockEditor.InnerBlocks.Content,
            null
          )
            console.log('small');
            htmlItems += generateSmall(url_img, alt_img);
          break;
      
          case 'medium':
            console.log('medium');
            htmlItems += generateMedium(url, url_img, alt_img, title);
          break;
      
          case 'large':
            console.log('large');
            htmlItems += generateLarge(url_img, alt_img, title, text, txtButton, url);
          break;
      
          default:
            console.log('Opción (tipo de carrusel) inválida');
        }
      }

      /*return wp.element.createElement(
        'div', null,
        wp.element.createElement(
          'p', null, selectedType,
        ),        
        /*wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        )*/
      //);      
      
      //return element.createElement( 'div', innerBlocksProps ); // Sin div envolvente
      return wp.element.createElement(
        'div',null,
        wp.element.createElement(
          'p', null, selectedType,
        ),    
        wp.element.createElement(
          'ul',
          { className: 'ulpgcds-carrusel ulpgcds-carrusel--' + selectedType },
          htmlItems
        ),
        wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        )
      );
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
      title: {
        type: 'string',
        default: '',
      },
      text: {
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
      const { isInitialOpen, image, altImage, url, title, text, txtButton } = attributes;

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
      var setTitle = function(newTitle) {
        props.setAttributes({ title: newTitle });
      };
      var setText = function(newText) {
        props.setAttributes({ text: newText });
      };
      var setTxtButton = function(newTxtButton) {
        props.setAttributes({ txtButton: newTxtButton });
      };
      
      return wp.element.createElement(
        'div',
        { style: { border: '2px solid #ffa100' } },
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Item',              
            initialOpen: isInitialOpen,
          },
          wp.element.createElement( 'h3', {className: 'title-xl' }, 'Para todos los tipos de Carrusel' ),
          //Alt img
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Descripción de la imagen (Alt))',
              type: 'text',
              value: altImage,
              onChange: setAltImage
            }
          ),
          //img
          wp.element.createElement(
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
          wp.element.createElement( 'h3', {className: 'title-xl' }, 'Para los tipos Mediano y Grande' ),
          //Url
          wp.element.createElement(
            wp.blockEditor.URLInput,
            {
              placeholder: 'Dirección (Url) del artículo /noticia',
              value: url,
              onChange: setUrl
            }
          ),
          //title
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Encabezado / Título',
              type: 'text',
              value: title,
              onChange: setTitle
            }
          ),

          //Content text (paragraph)
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Contenido',
              type: 'text',
              value: text,
              onChange: setText
            }
          ),
          //innerBlocks - Content text (paragraph)
          /*wp.element.createElement(
            wp.blockEditor.InnerBlocks,
            {
              allowedBlocks: [/*'core/image', 'core/heading', *//*'core/paragraph'],
              template: [/*['core/image'], ['core/heading'], *//*['core/paragraph', {placeholder:'Contenido'}]], 
              templateLock: true
            }
          ),*/
          
          wp.element.createElement( 'h3', {className: 'title-xl' }, 'Solo para el tipo Grande' ),
          //Button
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Texto del botón',
              type: 'text',
              value: txtButton,
              onChange: setTxtButton
            }
          ),
        )
      )
    },

    save: function(props) {
      const { image, altImage } = props.attributes;

      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        el(
          'h3',
          null,
          'Carusel'
        ),
        /*wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        )*/
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );