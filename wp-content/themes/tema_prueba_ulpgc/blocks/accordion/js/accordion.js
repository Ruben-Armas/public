var blockStyle = {
  backgroundColor: 'azure',
  color: '#666',
  padding: '15px'
}

wp.blocks.registerBlockType('block-accordion/my-block', {
    title: 'Mi primer acordeón',

    icon: 'media-spreadsheet',

    category: 'layout',

    edit: function() {
        return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es tu nuevo bloque!!' );
    },

    save: function() {
        return wp.element.createElement( 'h2', { style: blockStyle }, 'Este es el contenido que se salva!!' );
    }
  }
)