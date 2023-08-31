const textArea_placeHolder_default = 'Aquí irá el texto que introducirá el usuario';
const help_text_default = 'Texto de ayuda por defecto';

function showPreviewFinalTextArea(props){
  const { labelText, txtAreaPlaceholder, contCheck, maxChars, helpTextType, helpText } = props.attributes;

  let finalTxtAreaPlaceholder = txtAreaPlaceholder ? txtAreaPlaceholder : textArea_placeHolder_default;
  
  // Default (without help-text)
  let textAreaId = 'text-area-1';
  let textarea_html = { id: textAreaId, name: textAreaId, placeholder: finalTxtAreaPlaceholder };
  let help_text_div = null;

  // char-count
  let class_form_count = '';
  if (contCheck){
    textAreaId = 'text-area-4';    
    class_form_count = ' ulpgcds-form__item--counter';
    textarea_html.maxlength = maxChars;
  }

  switch (helpTextType) {
    case 'without':
      textAreaId = 'text-area-1';
      break;
    case 'with':
      textAreaId = 'text-area-4';
      if ( helpText == '' ){
        help_text_div = wp.element.createElement('div', { className: 'help-text' }, help_text_default);
      } else {
        help_text_div = wp.element.createElement('div', { className: 'help-text' }, helpText);
      }
      break;
    case 'error':
      textAreaId = 'text-area-2';
      textarea_html.required = 'required';
      textarea_html['aria-required'] = 'true';
      textarea_html.className = 'form-item__error';
      if ( helpText == '' ){
        help_text_div = wp.element.createElement('div', { className: 'help-text' }, 'Este campo no puede quedar vacío.');
      } else {
        help_text_div = wp.element.createElement('div', { className: 'help-text' }, helpText);
      }
      break;
    default:
      textAreaId = 'text-area-1';
  }
  
  return wp.element.createElement(
    'form',
    {
      className: 'ulpgcds-form'
    },
    wp.element.createElement(
      'div',
      {
        className: 'ulpgcds-form__item ulpgcds-form__item--textarea' + class_form_count
      },
      wp.element.createElement(
        'label',
        { htmlFor: textAreaId },
        labelText || 'Título/etiqueta del campo (Área de texto)'
      ),
      wp.element.createElement(
        'textarea',
        { 
          ...textarea_html
        },
      ),
      help_text_div
    ),
  );
}

// Registro del bloque
wp.blocks.registerBlockType('textarea-block/my-block', {
  title: 'Área de texto',
  description: 'Área de texto con el estilo de la ULPGC',

  icon: 'text',
  category: 'ulpgc',
  attributes: {
    labelText: {
      type: 'string',
      default: '',
    },
    txtAreaPlaceholder: {
      type: 'string',
      default: '',
    },
    // NO SE USA
    content: {
      type: 'string',
      default: '',
    },
    contCheck: {
      type: 'boolean',
      default: false,
    },
    maxChars: {
      type: 'int',
      default: 150,
    },
    helpTextType: {
      type: 'string',
      default: '',
    },
    helpText: {
      type: 'string',
      default: '',
    }
  },

  //Editor view
  edit: function (props) {
    const { labelText, txtAreaPlaceholder, contCheck, maxChars, helpTextType, helpText } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    
    var setLabelText = function(newLabelText) {
      props.setAttributes({ labelText: newLabelText });
    };
    var setTxtAreaPlaceholder = function(newTxtAreaPlaceholder) {
      props.setAttributes({ txtAreaPlaceholder: newTxtAreaPlaceholder });
    };
    var setcontCheck = function(newContCheck) {
      props.setAttributes({ contCheck: newContCheck });
    };
    var setMaxChars = function(newMaxChars) {
      props.setAttributes({ maxChars: newMaxChars });
    };
    var setHelpTextType = function(newHelpTextType) {
      props.setAttributes({ helpTextType: newHelpTextType });
    };
    var setHelpText = function(newHelpText) {
      props.setAttributes({ helpText: newHelpText });
    };
    
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      setIsEditing(false);
    };

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
            wp.components.ToggleControl,
            {
              label: 'Contador de caracteres',
              checked: contCheck,
              onChange: setcontCheck
            }
          ),
          contCheck && wp.element.createElement(
            wp.components.RangeControl,
            {
              label: 'Cantidad máxima de caracteres',
              type: 'number',
              value: maxChars,
              initialPosition: 150,
              onChange: setMaxChars,
              min: 0,
              max: 250,
              allowReset: true,
            },
          ),
          wp.element.createElement(
            wp.components.SelectControl,
            {
              label: 'Tipo de texto de ayuda',
              value: helpTextType,
              options: [
                { label: 'Sin texto de ayuda', value: 'without' },
                { label: 'Con texto de ayuda', value: 'with' },
                { label: 'Con detector de errores (El campo es obligatorio)', value: 'error' },
              ],
              onChange: setHelpTextType
            }
          ),
          helpTextType != 'without' && wp.element.createElement(
            wp.components.TextControl,
            {
              label: 'Texto de ayuda / error',
              placeholder: 'Ej: El campo es obligatorio',
              type: 'text',
              value: helpText,
              help: 'El detector de errores detecta si el campo está relleno',
              onChange: setHelpText
            }
          )
        )
      ),

      //Create Text Area
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Área de texto',
          initialOpen: true,
        },
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Título/etiqueta del campo',
            placeholder: 'Ej: Sugerencias',
            type: 'text',
            value: labelText,
            onChange: setLabelText
          }
        ),
        wp.element.createElement(
          wp.components.TextControl,
          {
            label: 'Placeholder del área de texto (opcional)',
            placeholder: txtAreaPlaceholder,
            type: 'text',
            value: txtAreaPlaceholder,
            onChange: setTxtAreaPlaceholder
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
      isEditing ? editContent : showPreviewFinalTextArea(props),
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
    return showPreviewFinalTextArea(props)
  }
})
