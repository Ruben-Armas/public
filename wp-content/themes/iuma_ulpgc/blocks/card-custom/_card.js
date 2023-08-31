wp.blocks.registerBlockType('article-block/my-block', {
    title: 'Artículo',
    className: 'ulpgcds-article',
    description: 'Artículo con el estilo de la ULPGC',
  
    icon: 'id-alt',
    category: 'ulpgc',
    example: {},
    attributes: {
      title: {
        type: 'string',
        default: '',
      },
      content: {
        type: 'string',
        default: '',
      },
      url: {
        type: 'string',
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
      date: {
        type: 'string',
        default: '',
      },
      dateCheck: {
        type: 'boolean',
        default: false,
      },
      phoneView: {
        type: 'boolean',
        default: false,
      },
    },
  
    //Editor view
    edit: function(props) {
      const { dateCheck, date, phoneView, url, image, altImage, title, content } = props.attributes;
      var setTitle = function(newTitle) {
        props.setAttributes({ title: newTitle });
      };
      var setContent = function(newContent) {
        props.setAttributes({ content: newContent });
      };
      var setUrl = function(newUrl) {
        props.setAttributes({ url: newUrl });
      };
      var setAltImage = function(newAltImage) {
        props.setAttributes({ altImage: newAltImage });
      };
      var setPhoneView = function() {
        props.setAttributes({ phoneView: !phoneView });
      };
      var setDateCheck = function() {
        const newDateCheck = !dateCheck;
        const newDate = newDateCheck ? new Date().toISOString() : '';
        // Guarda el check y la fecha por defecto(si está activo)
        props.setAttributes({ dateCheck: newDateCheck, date: newDate });
      };    
      var setDate = function(newDate) {
        props.setAttributes({ date: newDate });
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
  
      return [    
        //Block inspector
        wp.element.createElement(
          wp.editor.InspectorControls,
          null,
          wp.element.createElement(
            wp.components.PanelBody,
            null,
            wp.element.createElement(
              wp.blockEditor.URLInput,
              {
                label: 'Dirección (Url) del artículo',
                value: url,
                onChange: setUrl
              }
            ),
            wp.element.createElement(
              wp.components.TextControl,
              {
                label: 'Descripción de la imagen (Alt))',
                type: 'text',
                value: altImage,
                onChange: setAltImage
              }
            ),
            wp.element.createElement(
              wp.components.ToggleControl,
              {
                label: 'Visualización corta en móvil',
                checked: phoneView,
                onChange: setPhoneView
              }
            ),
            wp.element.createElement(
              wp.components.ToggleControl,
              {
                label: 'Añadir fecha',
                checked: dateCheck,
                onChange: setDateCheck
              }
            ),
            dateCheck ? wp.element.createElement(
              wp.components.DatePicker,
              {
                is12Hour: false,
                dateFormat: 'dd LLL yyyy',
                timeFormat: 'HH:mm',
                placeholder: 'Selecciona una fecha',
                currentDate: date,
                onChange: setDate
              }
            ) : null
          )
        ),
  
        //Create Article
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Artículo',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Título',
              value: title,
              onChange: setTitle
            }
          ),
          wp.element.createElement(
            wp.components.TextareaControl,
            {
              label: 'Contenido (Opcional)',
              rows: 4,
              multiline: true,
              value: content,
              onChange: setContent
            }
          ),
          wp.element.createElement(
            wp.components.Placeholder,
            {
              icon: 'format-image',
              label: 'Imagen (Opcional)'
            },
            image ? 
              [
                wp.element.createElement(
                  'img',
                  { src: image }
                ),
                wp.element.createElement(
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
              wp.element.createElement(
                wp.components.Button,
                {
                  isPrimary: true,
                  onClick: openMediaLibrary,
                },
                'Seleccionar imagen'
              ),
          )
        ),
      ];
    },
  
    //Page view
    save: function(props) {
      const { dateCheck, date, phoneView, url, image, altImage, title, content } = props.attributes;
      const formattedDate = dateCheck && date ?
        new Date(date).toLocaleDateString(
          'es-ES',
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }
        ) : '';
      var formattedContent = content.replace(/\n/g, '<p>');
  
      return wp.element.createElement(
        'div',
        {
          className: phoneView ? ('ulpgcds-article ulpgcds-article--short') : 'ulpgcds-article'
        },
        wp.element.createElement(
          'a',
          {href: url},
          image && wp.element.createElement(
            'img',
            {
              src: image,
              alt: altImage,
            },
          ),
          formattedDate && wp.element.createElement(
            'div',
            { className: 'ulpgcds-article__date' },
            formattedDate
          ),
          wp.element.createElement(
            'h3',
            {},
            title
          ),
        ),
        content && wp.element.createElement(
          'p',
          { dangerouslySetInnerHTML: { __html: formattedContent } },
          content
        )
      )
    }  
  })
  