var blockStyle = {
  backgroundColor: 'azure',
  color: '#666',
  padding: '15px'
}

wp.blocks.registerBlockType('prueba-new/my-block', {
  title: 'Mi nuevo plugin',
  icon: 'media-spreadsheet',
  category: 'common',
  attributes: {
    title: {
      type: 'string',
      default: 'Título de mi bloque'
    },
    content: {
      type: 'string',
      default: 'Contenido de mi bloque'
    },
    textColor: {
      type: 'string',
      default: '#ffffff'
    },
    backgroundColor: {
      type: 'string',
      default: '#ffffff'
    }
  },

  edit: function(props) {
    var setTitle = function(newTitle) {
      props.setAttributes({ title: newTitle });
    };
    var setContent = function(newContent) {
      props.setAttributes({ content: newContent });
    };
    var setTextColor = function(newColor) {
      props.setAttributes({ textColor: newColor });
    };
    var setBackgroundColor = function(newColor) {
      props.setAttributes({ backgroundColor: newColor });
    };

    return wp.element.createElement(
      'div',
      {
        //className: 
        style: blockStyle 
      },
      wp.element.createElement(
        wp.components.TextControl,
        {
            label: 'Título',
            value: props.attributes.title,
            onChange: setTitle
        }
      ),
      wp.element.createElement(
        wp.components.TextareaControl,
        {
          label: 'Contenido',
          value: props.attributes.content,
          onChange: setContent
        }
      ),
      // RichText
      /*wp.element.createElement(
        wp.editor.RichText,
        {
          //tagName: 'h2',
          label: 'Contenido',
          //className: props.className,
          value: props.attributes.content,
          onChange: setContent
        }
      ),*/
      wp.element.createElement(
        wp.components.ColorPicker,
        {
          label: 'Color del texto',
          color: props.attributes.textColor,
          onChange: setTextColor
        }
      ),
      wp.element.createElement(
        wp.components.ColorPicker,
        {
          label: 'Color del fondo',
          color: props.attributes.backgroundColor,
          onChange: setBackgroundColor
        }
      ),
      wp.element.createElement(
        wp.components.Button,
        {
          onClick: () => {
            props.setAttributes({ title: '', content: '', textColor: '#000000', backgroundColor: '#ffffff' });
          }
        },
        'Resetear'
      )
    );
  },

  save: function(props) {
    return wp.element.createElement(
      'div',
      {
        style: { backgroundColor: props.attributes.backgroundColor }
      },
      wp.element.createElement(
        'h2',
        {
          style: { color: props.attributes.textColor }
        },
        props.attributes.title
      ),
      wp.element.createElement(
        'p',
        {
          style: { color: props.attributes.textColor }
        },
        props.attributes.content
      ),
      // RichText
      /*wp.element.createElement(
        wp.editor.RichText.Content, {
          tagName: 'p',
          value: props.attributes.content
        }
      )*/
    );
  }
  /*save: function() {
      return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es el contenido que se salva!!' );
  }*/
})