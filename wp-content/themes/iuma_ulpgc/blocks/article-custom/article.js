// Funciones comunes al edit y save
function getFormattedDate(date){
  if (date) {
    /*const tmpFormattedDate = new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });*/
    const tmpDate = new Date(date);
    const day = tmpDate.toLocaleDateString('es-ES', { day: '2-digit' });
    const month = tmpDate.toLocaleDateString('es-ES', { month: 'short' });
    const year = tmpDate.toLocaleDateString('es-ES', { year: 'numeric' });
    
    const tmpFormattedDate = [
      day+' ',
      wp.element.createElement('span', null, month),
      ' '+year
    ];
    
    return tmpFormattedDate;
  } else {
    return '';
  }
};

function showPreviewFinalArticle(props, editorWp){
  const { formattedDate, phoneView, url, image, altImage, title, content } = props.attributes;

  const paragraphs = content.split('\n');

  return wp.element.createElement(
    'div',
    {
      className: `ulpgcds-article ${phoneView ? ' ulpgcds-article--short' : ''}`
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
        'h3', null,
        title
      ),
    ),    
    content && wp.element.createElement(
      'div',
      { style: editorWp ? { whiteSpace: 'pre-line' }: null },

      editorWp ? paragraphs.join('\n') :
      paragraphs.map((paragraph) =>
        wp.element.createElement(
          'p', null,
          paragraph
        )
      )
    )
  )
};

// Registro del bloque
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
    formattedDate: {
      type: 'string',
      default: '',
    },
    phoneView: {
      type: 'boolean',
      default: true,
    },
  },

  edit: function(props) {
    const { dateCheck, date, formattedDate, phoneView, url, image, altImage, title, content } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
  
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
      props.setAttributes({ formattedDate: getFormattedDate(newDate) });
    };    
    var setDate = function(newDate) {
      props.setAttributes({ date: newDate });
      props.setAttributes({ formattedDate: getFormattedDate(newDate) });
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
  
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
      //props.setAttributes({ title: editedTitle, content: editedContent });
    };
  
    const defaultImage = '/wp-content/themes/iuma_ulpgc/images/default.png';

    // Preview
    const previewContent = title ? showPreviewFinalArticle(props, true) :
      wp.element.createElement(
        'div',
        {
          className: `ulpgcds-article ${phoneView ? ' ulpgcds-article--short' : ''}`
        },
        wp.element.createElement(
          'img',
          {
            src: title && image ? image : defaultImage,
            alt: altImage || 'Descripción de la imagen',
          },
        ),
        // Mostrar el elemento div con la fecha si dateCheck está activo y date tiene un valor
        dateCheck && date && wp.element.createElement(
          'div',
          { className: 'ulpgcds-article__date' },
          formattedDate || '01 Ene 2023'
        ),
        wp.element.createElement(
          'h3', null,
          title || 'Título del artículo'
        ),
        wp.element.createElement(
          'p', null,
          content || 'Contenido del artículo'
        )
      );

    // Edit
    const editContent = wp.element.createElement(
      'div', null,
      //Block inspector
      wp.element.createElement(
        wp.blockEditor.InspectorControls,
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
        ),
        // Botón para salir de la edición
        wp.element.createElement(
          wp.components.Button,
          { isPrimary: true, onClick: handlePreview },
          'Vista previa'
        )
      ),
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
  // Save view
  save: function(props) {
    return showPreviewFinalArticle(props, false)
  }
});