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
    },const defaultImage_carrusel = '/wp-content/themes/iuma_ulpgc/images/default.jpg';

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
    
          /*return [
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
          ];*/
          
          return element.createElement( 
            'div',
            blockProps,
            element.createElement(
              'div',
              innerBlocksProps
            )
          );
        },
    
        save: function (props) {
          const { selectedType } = props.attributes;
          var blockProps = useBlockProps.save();
          var innerBlocksProps = useInnerBlocksProps.save();
    
          var hijos = props.innerBlocks;
    
          console.log('props');
          console.log(props);
          console.log('hijos');
          console.log(hijos);
          console.log('cantidad ->'+ hijos.length);
    
          const generateSmall = (url_img, alt_img) => {
            return el(
              'li', null,
              el(
                'img',
                {
                  src: url_img,
                  alt: alt_img,
                }
              )
            );
          }
          const generateMedium = (url, url_img, alt_img, title) => {
            return el(
              'li', null,
              el(
                'a',
                { href: url },
                el(
                  'span',
                  { className: 'ulpgcds-carrusel--medium__img' },
                  el(
                    'img',
                    {
                      src: url_img,
                      alt: alt_img,
                    }
                  ),
                  el(
                    'span',
                    { className: 'ulpgcds-carrusel--medium__txt' },
                    title
                  )
                )
              )
            );
          }
          const generateLarge = (url_img, alt_img, title, text, txtButton, url) => {
            return el(
              'li', null,
              el(
                'span',
                { className: 'ulpgcds-carrusel--large__img' },
                el(
                  'img',
                  {
                    src: url_img,
                    alt: alt_img,
                  }
                ),
                el(
                  'span',
                  { className: 'ulpgcds-carrusel--large__box' },
                  el(
                    'span',
                    { className: 'ulpgcds-carrusel__center' },
                    el(
                      'h2', null,
                      title
                    ),
                    el(
                      'p', null,
                      text
                    ),
                    el(
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
            /*console.log('[i]');
            console.log(hijos[i]);
            console.log('attributes');
            console.log('img '+ hijos[i].attributes.image);           //img
            console.log('alt '+ hijos[i].attributes.altImage);        //alt_img
            console.log('url '+ hijos[i].attributes.url);             //url
            console.log('txtButton '+ hijos[i].attributes.txtButton); //txtButton
            console.log('[i].innerBlocks[1].content');
            //console.log(hijos[i].innerBlocks[0].attributes.content);  //img
            console.log('title '+ hijos[i].innerBlocks[0].attributes.content);  //title
            console.log('text '+ hijos[i].innerBlocks[1].attributes.content);   //text
            //console.log('slice');
            //console.log(hijos[i].innerBlocks[1].slice(0, 2));*/
    
            let url_img = hijos[i].attributes.image;
            let alt_img = hijos[i].attributes.altImage;
            let url = hijos[i].attributes.url;
            let txtButton = hijos[i].attributes.txtButton;
            let title = hijos[i].innerBlocks[0].attributes.content;
            let text = hijos[i].innerBlocks[1].attributes.content;
    
            switch (type) {
              case 'small':
                htmlItems += generateSmall(url_img, alt_img);
              break;
          
              case 'medium':
                htmlItems += generateMedium(url, url_img, alt_img, title);
              break;
          
              case 'large':
                htmlItems += generateLarge(url_img, alt_img, title, text, txtButton, url);
              break;
          
              default:
                console.log('Opción (tipo de carrusel) inválida');
            }
          }
    
          /*return el(
            'div',
            { className: 'ulpgcds-carrusel' },
            innerBlocksProps.children //Quita la envoltura del div adicional
          );
          return el( 'div', blockProps, el( 'div', innerBlocksProps ) );*/
          
          
          return el( 'div', innerBlocksProps ); // Sin div envolvente
    
          /*return el(
            'div',null,
            el(
              'ul',
              { className: 'ulpgcds-carrusel ulpgcds-carrusel--' + selectedType },
              htmlItems
            )
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
    
          return el( 
            'div',
            blockProps,
            el(
              'div',
              innerBlocksProps
            )
          );
          /*return el(
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
          )*/
        },
    
        save: function(props) {
          const { image, altImage } = props.attributes;
    
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
            /*el( 
              'div',
              blockProps,
              el(
                'div',
                innerBlocksProps
              )
            )*/
            el(
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
      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      var hijos = props.innerBlocks;

      console.log('props');
      console.log(props);
      console.log('hijos');
      console.log(hijos);
      console.log('cantidad ->'+ hijos.length);

      const generateSmall = (url_img, alt_img) => {
        return el(
          'li', null,
          el(
            'img',
            {
              src: url_img,
              alt: alt_img,
            }
          )
        );
      }
      const generateMedium = (url, url_img, alt_img, title) => {
        return el(
          'li', null,
          el(
            'a',
            { href: url },
            el(
              'span',
              { className: 'ulpgcds-carrusel--medium__img' },
              el(
                'img',
                {
                  src: url_img,
                  alt: alt_img,
                }
              ),
              el(
                'span',
                { className: 'ulpgcds-carrusel--medium__txt' },
                title
              )
            )
          )
        );
      }
      const generateLarge = (url_img, alt_img, title, text, txtButton, url) => {
        return el(
          'li', null,
          el(
            'span',
            { className: 'ulpgcds-carrusel--large__img' },
            el(
              'img',
              {
                src: url_img,
                alt: alt_img,
              }
            ),
            el(
              'span',
              { className: 'ulpgcds-carrusel--large__box' },
              el(
                'span',
                { className: 'ulpgcds-carrusel__center' },
                el(
                  'h2', null,
                  title
                ),
                el(
                  'p', null,
                  text
                ),
                el(
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
        /*console.log('[i]');
        console.log(hijos[i]);
        console.log('attributes');
        console.log('img '+ hijos[i].attributes.image);           //img
        console.log('alt '+ hijos[i].attributes.altImage);        //alt_img
        console.log('url '+ hijos[i].attributes.url);             //url
        console.log('txtButton '+ hijos[i].attributes.txtButton); //txtButton
        console.log('[i].innerBlocks[1].content');
        //console.log(hijos[i].innerBlocks[0].attributes.content);  //img
        console.log('title '+ hijos[i].innerBlocks[0].attributes.content);  //title
        console.log('text '+ hijos[i].innerBlocks[1].attributes.content);   //text
        //console.log('slice');
        //console.log(hijos[i].innerBlocks[1].slice(0, 2));*/

        let url_img = hijos[i].attributes.image;
        let alt_img = hijos[i].attributes.altImage;
        let url = hijos[i].attributes.url;
        let txtButton = hijos[i].attributes.txtButton;
        let title = hijos[i].innerBlocks[0].attributes.content;
        let text = hijos[i].innerBlocks[1].attributes.content;

        switch (type) {
          case 'small':
            htmlItems += generateSmall(url_img, alt_img);
          break;
      
          case 'medium':
            htmlItems += generateMedium(url, url_img, alt_img, title);
          break;
      
          case 'large':
            htmlItems += generateLarge(url_img, alt_img, title, text, txtButton, url);
          break;
      
          default:
            console.log('Opción (tipo de carrusel) inválida');
        }
      }

      /*return el(
        'div',
        { className: 'ulpgcds-carrusel' },
        innerBlocksProps.children //Quita la envoltura del div adicional
      );
      return el( 'div', blockProps, el( 'div', innerBlocksProps ) );*/
      
      
      return el( 'div', innerBlocksProps ); // Sin div envolvente

      /*return el(
        'div',null,
        el(
          'ul',
          { className: 'ulpgcds-carrusel ulpgcds-carrusel--' + selectedType },
          htmlItems
        )
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

      return el( 
        'div',
        blockProps,
        el(
          'div',
          innerBlocksProps
        )
      );
      /*return el(
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
      )*/
    },

    save: function(props) {
      const { image, altImage } = props.attributes;

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