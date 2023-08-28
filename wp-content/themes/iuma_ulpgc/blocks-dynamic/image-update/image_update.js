const defaultPath_img = '/wp-content/themes/iuma_ulpgc/images/';
const defaultName_img = 'publicaciones.png';
const defaultUrl = 'https://accedacris.ulpgc.es/cris/ou/ou00045';
const defaultTxtUrl = 'Pulse este enlace para ver más información.';

// Registro del bloque
wp.blocks.registerBlockType('imageupdate-block/my-block', {
  title: 'Imagen Auto Actualizable',
  description: '(Bloque dinámico) Imagen que se actualiza automáticamente al cambiar la imagen de la carpeta seleccionada.',

  icon: 'format-image',
  category: 'ulpgc',
  example: {},
  attributes: {
    path_img: {
      type: 'string',
      default: defaultPath_img
    },
    name_img: {
      type: 'string',
      default: defaultName_img
    },
    url: {
      type: 'string',
      default: defaultUrl,
    },
    txtUrlCheck: {
      type: 'boolean',
      default: true,
    },
    txtUrl: {
      type: 'string',
      default: defaultTxtUrl,
    },
    // Flag para mostrar html diferente en el edit(false) y el save
    isWebView: {
      type:'boolean',
      default: false,
    }
  },
  
  edit: function(props){
    const { attributes, setAttributes } = props;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    const {path_img, name_img, url, txtUrlCheck, txtUrl} = attributes;

    var setPath_img = function(newPath_img) {
      setAttributes({ path_img: newPath_img });
    };
    var setName_img = function(newName_img) {
      setAttributes({ name_img: newName_img });
    };
    var setUrl = function(newUrl) {
      setAttributes({ url: newUrl });
    };
    var setTxtUrlCheck = function(newTxtUrlCheck) {
      props.setAttributes({ txtUrlCheck: newTxtUrlCheck });
    };    
    var setTxtUrl = function(newTxtUrl) {
      props.setAttributes({ txtUrl: newTxtUrl });
    };
  
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };

    // Preview
    const previewContent = wp.element.createElement(
      wp.serverSideRender,
      {
        block: props.name,
        attributes:
          { 
            path_img: path_img,
            name_img: name_img,
            url: url,
            txtUrlCheck: txtUrlCheck,
            txtUrl: txtUrl
          },
      }
    );

    // Edit
    const editContent = wp.element.createElement(
      'div',
      null,
      //Block inspector
      wp.element.createElement(        
        wp.blockEditor.InspectorControls,
        null,
        wp.element.createElement(
          wp.components.PanelBody,
          null,
          wp.element.createElement(
            wp.components.ToggleControl,
            {
              label: 'Añadir texto con el enlace (url)',
              checked: txtUrlCheck,
              onChange: setTxtUrlCheck
            }
          ),
          txtUrlCheck && wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Texto del enlace (url)',
              type: 'text',
              value: txtUrl,
              placeholder: `Por defecto: ${defaultTxtUrl}`,
              onChange: setTxtUrl
            }
          )
        )
      ),
      //Create Image Update Dynamic
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Imagen auto actualizable (Bloque Dinámico)',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Ruta de la imagen',
            value: path_img,
            placeholder: `Por defecto: ${defaultPath_img}`,
            onChange: setPath_img
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Nombre de la imagen',
            value: name_img,
            placeholder: `Por defecto: ${defaultName_img}`,
            onChange: setName_img
          }
        ),
        wp.element.createElement(
          wp.blockEditor.URLInput,
          {
            label: 'Dirección (Url) a la que lleva la imagen',
            value: url,
            placeholder: `Por defecto: ${defaultUrl}`,
            onChange: setUrl
          }
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
  
  save:() => { return null }
});