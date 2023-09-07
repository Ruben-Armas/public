( function ( blocks, element, blockEditor ) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;
  var useBlockProps = blockEditor.useBlockProps;
  var useInnerBlocksProps = blockEditor.useInnerBlocksProps;

  blocks.registerBlockType('testblockprops-block/my-block', {
    title: 'Test Blockprops',
    category: 'ulpgc',

    edit: function () {
      var blockProps = useBlockProps();
      //Normal
      /*var innerBlocksProps = useInnerBlocksProps();

      return element.createElement( 
        'div',
        blockProps,
        element.createElement(
          'div',
          innerBlocksProps
        )
      );*/

      //Concatenando html al mismo nivel
      /*var { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps );

      return el(
        'div',
        innerBlocksProps,
        children,
        el(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          '<!-- Insert any arbitrary html here at the same level as the children -->',
        )
      );*/

      //Personalizando las opciones disponibles + Normal
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ['testblockprops-block/child-item'],
        template: [ [ 'testblockprops-block/child-item', {isInitialOpen: true} ] ],
        templateLock: false,
      })
      return element.createElement( 
        'div',
        blockProps,
        element.createElement(
          'div',
          innerBlocksProps
        )
      );
    },

    save: function () {
      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      //return el( 'div', blockProps, el( 'div', innerBlocksProps ) );
      return el( 'div', innerBlocksProps ); // Sin div envolvente
    },
  });


  wp.blocks.registerBlockType('testblockprops-block/child-item', {
    title: 'Child testBlockprops',
    icon: 'list-view',
    category: 'ulpgc',
    parent: ['testblockprops-block/my-block'],
    attributes: {},
  
    edit: function(props) {
      //const { attributes, setAttributes } = props;

      var blockProps = useBlockProps();
      //Personalizando las opciones disponibles
      const innerBlocksProps = useInnerBlocksProps( blockProps, {
        template: [ ['core/paragraph'] ],
        templateLock: false,
      })
      return element.createElement( 
        'div',
        blockProps,
        element.createElement(
          'div',
          innerBlocksProps
        )
      );
    },

    save: function(props) {
      const { rowName, tagName, divCheck } = props.attributes;

      var blockProps = useBlockProps.save();
      var innerBlocksProps = useInnerBlocksProps.save();

      return el(
        wp.element.Fragment, null,  //Quita la envoltura del bloque hijo (div adicional)
        el(
          'h3',
          null,
          'someAttribute'
        ),
        innerBlocksProps.children //Quita la envoltura del div adicional
        //el(
        //  'div',
        //  innerBlocksProps
        //)
      );
    }
  });

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );