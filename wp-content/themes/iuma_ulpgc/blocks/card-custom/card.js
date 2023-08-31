// Funciones y variables comunes al edit y save
const defaultImage = '/wp-content/themes/iuma_ulpgc/images/defaultPerfil.jpg';
//const defaultImage = get_template_directory_uri() + '/images/defaultPerfil.jpg';

function showPreviewFinalCard(props){
  const { person_name, job_name, phone, email, office, image, altImage, first_card_space, last_card_space } = props.attributes;

  return wp.element.createElement(
    'div',
    {
      //className: 'row card_custom'
      className: 'row card_custom' + (first_card_space ? ' card_first' : '') + (last_card_space ? ' card_last' : '')
    },
    wp.element.createElement(
      'div',
      {className: 'col-3 card_col_img'},
      wp.element.createElement(
        'img',
        {
          className: 'card_img',
          src: image || defaultImage,
          alt: altImage,
        },
      ),
    ),
    wp.element.createElement(
      'div',
      {className: 'col-9 card_info'},
      wp.element.createElement(
        'div',
        {className: 'card_person_name'},
        person_name || 'Vacante'
      ),
      wp.element.createElement(
        'h2',
        {className: 'card_job_name'},
        job_name
      ),
      phone && wp.element.createElement(
        'div',
        null,//{ className: 'card_info' },
        'Teléfono: ', phone
      ),
      email && wp.element.createElement(
        'span',
        null,//{ className: 'card_info' },
        'Correo: ',
        wp.element.createElement(
          'a',
          {
            //className: 'card_info',
            label: 'Correo',
            href: 'mailto:' + email
          },
          email
        )
      ),
      office && wp.element.createElement(
        'div',
        { className: 'card_info' },
        'Despacho: ', office
      ),
    )
  )
};

// Registro del bloque
wp.blocks.registerBlockType('card-block/my-block', {
  title: 'Tarjeta /card',
  description: 'Tarjeta con el estilo de la ULPGC',

  icon: 'id',
  category: 'ulpgc',
  example: {},
  attributes: {
    person_name: {
      type: 'string',
      default: '',
    },
    job_name: {
      type: 'string',
      default: '',
    },
    phone: {
      type: 'string',
      default: '',
    },
    email: {
      type: 'string',
      default: '',
    },    
    office: {
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
    first_card_space: {
      type: 'boolean',
      default: false,
    },
    last_card_space: {
      type: 'boolean',
      default: false,
    }
  },

  //Editor view
  edit: function(props) {
    const { person_name, job_name, phone, email, office, image, altImage, first_card_space, last_card_space } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
  
    var setPersonName = function(newPersonName) {
      props.setAttributes({ person_name: newPersonName });
    };
    var setJobName = function(newJobName) {
      props.setAttributes({ job_name: newJobName });
    };
    var setPhone = function(newPhone) {
      props.setAttributes({ phone: newPhone });
    };
    var setEmail = function(newEmail) {
      props.setAttributes({ email: newEmail });
    };
    var setOffice = function(newOffice) {
      props.setAttributes({ office: newOffice });
    };
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
  
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };  

    // Preview
    previewContent =  job_name ? showPreviewFinalCard(props) : 
      wp.element.createElement(
        'div',
        {
          className: 'row card_custom'
        },
        wp.element.createElement(
          'div',
          {className: 'col-3'},
          wp.element.createElement(
            'img',
            {
              src: image || defaultImage,
              alt: altImage,
            },
          ),
        ),
        wp.element.createElement(
          'div',
          {className: 'col-9'},
          wp.element.createElement(
            'div',
            {className: 'card_person_name'},
            person_name || 'Dr/a. Nombre Apellidos'
          ),
          wp.element.createElement(
            'h2',
            {className: 'card_job_name'},
            job_name || 'Cargo (director, secretario..)'
          ),
          wp.element.createElement(
            'div',
            null,
            'Teléfono: ', phone || 'Teléfono: 123456789'
          ),
          wp.element.createElement(
            'span',
            null,
            'Correo: ',
            wp.element.createElement(
              'a',
              {
                label: 'Correo',
                href: 'mailto:' + email
              },
              email || 'ejemplo@iuma.es'
            )
          ),
          wp.element.createElement(
            'div',
            null,
            'Despacho: ', office || 'Despacho: Edificio de ejemplo'
          ),
        )
      );
    
    // Edit
    const editContent = wp.element.createElement(
      'div',
      null,
      //Block inspector
      wp.element.createElement(
        wp.editor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.PanelBody,
          null,
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
              label: 'Espaciado 1ª tarjeta /card',
              checked: first_card_space,
              onChange: function() {
                props.setAttributes({ first_card_space: !first_card_space });
              }
            }
          ),
          wp.element.createElement(
            wp.components.ToggleControl,
            {
              label: 'Espaciado última tarjeta /card',
              checked: last_card_space,
              onChange: function() {
                props.setAttributes({ last_card_space: !last_card_space });
              }
            }
          )
        )
      ),

      //Create Card
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Tarjeta / card',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Nombre',
            value: person_name,
            onChange: setPersonName
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Cargo',
            value: job_name,
            onChange: setJobName
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Teléfono',
            type: 'tel',
            value: phone,
            onChange: setPhone
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Correo',
            type: 'email',
            value: email,
            onChange: setEmail
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Despacho',
            value: office,
            onChange: setOffice
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


  //Page view
  save: function(props) {
    return showPreviewFinalCard(props)
  }
})
