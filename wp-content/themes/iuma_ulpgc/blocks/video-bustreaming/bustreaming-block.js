/**
 * Envolver el código en esta función autoejecutable,
 *  encapsula el código, evitando conflictos.
 *  
 * Crea un ámbito local donde se declaran las variables,
 *  no interfiriendo con el entorno global.
 * 
 * Además, al pasar las bibliotecas de Gutenberg como argumentos,
 *  se pueden usar alias más cortos (blocks, editor y element)
 *  no necesitando el prefijo wp.
 */
(function (blocks, editor, element) {
  wp.blocks.registerBlockType('bustreaming-block/my-block', {
    title: 'Video de BUstreaming',
    icon: 'video-alt2',
    category: 'ulpgc',
    example: {},
    attributes: {
      url: {
        type: 'string',
        default: ''
      }
    },

    edit: function(props) {
      
      function setUrl(newURL) {
        props.setAttributes({ url: newURL });
      }
    
      var url_edit = ''; // Variable para almacenar la URL transformada
      var errorMessage = '';

      // Verificar si la URL está en formato https://bustreaming.ulpgc.es/reproducir/{id}
      if (props.attributes.url.includes('reproducir/')) {
        // Extraer el ID del video de la URL
        var videoId = props.attributes.url.split('reproducir/')[1];
        // Crear la URL transformada en formato https://bustreaming.ulpgc.es/reproducirEmbed/{id}
        url_edit = 'https://bustreaming.ulpgc.es/reproducirEmbed/' + videoId;
      }
      else if (props.attributes.url.includes('reproducirEmbed/')){
        url_edit = props.attributes.url;
      }

      else {
        // Crear el mensaje de error o instrucciones al usuario
        errorMessage = wp.element.createElement(
          'div',
          null,
          'Introduce un formato de URL aceptado:',
          wp.element.createElement('br'),
          '- Ejemplo: https://bustreaming.ulpgc.es/reproducirEmbed/100197',
          wp.element.createElement('br'),
          '- Ejemplo: https://bustreaming.ulpgc.es/reproducir/100197'
        );
      }

      return [
        //Controles del bloque
        wp.element.createElement(
          wp.blockEditor.BlockControls,
          { key: 'controls' },
          wp.element.createElement(
            wp.blockEditor.BlockAlignmentToolbar,
            { key: 'alignment' }
          )
        ),
        //Url del video
        wp.element.createElement(
          wp.components.PanelBody,
          {
            title: 'Vídeo de BUstreaming',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.blockEditor.URLInput, {
              value: props.attributes.url,
              onChange: setUrl,
              placeholder: 'Introduce la URL del vídeo de BUstreaming'
            }
          ),
          errorMessage || // Renderizar el mensaje de error si existe, en caso contrario,
          wp.element.createElement(
            'div',
            { className: 'wp-block-embed__wrapper' },
            wp.element.createElement(
              'iframe', 
              {
                allowfullscreen: '',
                frameborder: '0',
                width: '560',
                height: '315',
                src: url_edit
              }
            )
          )
        )
      ];
    },

    save: function(props) {
      //Transforma la url al formato correcto
      var url = props.attributes.url;
      
      // Verificar si la URL está en formato https://bustreaming.ulpgc.es/reproducir/{id}
      if (url.includes('reproducir/')) {
        // Extraer el ID del video de la URL
        var videoId = url.split('reproducir/')[1];
        // Crear la URL transformada en formato https://bustreaming.ulpgc.es/reproducirEmbed/{id}
        url = 'https://bustreaming.ulpgc.es/reproducirEmbed/' + videoId;
      }

      return (
        wp.element.createElement(
          'div',
          { className: 'ulpgcds-video' },
          wp.element.createElement(
            'iframe', 
            {
              allowfullscreen: '',
              src: url
            }
          )
        )
      );
    }
  });
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.element
);