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
      },
      items: {
        type: 'array',
        default: []
      }
    },
    
    edit: function(props) {
      const { selectedType, items } = props.attributes;
      console.log('selectedType-> '+selectedType);

      var setSelectedType = function(newSelectedType) {
        props.setAttributes({ selectedType: newSelectedType });
      };

      const helpElement = wp.element.createElement(
        'div', null,
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          'Para añadir más bloques hijos seleccione su bloque padre y pulse +'
        ),
        wp.element.createElement(
          wp.components.Button,
          { 
            isPrimary: true,
            onClick: updateData,
            style: { marginLeft: '15px' }
          },
          'Guardar / Actualizar Bloque'
        )
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

      // Actualiza los atributos obtenidos de los hijos
      function updateData(){
        const hijos = wp.data.select('core/block-editor').getBlocks(props.clientId);
        console.log('----------------------');
        console.log(hijos);

        const atributosHijos = hijos.map((block) => {
          if (block.name === 'carrusel-block/item' && block.attributes.itemTitle !== '') {
            return {
              itemUrlImg: block.attributes.itemUrlImage || defaultImage_carrusel,
              itemAltImg: block.attributes.itemAltImage || '',
              itemUrl: block.attributes.itemUrl || '#',
              itemTitle: block.attributes.itemTitle,
              itemText: block.attributes.itemText || '',
              itemTxtButton: block.attributes.itemTxtButton || '',
            };
          }
          return null; // Si no es el bloque esperado o no cumple la condición, retorna null
        }).filter((atributo) => atributo !== null); // filter para eliminar los elementos null del resultado.

        // Actualizar los atributos items en el bloque padre solo una vez
        props.setAttributes({ items: atributosHijos });
      }
      //updateData();
      // UseEffect para actualizar los atributos solo una vez al cargar la página
      React.useEffect(() => {
        updateData();
      }, []);

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
              itemTitle: 'Carrusel',              
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
      const { selectedType, items } = props.attributes;

      var hijosInner = props.innerBlocks;
      //const hijosArray = Array.from(hijosInner);

      console.log('props');
      console.log(props);
      console.log('items');
      console.log(items);
      /*console.log('hijosInner');
      console.log(hijosInner);
      console.log('hijosArray');
      console.log(hijosArray);*/
      console.log('cantidad ->'+ hijosInner.length);

      const generateHTML = (type, data) => {
        switch (type) {
          case 'small':
            console.log('small');
            return generateSmall(data);
          case 'medium':
            console.log('medium');
            return generateMedium(data);
          case 'large':
            console.log('large');
            return generateLarge(data);
          default:
            return '';
        }
      };

      const generateSmall = (url_img, alt_img) => {
        return wp.element.createElement(
          'li', null,
          wp.element.createElement(
            'img',
            {
              src: url_img,
              alt: alt_img,
            }
          )
        )
      }
      const generateMedium = (itemUrl, url_img, alt_img, itemTitle) => {
        return wp.element.createElement(
          'li', null,
          element.createElement(
            'a',
            { href: itemUrl },
            wp.element.createElement(
              'span',
              { className: 'ulpgcds-carrusel--medium__img' },
              wp.element.createElement(
                'img',
                {
                  src: url_img,
                  alt: alt_img,
                }
              ),
              wp.element.createElement(
                'span',
                { className: 'ulpgcds-carrusel--medium__txt' },
                itemTitle
              )
            )
          )
        );
      }
      const generateLarge = (url_img, alt_img, itemTitle, itemText, itemTxtButton, itemUrl) => {
        return wp.element.createElement(
          'li', null,
          element.createElement(
            'span',
            { className: 'ulpgcds-carrusel--large__img' },
            wp.element.createElement(
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
                wp.element.createElement('h2', null, itemTitle),
                wp.element.createElement('p', null, itemText),
                /*wp.element.createElement(
                  wp.blockEditor.InnerBlocks.Content,
                  null
                ),*/
                wp.element.createElement(
                  'a', 
                  {
                    href: itemUrl,
                    className: 'ulpgcds-btn ulpgcds-btn--primary',
                  },
                  itemTxtButton
                )
              )
            )
          )
        );
      }
      
      /*const type = selectedType;
      const htmlItems = '';
      for (let i=0; i<hijos.length; i++){
        console.log('[i]');
        console.log(hijos[i]);
        /*console.log('attributes');
        console.log('img '+ hijos[i].attributes.itemUrlImage);           //img
        console.log('alt '+ hijos[i].attributes.itemAltImage);        //alt_img
        console.log('itemUrl '+ hijos[i].attributes.itemUrl);             //itemUrl
        console.log('itemTxtButton '+ hijos[i].attributes.itemTxtButton); //itemTxtButton
        //InnerBlocks
        //console.log('[i].innerBlocks[1].content');
        //console.log(hijos[i].innerBlocks[0].attributes.content);  //img
        console.log('itemTitle '+ hijos[i].innerBlocks[0].attributes.content);  //itemTitle
        console.log('itemText '+ hijos[i].innerBlocks[1].attributes.content);   //itemText
        */
        
        /*let url_img = hijos[i].attributes.itemUrlImage;
        let alt_img = hijos[i].attributes.itemAltImage;
        let itemUrl = hijos[i].attributes.itemUrl;
        let itemTxtButton = hijos[i].attributes.itemTxtButton;
        let itemTitle = hijos[i].attributes.itemTitle;
        let itemText = hijos[i].attributes.itemText;

        //let itemTitle = hijos[i].innerBlocks[0].attributes.content;
        //let itemText = hijos[i].innerBlocks[1].attributes.content;

        switch (selectedType) {
          case 'small':
            console.log('small');
            //htmlItems += generateSmall(url_img, alt_img);
          break;
      
          case 'medium':
            console.log('medium');
            //htmlItems += generateMedium(itemUrl, url_img, alt_img, itemTitle);
          break;
      
          case 'large':
            console.log('large');
            //htmlItems += generateLarge(url_img, alt_img, itemTitle, itemText, itemTxtButton, itemUrl);
          break;
      
          default:
            console.log('Opción (tipo de carrusel) inválida');
        }
      }*/

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
        wp.element.createElement('p', null, selectedType,),    
        wp.element.createElement(
          'ul',
          { className: 'ulpgcds-carrusel ulpgcds-carrusel--' + selectedType },          
          //htmlItems
          //wp.element.createElement( 'p', null, 'length ->'+ hijosArray.length ),
          //wp.element.createElement( 'p', null, 'array ->'+ hijosArray[0] ),
          //wp.element.createElement( 'p', null, 'attributes ->'+ hijosArray.attributes ),
          wp.element.createElement( 'p', null, 'items ->'+ items ),


          items.map((itemObj, index) => (
            wp.element.createElement(
              'li', null,
              index +' --> '+ itemObj.itemTitle
            )
          ))
          /*items.map((child) => {
            const data = {
              url_img: child.attributes.itemUrlImage,
              alt_img: child.attributes.itemAltImage,
              itemUrl: child.attributes.itemUrl,
              itemTxtButton: child.attributes.itemTxtButton,
              itemTitle: child.attributes.itemTitle,
              itemText: child.attributes.itemText,
            };
            return generateHTML(selectedType, data);
          })*/
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
      itemUrlImage: {
        type: 'string',
        default: '',
      },
      itemAltImage: {
        type: 'string',
        default: '',
      },
      itemUrl: {
        type: 'string',
        default: '',
      },
      itemTitle: {
        type: 'string',
        default: '',
      },
      itemText: {
        type: 'string',
        default: '',
      },
      itemTxtButton: {
        type: 'string',
        default: '',
      }
    },
  
    edit: function(props) {
      const { attributes, setAttributes } = props;
      const { isInitialOpen, itemUrlImage, itemAltImage, itemUrl, itemTitle, itemText, itemTxtButton } = attributes;

      // UseEffect para actualizar el atributo isInitialOpen solo una vez al cargar la página
      React.useEffect(() => {
        if (isInitialOpen === '') {
          setAttributes({ isInitialOpen: true });
        } else {
          setAttributes({ isInitialOpen: false });
        }
      }, []);

      var setAltImage = function(newAltImage) {
        props.setAttributes({ itemAltImage: newAltImage });
      };
      const setImage = (newImage) => {
        props.setAttributes({ itemUrlImage: newImage.itemUrl });
      };
      const removeImage = () => {
        props.setAttributes({ itemUrlImage: '' });
      };
      const openMediaLibrary = () => {
        const mediaFrame = wp.media({
          itemTitle: 'Seleccionar imagen',
          library: { type: 'itemUrlImage' },
          multiple: false,
          button: { itemText: 'Seleccionar' },
        });
    
        mediaFrame.on('select', function() {
          const media = mediaFrame.state().get('selection').first().toJSON();
          if (media.itemUrl) {
            setImage(media); // Llamar a la función setImage con la imagen seleccionada
          }
        });
    
        mediaFrame.open();
      };

      var setUrl = function(newUrl) {
        props.setAttributes({ itemUrl: newUrl });
      };
      var setTitle = function(newTitle) {
        props.setAttributes({ itemTitle: newTitle });
      };
      var setText = function(newText) {
        props.setAttributes({ itemText: newText });
      };
      var setTxtButton = function(newTxtButton) {
        props.setAttributes({ itemTxtButton: newTxtButton });
      };
      
      return wp.element.createElement(
        'div',
        { style: { border: '2px solid #ffa100' } },
        wp.element.createElement(
          wp.components.PanelBody,
          {
            itemTitle: 'Item',              
            initialOpen: isInitialOpen,
          },
          wp.element.createElement( 'h3', {className: 'itemTitle-xl' }, 'Para todos los tipos de Carrusel' ),
          //Alt img
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Descripción de la imagen (Alt))',
              type: 'itemText',
              value: itemAltImage,
              onChange: setAltImage
            }
          ),
          //img
          wp.element.createElement(
            wp.components.Placeholder,
            {
              icon: 'format-itemUrlImage',
              label: 'Imagen (Obligatoria)'
            },
            itemUrlImage ? 
              [
                el(
                  'img',
                  { src: itemUrlImage }
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
          wp.element.createElement( 'h3', {className: 'itemTitle-xl' }, 'Para los tipos Mediano y Grande' ),
          //itemUrl
          wp.element.createElement(
            wp.blockEditor.URLInput,
            {
              placeholder: 'Dirección (itemUrl) del artículo /noticia',
              value: itemUrl,
              onChange: setUrl
            }
          ),
          //itemTitle
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Encabezado / Título',
              type: 'itemText',
              value: itemTitle,
              onChange: setTitle
            }
          ),

          //Content itemText (paragraph)
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Contenido',
              type: 'itemText',
              value: itemText,
              onChange: setText
            }
          ),
          //innerBlocks - Content itemText (paragraph)
          /*wp.element.createElement(
            wp.blockEditor.InnerBlocks,
            {
              allowedBlocks: [/*'core/itemUrlImage', 'core/heading', *//*'core/paragraph'],
              template: [/*['core/itemUrlImage'], ['core/heading'], *//*['core/paragraph', {placeholder:'Contenido'}]], 
              templateLock: true
            }
          ),*/
          
          wp.element.createElement( 'h3', {className: 'itemTitle-xl' }, 'Solo para el tipo Grande' ),
          //Button
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Texto del botón',
              type: 'itemText',
              value: itemTxtButton,
              onChange: setTxtButton
            }
          ),
        )
      )
    },

    save: function(props) {
      const { itemUrlImage, itemAltImage } = props.attributes;

      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        el(
          'h3',
          null,
          'Carusel'
        ),
        wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        )
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );