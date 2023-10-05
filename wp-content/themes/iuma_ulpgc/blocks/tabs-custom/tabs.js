// Registro del bloque
wp.blocks.registerBlockType('tabs-block/my-block', {
  title: 'Pestañas / Tabs',
  className: 'ulpgcds-tabs',
  description: 'Pestañas con el estilo de la ULPGC',
  icon: 'table-row-after',
  category: 'ulpgc',
  example: {},
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },

  edit: function(props) {
    const { items } = props.attributes;
    const [isEditing, setIsEditing] = wp.element.useState(false);
    const [showSavedMessage, setShowSavedMessage] = React.useState(false);
    //console.log('props block edit');
    //console.log(items);
    
    const handleEdit = () => {
      setIsEditing(true);
    };  
    const handlePreview = () => {
      handleSaveButtonClick();
      setIsEditing(false);
    };

    function showMessage() {
      setShowSavedMessage(true);

      // Después de 2 segundos, ocultar el mensaje de "guardado"
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 2000);
    }
    // Actualiza los atributos obtenidos de los hijos
    function updateData(){
      const hijos = wp.data.select('core/block-editor').getBlocks(props.clientId);

      const atributosHijos = hijos.map((block) => {
        if (block.name === 'tabs-block/tab-item' && block.attributes.tabName !== '') {
          return {
            tabName: block.attributes.tabName,
            tabIcon: block.attributes.tabIcon || '',
            randomId: block.attributes.randomId || 0,
          };
        }
        return null; // Si no es el bloque esperado o no cumple la condición, retorna null
      }).filter((atributo) => atributo !== null); // filter para eliminar los elementos null del resultado.

      // Actualizar los atributos items en el bloque padre solo una vez
      props.setAttributes({ items: atributosHijos });
    }
    function handleSaveButtonClick() {
      showMessage();
      updateData();
    };

    // UseEffect para actualizar los atributos tabNames solo una vez al cargar la página
    React.useEffect(() => {
      updateData();
    }, []);

    const savedMessageElement = showSavedMessage && wp.element.createElement(
      wp.components.Notice,
      {
        status: 'success',
        isDismissible: false
      },
      'Guardado'
    );
    const saveElements = [
      wp.element.createElement(
        wp.components.Notice,
        {
          status: 'warning',
          isDismissible: false
        },
        'Recuerde Guardar / Actualizar el Bloque'
      ),
      // Muestra el mensaje de guardado
      savedMessageElement,
      // Help Element
      wp.element.createElement(
        wp.components.Flex,
        { direction: 'row', wrap: 'wrap' },
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 1 } },
          wp.element.createElement(
            wp.components.Button,
            { 
              isPrimary: true,
              onClick: handleSaveButtonClick,
              style: { marginLeft: '15px' }
            },
            'Guardar / Actualizar Bloque'
          )
        ),
        wp.element.createElement(
          wp.components.FlexItem,
          { style: { flexGrow: 8 } },
          wp.element.createElement(
            wp.components.Button,
            {
              isPrimary: true,
              onClick: handlePreview,
              style: { marginLeft: '15px' }
            },
            'Vista previa'
          )
        )
      )
    ];

    // Preview default
    const previewDefault = wp.element.createElement(
      'div', null,
      // Crea el elemento Tabs/Pestañas
      wp.element.createElement(
        'ul',
        { className: 'ulpgcds-tabs' },
        wp.element.createElement(
          'li',
          {
            className: 'active',
            href: '#tab-001'
          },
          /*wp.element.createElement(
            'span',
            { className: 'icon ulpgcds-icon-group' }
          ),*/
          'Pestaña 1'
        ),
        wp.element.createElement(
          'li',
          { href: '#tab-002' },
          'Pestaña 2'
        ),
        wp.element.createElement(
          'li',
          { href: '#tab-003' },
          'Pestaña 3'
        ),
        wp.element.createElement(
          'li',
          { href: '#tab-more' },
          '...'
        )
      ),
      wp.element.createElement(
        'div',
        {
          className: 'ulpgcds-tab-content active',
          href: 'tab-001'
        },
        wp.element.createElement(
          'h3', null, 'Encabezado 1'
        ),
        wp.element.createElement(
          'p', null, 'Contenido 1'
        ),
      ),
      wp.element.createElement(
        'div',
        {
          className: 'ulpgcds-tab-content',
          href: 'tab-002'
        },
        wp.element.createElement(
          'h3', null, 'Encabezado 2'
        ),
        wp.element.createElement(
          'p', null, 'Contenido 2'
        ),
      ),
      wp.element.createElement(
        'div',
        {
          className: 'ulpgcds-tab-content',
          href: 'tab-003'
        },
        wp.element.createElement(
          'h3', null, 'Encabezado 3'
        ),
        wp.element.createElement(
          'p', null, 'Contenido 3'
        ),
      )
    );

    // Elementos a mostrar en la Preview
    const tabItemsToShow = Math.min(5, items.length);
    const tabElementsLi = [];
    const tabElementsDiv  = [];
    if (items.length > 0) {
      for (let index = 0; index < tabItemsToShow; index++) {
        const itemObj = items[index];
        tabElementsLi.push(
          wp.element.createElement(
            'li',
            {
              href: index < tabItemsToShow ? `#tab-00${index}` : (index === tabItemsToShow -1 ? '#tab-more' : null),
              className: index === 0 ? 'active' : ''
            },
            itemObj.tabIcon && wp.element.createElement(
              'span',
              { className: `icon ${itemObj.tabIcon}` }
            ),
            index < tabItemsToShow ? itemObj.tabName : (index === tabItemsToShow -1 ? '...' : null)
          )
        );
        tabElementsDiv.push(
          wp.element.createElement(
            'div',
            {
              className: `ulpgcds-tab-content ${index === 0 ? 'active' : ''}`,
              href: index < tabItemsToShow ? `tab-00${index}` : (index === tabItemsToShow -1 ? 'tab-more' : null)
            },
            wp.element.createElement(
              'h3', null,
              index < tabItemsToShow ? `Encabezado de --> ${itemObj.tabName}...` : (index === tabItemsToShow -1 ? '...' : null)
              
            ),
            wp.element.createElement(
              'p', null,
              index < tabItemsToShow ? `Contenido de --> ${itemObj.tabName}...` : (index === tabItemsToShow -1 ? '...' : null)
            ),
          )
        )
      }
    }

    // Preview
    const preview = wp.element.createElement(
      'div', null,
      // Muestra el mensaje de guardado
      savedMessageElement,
      // Crea el elemento Tabs/Pestañas
      wp.element.createElement(
        'ul',
        { className: 'ulpgcds-tabs' },
        tabElementsLi
      ),
      tabElementsDiv
    );
    
    // Preview o Preview default
    previewContent = items.length <=0 ? previewDefault : preview/*showPreviewFinalTabs(props)*/;

    // Edit
    const editContent = wp.element.createElement(
      'div', null,
      //Block inspector
      wp.element.createElement(
        wp.blockEditor.InspectorControls,
        null,
        saveElements,
        wp.element.createElement(
          wp.components.Notice,
          {
            status: 'success',
            isDismissible: false
          },
          'Para añadir más bloques hijos seleccione su bloque padre y pulse +'
        ),
      ),
      // Create Tabs
      wp.element.createElement(
        wp.components.PanelBody,
        {
          title: 'Pestañas / Tabs',
          initialOpen: true,
        },
        saveElements,
        wp.element.createElement(
          wp.blockEditor.InnerBlocks,
          {
            allowedBlocks: ['tabs-block/tab-item'],
            template: [['tabs-block/tab-item', {isActive: true}]],
            templateLock: false,
          }
        ),
        // Botón para salir de la edición
        wp.element.createElement(
          wp.components.Button,
          { isPrimary: true, onClick: handlePreview },
          'Vista previa'
        )
      )
    );
  
    return wp.element.createElement(
      'div',
      null,
      // Muestra la vista previa o el editor
      isEditing ? editContent : previewContent,
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
  save: function(props) {
    const { items } = props.attributes;

    return wp.element.createElement(
      'div',
      null,
      wp.element.createElement(
        'ul',
        { className: 'ulpgcds-tabs' },
        items.map((itemObj, index) => (
          wp.element.createElement(
            'li',
            {
              key: itemObj.randomId,
              href: `#tab-${itemObj.randomId}`,
              className: index === 0 ? 'active' : ''
            },
            itemObj.tabIcon && wp.element.createElement(
              'span',
              { className: `icon ${itemObj.tabIcon}` }
            ),
            itemObj.tabName
          )
        ))
      ),
      wp.element.createElement(
        wp.blockEditor.InnerBlocks.Content,
        null
      )
    );
  }
});

