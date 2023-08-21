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
  wp.blocks.registerBlockType('youtube-block/my-block', {
    title: 'Video de YouTube',
    icon: 'youtube',
    category: 'ulpgc',

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

      // Verificar si la URL está en formato https://youtu.be/{id}
      if (props.attributes.url.includes('youtu.be')) {
        // Extraer el ID del video de la URL
        var videoId = props.attributes.url.split('youtu.be/')[1];
        // Crear la URL transformada en formato https://www.youtube.com/embed/{id}
        url_edit = 'https://www.youtube.com/embed/' + videoId;
      }
      else if (props.attributes.url.includes('watch?v=')){
        var videoId = props.attributes.url.split('watch?v=')[1];
        // Crear la URL transformada en formato https://www.youtube.com/embed/{id}
        url_edit = 'https://www.youtube.com/embed/' + videoId;
      }
      else if (props.attributes.url.includes('embed/')){
        url_edit = props.attributes.url;
      }

      else {
        // Crear el mensaje de error o instrucciones al usuario
        errorMessage = wp.element.createElement(
          'div',
          null,
          'Introduce un formato de URL aceptado:',
          wp.element.createElement('br'),
          '- Ejemplo: https://www.youtube.com/watch?v=QMEcbXFp8vQ',
          wp.element.createElement('br'),
          '- Ejemplo: https://www.youtube.com/embed/QMEcbXFp8vQ',
          wp.element.createElement('br'),
          '- Ejemplo: https://youtu.be/QMEcbXFp8vQ'
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
            title: 'Vídeo de Youtube',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.blockEditor.URLInput, {
              value: props.attributes.url,
              onChange: setUrl,
              placeholder: 'Introduce la URL del vídeo de YouTube'
            }
          ),
          errorMessage || // Renderizar el mensaje de error si existe, en caso contrario,
          wp.element.createElement(
            'div',
            { className: 'wp-block-embed__wrapper' },
            wp.element.createElement(
              'iframe', 
              {
                allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
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
      
      // Verificar si la URL está en formato https://youtu.be/{id}
      if (url.includes('youtu.be')) {
        // Extraer el ID del video de la URL
        var videoId = url.split('youtu.be/')[1];

        // Crear la URL transformada en formato https://www.youtube.com/watch?v={id}
        url = 'https://www.youtube.com/watch?v=' + videoId;
      }
      else if (url.includes('embed/')){
        var videoId = url.split('embed/')[1];
        url = 'https://www.youtube.com/watch?v=' + videoId;
      }

      return (
        wp.element.createElement(
          'div',
          { className: 'ulpgcds-video' },
          wp.element.createElement(
            'iframe', 
            { 
              allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen: '',
              frameborder: '0',
              width: '560',
              height: '315',
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