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
  wp.blocks.registerBlockType('vimeo-block/my-block', {
    title: 'Video de Vimeo',
    icon: 'format-video',
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
      var errorMessage = '';
      
      if (!props.attributes.url.includes('/video/')){
        // Crear el mensaje de error o instrucciones al usuario
        errorMessage = wp.element.createElement(
          'div',
          null,
          'Introduce un formato de URL aceptado:',
          wp.element.createElement('br'),
          '- Ejemplo: https://player.vimeo.com/video/291249918'
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
            title: 'Vídeo de vimeo',
            initialOpen: true,
          },
          wp.element.createElement(
            wp.blockEditor.URLInput, {
              value: props.attributes.url,
              onChange: setUrl,
              placeholder: 'Introduce la URL del vídeo de Vimeo'
            }
          ),
          errorMessage || // Renderizar el mensaje de error si existe, en caso contrario,
          wp.element.createElement(
            'div',
            { className: '' },
            wp.element.createElement(
              'iframe', 
              {
                title: 'vimeo-player',
                frameborder: '0',
                allowfullscreen: '',
                width: '560',
                height: '315',
                src: props.attributes.url
              }
            )
          )
        )
      ];
    },

    save: function(props) {
      return (
        wp.element.createElement(
          'div',
          { className: 'ulpgcds-video' },
          wp.element.createElement(
            'iframe', 
            {
              title: 'vimeo-player',
              frameborder: '0',
              allowfullscreen: '',
              width: '640',
              height: '359',
              src: props.attributes.url
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