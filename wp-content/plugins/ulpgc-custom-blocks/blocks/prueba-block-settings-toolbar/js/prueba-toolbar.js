//<script type="module" src="prueba-toolbar.js"></script>


/*wp.blocks.registerBlockType('prueba-sidebar/my-block', {
  title: 'Mi prueba sidebar',

  icon: 'media-spreadsheet',

  category: 'layout',

  edit: function() {
      return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es tu nuevo bloque!!' );
  },

  save: function() {
      return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es el contenido que se salva!!' );
  }
})*/


( function ( blocks, blockEditor, element ) {
  var elCrt = element.createElement;
  var RichText = blockEditor.RichText;
  var AlignmentToolbar = blockEditor.AlignmentToolbar;
  var BlockControls = blockEditor.BlockControls;
  var useBlockProps = blockEditor.useBlockProps;

  wp.blocks.registerBlockType('prueba-toolbar/my-block', {
      title: 'Mi prueba toolbar',
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

          return elCrt(
              'div',
              useBlockProps(),
              elCrt(
                  BlockControls,
                  { key: 'controls' },
                  elCrt( AlignmentToolbar, {
                      value: alignment,
                      onChange: onChangeAlignment,
                  } )
              ),
              elCrt( RichText, {
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

          return elCrt(
              'div',
              blockProps,
              elCrt( RichText.Content, {
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



/*const registerBlockType = require('@wordpress/blocks');
const {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	PanelBody,
	} = require('@wordpress/components');
const {
	RichText,
	InspectorControls,
	useBlockProps,
	} = require('@wordpress/block-editor');
/*
import { registerBlockType } from '@wordpress/blocks';
import {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	PanelBody,
} from '@wordpress/components';
import {
	RichText,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';*/
/*
registerBlockType( 'my-plugin/inspector-controls-example', {
	apiVersion: 2,

	title: 'Inspector controls example',

	icon: 'universal-access-alt',

	category: 'design',

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		checkboxField: {
			type: 'boolean',
			default: true,
		},
		radioField: {
			type: 'string',
			default: 'yes',
		},
		textField: {
			type: 'string',
		},
		toggleField: {
			type: 'boolean',
		},
		selectField: {
			type: 'string',
		},
	},
})
/*
	edit( { attributes, setAttributes } ) {
		const blockProps = useBlockProps();
		const {
			content,
			checkboxField,
			radioField,
			textField,
			toggleField,
			selectField,
		} = attributes;

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeCheckboxField( newValue ) {
			setAttributes( { checkboxField: newValue } );
		}

		function onChangeRadioField( newValue ) {
			setAttributes( { radioField: newValue } );
		}

		function onChangeTextField( newValue ) {
			setAttributes( { textField: newValue } );
		}

		function onChangeToggleField( newValue ) {
			setAttributes( { toggleField: newValue } );
		}

		function onChangeSelectField( newValue ) {
			setAttributes( { selectField: newValue } );
		}

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Settings' ) }>
						<CheckboxControl
							heading="Checkbox Field"
							label="Tick Me"
							help="Additional help text"
							checked={ checkboxField }
							onChange={ onChangeCheckboxField }
						/>

						<RadioControl
							label="Radio Field"
							selected={ radioField }
							options={ [
								{ label: 'Yes', value: 'yes' },
								{ label: 'No', value: 'no' },
							] }
							onChange={ onChangeRadioField }
						/>

						<TextControl
							label="Text Field"
							help="Additional help text"
							value={ textField }
							onChange={ onChangeTextField }
						/>

						<ToggleControl
							label="Toggle Field"
							checked={ toggleField }
							onChange={ onChangeToggleField }
						/>

						<SelectControl
							label="Select Control"
							value={ selectField }
							options={ [
								{ value: 'a', label: 'Option A' },
								{ value: 'b', label: 'Option B' },
								{ value: 'c', label: 'Option C' },
							] }
							onChange={ onChangeSelectField }
						/>
					</PanelBody>
				</InspectorControls>

				<RichText
					{ ...blockProps }
					key="editable"
					tagName="p"
					onChange={ onChangeContent }
					value={ content }
				/>
			</>
		);
	},

	save( { attributes } ) {
		const {
			content,
			checkboxField,
			radioField,
			textField,
			toggleField,
			selectField,
		} = attributes;
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				<RichText.Content value={ content } tagName="p" />

				<h2>Inspector Control Fields</h2>
				<ul>
					<li>Checkbox Field: { checkboxField }</li>
					<li>Radio Field: { radioField }</li>
					<li>Text Field: { textField }</li>
					<li>Toggle Field: { toggleField }</li>
					<li>Select Field: { selectField }</li>
				</ul>
			</div>
		);
	},
} );*/
