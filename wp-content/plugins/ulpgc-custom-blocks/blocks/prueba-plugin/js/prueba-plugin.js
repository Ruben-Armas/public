var blockStyle = {
  backgroundColor: 'azure',
  color: '#666',
  padding: '15px'
}

wp.blocks.registerBlockType('prueba-plugin/my-block', {
    title: 'Mi prueba plugin',

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