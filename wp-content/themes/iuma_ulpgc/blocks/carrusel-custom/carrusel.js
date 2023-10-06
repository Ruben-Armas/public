const defaultImage_carrusel = '/wp-content/themes/iuma_ulpgc/images/default.png';

const generateCarruselHTML = (isEditor, type, data) => {
  switch (type) {
    case 'small':
      return generateCarruselSmall(isEditor, data);
    case 'medium':
      return generateCarruselMedium(isEditor, data);
    case 'large':
      return generateCarruselLarge(isEditor, data);
    default:
      return '';
  }
};
const generateCarruselSmall = (isEditor, data) => {
  return wp.element.createElement(
    isEditor ? 'div' : 'li',
    isEditor ? {className: 'col-3 col-sm-3'} : null,
    wp.element.createElement(
      'img',
      {
        src: data.itemUrlImg,
        alt: data.itemAltImg,
      }
    )
  )
}
const generateCarruselMedium = (isEditor, data) => {
  return wp.element.createElement(
    isEditor ? 'div' : 'li',
    isEditor ? {className: 'col-3 col-sm-3'} : null,
    wp.element.createElement(
      'a',
      { href: data.itemUrl },
      wp.element.createElement(
        'span',
        { className: 'ulpgcds-carrusel--medium__img' },
        wp.element.createElement(
          'img',
          {
            src: data.itemUrlImg,
            alt: data.itemAltImg,
          }
        )
      ),
      wp.element.createElement(
        'span',
        { className: 'ulpgcds-carrusel--medium__txt' },
        data.itemTitle
      )
    )
  );
}
const generateCarruselLarge = (isEditor, data) => {
  return wp.element.createElement(
    isEditor ? 'div' : 'li',
    isEditor ? {className: 'col-3 col-sm-3'} : null,
    wp.element.createElement(
      'span',
      { className: 'ulpgcds-carrusel--large__img' },
      wp.element.createElement(
        'img',
        {
          src: data.itemUrlImg,
          alt: data.itemAltImg,
        }
      )
    ),
    wp.element.createElement(
      'span',
      { className: 'ulpgcds-carrusel--large__box' },
      wp.element.createElement(
        'span',
        { className: 'ulpgcds-carrusel__center' },
        wp.element.createElement('h2', null, data.itemTitle),
        wp.element.createElement('p', null, data.itemText),
        /*wp.element.createElement(
          wp.blockEditor.InnerBlocks.Content,
          null
        ),*/
        wp.element.createElement(
          'a', 
          {
            href: data.itemUrl,
            className: 'ulpgcds-btn ulpgcds-btn--primary',
          },
          data.itemTxtButton
        )
      )
    )
  );
}