wp.blocks.registerBlockType('tabs-block/tab-item', {
  title: 'Tab Item',
  icon: 'list-view',
  category: 'ulpgc',
  parent: ['tabs-block/my-block'],
  attributes: {
    tabName: {
      type: 'string',
      default: '',
    },
    tabIcon: {
      type: 'string',
      default: '',
    },
    randomId: {
      type: 'number',
      default: 0
    },
    isActive: {
      type: 'boolean',
      default: false,
    },
    isInitialOpen: {
      type: 'boolean',
      default: '',
    }
  },

  edit: function(props) {
    const { attributes, setAttributes } = props;
    const { tabName, tabIcon, randomId, isInitialOpen } = attributes;

    var setTabName = function(newTabName) {
      setAttributes({ tabName: newTabName });
    };
    var setTabIcon = function(newTabIcon) {
      setAttributes({ tabIcon: newTabIcon });
    };

    // Si es el primer bloque -> isActive: true
    function checkIfFirstBlock() {
      // Obtén el ID del bloque padre
      const parentClientId = wp.data.select('core/block-editor').getBlockHierarchyRootClientId(props.clientId);

      // Obtén los bloques hijos del padre
      const parentInnerBlocks = wp.data.select('core/block-editor').getBlocks(parentClientId);

      // Comprueba si el bloque actual es el primer bloque hijo
      const isFirstBlock = parentInnerBlocks.length > 0 && parentInnerBlocks[0].clientId === props.clientId;
      setAttributes({ isActive: isFirstBlock })
    }

    // Actualiza isActive
    checkIfFirstBlock();
    
    // UseEffect para actualizar los atributos randomId e isInitialOpen solo una vez al cargar la página
    React.useEffect(() => {
      // Actualiza el atributo randomId solo una vez
      if (!randomId.length) {
        const randId = Math.floor(Math.random() * 10000);
        setAttributes({ randomId: randId });
      }
      // Actualiza el atributo isInitialOpen solo una vez
      if (isInitialOpen === '') {
        setAttributes({ isInitialOpen: true });
      } else {
        setAttributes({ isInitialOpen: false });
      }
    }, []);

    return wp.element.createElement(
      wp.components.PanelBody,
      {
        title: `Pestaña --> ${tabName}`,
        initialOpen: isInitialOpen,
      },
      wp.element.createElement(
        wp.components.TextControl,
        {
          label: 'Nombre de la etiqueta',
          type: 'text',
          value: tabName,
          onChange: setTabName
        },
      ),
      wp.element.createElement(
        wp.components.TextControl,
        {
          label: 'Icono de la etiqueta (Opcional)',
          type: 'text',
          help: 'Iconos de la ULPGC --> https://designsystem.ulpgc.es/iconos',
          value: tabIcon,
          onChange: setTabIcon
        },
      ),
      'Contenido: (Puede añadir todos los bloques que necesite)',
      wp.element.createElement(
        wp.blockEditor.InnerBlocks,
        {
          template: [
            [ 'core/heading', { level: 3, value: tabName, placeholder: 'Título (Opcional)' } ],
            ['core/paragraph']
          ],
          templateLock: false
        }
      ),
    );
  },
  save: function(props) {
    const { randomId, isActive } = props.attributes;
    
    return wp.element.createElement(
      'div',
      {
        className: `ulpgcds-tab-content ${isActive ? 'active' : ''}`, // Agregamos la clase "active" si el bloque está seleccionado
        id: `tab-${randomId}`, // Generamos el ID utilizando el ID único del bloque
      },
      wp.element.createElement(
        wp.blockEditor.InnerBlocks.Content,
        null
      )
    );
  }
});
