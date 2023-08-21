wp.blocks.registerBlockType('prueba-sidebar/my-block', {
  title: 'Mi prueba sidebar',
  icon: 'media-spreadsheet',
  category: 'layout',
  attributes: {
    talign: {
			type: "string",
			default: "center center"
		},
		textAlign: {
			type: "string",
			default: "left"
    }
  },
  supports: {
    align: true,
    color: {
      text: true,
      background: true,
      link: true
    },
    anchor: true,
    ariaLabel: true,

  },

  edit: function(props) {
    var setContent = function(newContent) {
      props.setAttributes({ content: newContent });
    };

    return [
      wp.element.createElement(
        wp.components.TextControl,
        {
          type: 'text',
          onChange: setContent,
          placeholder: 'Este es tu nuevo slider'
        }
      ),
    ];
  },

  save: function() {
      return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es el contenido que se salva!!' );
  }
})

/*
( function ( blocks, blockEditor, element ) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;
  var AlignmentToolbar = blockEditor.AlignmentToolbar;
  var BlockControls = blockEditor.BlockControls;
  var useBlockProps = blockEditor.useBlockProps;

  wp.blocks.registerBlockType('prueba-sidebar/my-block', {
      title: 'Mi prueba sidebar',
      icon: 'universal-access-alt',
      category: 'design',

      attributes: {
          content: {
              type: 'string',
              source: 'html',
              selector: 'p',
          },
          alignment: {
              type: 'string',
              default: 'none',
          },
      },
      example: {
          attributes: {
              content: 'Hello World',
              alignment: 'right',
          },
      },
      edit: function ( props ) {
          var content = props.attributes.content;
          var alignment = props.attributes.alignment;

          function onChangeContent( newContent ) {
              props.setAttributes( { content: newContent } );
          }

          function onChangeAlignment( newAlignment ) {
              props.setAttributes( {
                  alignment:
                      newAlignment === undefined ? 'none' : newAlignment,
              } );
          }

          return el(
              'div',
              useBlockProps(),
              el(
                  BlockControls,
                  { key: 'controls' },
                  el( AlignmentToolbar, {
                      value: alignment,
                      onChange: onChangeAlignment,
                  } )
              ),
              el( RichText, {
                  key: 'richtext',
                  tagName: 'p',
                  style: { textAlign: alignment },
                  onChange: onChangeContent,
                  value: content,
              } )
          );
      },

      save: function ( props ) {
          var blockProps = useBlockProps.save();

          return el(
              'div',
              blockProps,
              el( RichText.Content, {
                  tagName: 'p',
                  className:
                      'gutenberg-examples-align-' +
                      props.attributes.alignment,
                  value: props.attributes.content,
              } )
          );
      },
  } );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element );
*/

/*const { ToolbarGroup, ToolbarButton } = wp.components;

function CustomToolbar(props) {
  const { onClickButton } = props;

  return (
    <ToolbarGroup>
      <ToolbarButton
        icon="edit"
        label="Editar"
        onClick={() => onClickButton("edit")}
      />
      <ToolbarButton
        icon="trash"
        label="Eliminar"
        onClick={() => onClickButton("delete")}
      />
    </ToolbarGroup>
  );
}

/*
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { Icon } from '@wordpress/icons';

const MyToolbarGroup = () => (
  <ToolbarGroup
    isCollapsed={false}
    icon={<Icon icon="admin-settings" />}
  >
    <ToolbarButton icon={<Icon icon="plus" />} />
    <ToolbarButton icon={<Icon icon="minus" />} />
    <ToolbarButton icon={<Icon icon="visibility" />} />
  </ToolbarGroup>
);*/