// Registro del bloque
wp.blocks.registerBlockType('carrusel-block/my-block', {
  title: 'Carrusel',
  description: 'Carrusel con el estilo de la ULPGC (Bloque Estático)',

  icon: 'slides',
  category: 'ulpgc',
  example: {},
  attributes: {
    selectedType: {
      type: 'int',
      default: 'large',
    },
    items: {
      type: 'array',
      default: []
    }
  },
  
  edit: function(props) {
    const { selectedType, items } = props.attributes;
    const [showSavedMessage, setShowSavedMessage] = React.useState(false);
    const [isEditing, setIsEditing] = wp.element.useState(false);
    console.log(items);
    console.log(items.length);

    function showMessage() {
      setShowSavedMessage(true);

      // Después de 2 segundos, ocultar el mensaje de "guardado"
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 2000);
    }
    // Actualiza los atributos obtenidos de los hijos
    function updateData(){
      const hijos = wp.data.select('core/block-editor').getBlocks(props.clientId);

      const atributosHijos = hijos.map((block) => {
        if (block.name === 'carrusel-block/item' && block.attributes.itemTitle !== '') {
          return {
            itemUrlImg: block.attributes.itemUrlImg || defaultImage_carrusel,
            itemAltImg: block.attributes.itemAltImg || '',
            itemUrl: block.attributes.itemUrl || '#',
            itemTitle: block.attributes.itemTitle,
            itemText: block.attributes.itemText || '',
            itemTxtButton: block.attributes.itemTxtButton || 'Accede',
          };
        }
        return null; // Si no es el bloque esperado o no cumple la condición, retorna null
      }).filter((atributo) => atributo !== null); // filter para eliminar los elementos null del resultado.

      // Actualizar los atributos items en el bloque padre solo una vez
      props.setAttributes({ items: atributosHijos });
    }
    function handleSaveButtonClick() {
      showMessage();
      updateData();
    };
    // UseEffect para actualizar los atributos solo una vez al cargar la página
    React.useEffect(() => {
      updateData();
    }, []);

    var setSelectedType = function(newSelectedType) {
      props.setAttributes({ selectedType: newSelectedType });
    };

    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      handleSaveButtonClick();
      setIsEditing(false);
    };  

    const selector = wp.element.createElement(
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
    const savedMessageElement = showSavedMessage && wp.element.createElement(
      wp.components.Notice,
      {
        status: 'success',
        isDismissible: false
      },
      'Guardado'
    );
    const helpElement = wp.element.createElement(
      'div', null,
      wp.element.createElement(
        wp.components.Notice,
        {
          status: 'success',
          isDismissible: false
        },
        'Para añadir más bloques hijos seleccione su bloque padre y pulse +'
      )
    );
    const saveElements = [
      wp.element.createElement(
        wp.components.Flex,
        { direction: 'row', wrap: 'wrap' },
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 4 } },
          // Warning message
          wp.element.createElement(
            wp.components.Notice,
            {
              status: 'warning',
              isDismissible: false
            },
            'Recuerde Guardar / Actualizar el Bloque'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          // Button Save
          wp.element.createElement(
            wp.components.Button,
            { 
              isPrimary: true,
              onClick: handleSaveButtonClick,
              style: { marginLeft: '15px' }
            },
            'Guardar / Actualizar Bloque'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          // Botón para salir de la edición
          wp.element.createElement(
            wp.components.Button,
            {
              isPrimary: true,
              onClick: handlePreview,
              style: { marginLeft: '15px' }
            },
            'Vista previa'
          )
        ),
      ),
      // Show saved message
      savedMessageElement
    ];

    const previewDefault = [
      wp.element.createElement(
        'div',
        {className: 'col-3 col-sm-3'},
        wp.element.createElement(
          'img',
          {
            src: defaultImage_carrusel,
            alt: 'Alt img',
          },
        ),
        wp.element.createElement(
          'span',
          { style: { color: '#0066a1' } },
          'Título 1'
        )
      ),
      wp.element.createElement(
        'div',
        {className: 'col-3 col-sm-3'},
        wp.element.createElement(
          'img',
          {
            src: defaultImage_carrusel,
            alt: 'Alt img',
          },
        ),
        wp.element.createElement(
          'span',
          { style: { color: '#0066a1' } },
          'Título 2'
        )
      ),
      wp.element.createElement(
        'div',
        {className: 'col-3 col-sm-3'},
        wp.element.createElement(
          'img',
          {
            src: defaultImage_carrusel,
            alt: 'Alt img',
          },
        ),
        wp.element.createElement(
          'span',
          { style: { color: '#0066a1' } },
          'Título 3'
        )
      ),
      wp.element.createElement(
        'div',
        {className: 'col-3 col-sm-3'},
        wp.element.createElement(
          'span',
          { className: 'title-xl' },
          '...'
        )
      )
    ];
    // Preview
    previewContent = wp.element.createElement(
      wp.components.PanelBody,
      {
        title: 'Carrusel',              
        initialOpen: true,
      },
      // Muestra el mensaje de guardado
      savedMessageElement,
      wp.element.createElement(
        'div',
        { className: 'row' },
        items.length > 0 ?
          (
            items.slice(0, 4).map((itemObj, index) => (
              index < 3 ? generateCarruselHTML(true, selectedType, itemObj)
              : wp.element.createElement(
                'div',
                {className: 'col-3 col-sm-3'},
                wp.element.createElement(
                  'span',
                  { className: 'title-xl' },
                  '...'
                )
              )
            ))
          )
        : previewDefault
      )
    );

    // Edit
    const editContent = wp.element.createElement(
      'div',
      null,
      //Block inspector
      wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        helpElement,  // Help message
        saveElements, // Save message and button, and preview
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          selector  // Carrusel type selector
        ),
      ),
      // Create Carrusel
      wp.element.createElement(
        'div',
        { style: { border: '2px solid #0066a1' } },
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Carrusel',              
            initialOpen: true,
          },
          saveElements,
          selector,
          wp.element.createElement(
            wp.blockEditor.InnerBlocks,
            {
              allowedBlocks: ['carrusel-block/item'],
              template: [ [ 'carrusel-block/item' ] ],
              templateLock: false,
            }
          ),

          // Botón para salir de la edición
          wp.element.createElement(
            wp.components.Button,
            { isPrimary: true, onClick: handlePreview },
            'Vista previa'
          ),
        )
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
  },

  save: function (props) {
    const { selectedType, items } = props.attributes;

    return wp.element.createElement(
      'div',null,
      wp.element.createElement(
        'ul',
        { className: 'ulpgcds-carrusel ulpgcds-carrusel--'+ selectedType  +' slick-dotted' },

        items.map((itemObj) => (
          generateCarruselHTML(false, selectedType, itemObj)
        )),
      ),
      //Obtener datos del hijo
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
    itemUrlImg: {
      type: 'string',
      default: '',
    },
    itemAltImg: {
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
    const { isInitialOpen, itemUrlImg, itemAltImg, itemUrl, itemTitle, itemText, itemTxtButton } = attributes;

    // UseEffect para actualizar el atributo isInitialOpen solo una vez al cargar la página
    React.useEffect(() => {
      if (isInitialOpen === '') {
        setAttributes({ isInitialOpen: true });
      } else {
        setAttributes({ isInitialOpen: false });
      }
    }, []);

    var setImageAlt = function(newAltImage) {
      props.setAttributes({ itemAltImg: newAltImage });
    };
    const setImageUrl = (newImageUrl) => {
      props.setAttributes({ itemUrlImg: newImageUrl.url });
    };
    const removeImage = () => {
      props.setAttributes({ itemUrlImg: '' });
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
          setImageUrl(media);
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
          title: 'Item',              
          initialOpen: isInitialOpen,
        },
        wp.element.createElement( 'h3', {className: 'title-xl' }, 'Para todos los tipos de Carrusel' ),
        //Alt img
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Descripción de la imagen (Alt))',
            type: 'itemText',
            value: itemAltImg,
            onChange: setImageAlt
          }
        ),
        //img
        wp.element.createElement(
          wp.components.Placeholder,
          {
            icon: 'format-image',
            label: 'Imagen (Obligatoria)'
          },
          itemUrlImg ? 
            [
              wp.element.createElement(
                'img',
                { src: itemUrlImg }
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
            )            
        ),
        wp.element.createElement( 'h3', {className: 'title-xl' }, 'Para los tipos Mediano y Grande' ),
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
            allowedBlocks: [/*'core/itemUrlImg', 'core/heading', *//*'core/paragraph'],
            template: [/*['core/itemUrlImg'], ['core/heading'], *//*['core/paragraph', {placeholder:'Contenido'}]], 
            templateLock: true
          }
        ),*/
        
        wp.element.createElement( 'h3', {className: 'title-xl' }, 'Solo para el tipo Grande' ),
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

  /*save: function(props) {
    return wp.element.createElement(
      wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
      wp.element.createElement(
        wp.blockEditor.InnerBlocks.Content,
        null
      )
    );
  }*/
  save:() => { return null }
});