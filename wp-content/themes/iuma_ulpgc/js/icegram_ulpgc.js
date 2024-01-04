// Seleccionar cada contenedor de campo del formulario
jQuery(document).ready(function($) {
  $('.es-form-field-container').each(function() {
    var $form = $(this).closest('form');

    // Añadir la clase ulpgcds-form al formulario superior
    $form.addClass('ulpgcds-form');
    
    var cell = $(this).find('.gjs-cell')
      if (cell.length > 0){
        cell.addClass('ulpgcds-form__item');

        // Añado la clase modSize a los input
        var input = cell.find('input');
        input.css({'min-width': '100px', 'width': '-moz-available'});
      }


    // Legal Checkbox - Transformar el campo .es_gdpr si existe
    var gdprDiv = $(this).find('.es_gdpr');
    if (gdprDiv.length > 0) {
      var checkboxInput = gdprDiv.find('input[type="checkbox"]');
      var label = gdprDiv.find('label');
      var link = label.find('a');

      // Obtiene el id del label original (añadido manualmente en el editor)
      var labelId = label.attr('id');
      if (!labelId || labelId.trim() === '')
        console.error('Error: El Lavel del Legal Checkbox no tiene ID ('+ labelId+')');

      // Añadir el nuevo div y con el contenido original
      var newDiv = $('<div class="es_gdpr ulpgcds-form__item--checkbox"></div>').append(checkboxInput).append(label);

      // Asignar el id obtenido del label original al (id input) y (for label), y elimina el id del label
      newDiv.find('input[type="checkbox"]').attr('id', labelId);
      newDiv.find('label').attr('for', labelId).removeAttr('id');

      link.css({'display': 'inline-block', 'background': 'none', 'padding': '0'});
      checkboxInput.css({'display': 'inline-block', 'position': 'absolute'});

      gdprDiv.replaceWith(newDiv);
    }


    // btn Submit - Agregar la clase ulpgcds-btn y ulpgcds-btn--primary al input submit
    var submitInput = $(this).find('input[type="submit"]');
    if (submitInput.length > 0){
      submitInput.addClass('ulpgcds-btn ulpgcds-btn--primary');

      // Elimina la clase ulpgcds-form__item del padre inmediato (gjs-cell)
      var parentCell = submitInput.parent('.gjs-cell');
      if (parentCell.length > 0)
        parentCell.removeClass('ulpgcds-form__item');
    }


    // Lista Select
    var selectContainer = $(this).find('.es-list');
    if (selectContainer.length > 0) {
      // Subir al padre más cercano .gjs-cell
      var cell = selectContainer.closest('.gjs-cell');

      // Obtener la información necesaria del contenedor original
      var selectLabel = cell.find('.es-field-label').text().trim();
      var selectOptions = selectContainer.find('span').map(function() {
        var checkbox = $(this).prev();
        return '<option value="' + checkbox.val() + '" type="checkbox" class="' + checkbox.attr('class') + '" name="' + checkbox.attr('name') + '">' + $(this).text().trim() + '</option>';
      }).get().join('');

      // Obtener el ID del contenedor original
      var containerId = cell.attr('id');
      if (!containerId || containerId.trim() === '')
        console.error('Error: La Lista/Select no tiene ID');

      // Añade las clases y quita el id del contenedor
      cell.addClass('ulpgcds-form__item ulpgcds-form__item--type-select');
      cell.removeAttr('id');

      // Construir el HTML del nuevo campo de lista select
      var selectHtml = '<label for="' + containerId + '" class="es-field-label">' + selectLabel + '</label>' +
        '<select id="' + containerId + '">' +
        '<option value="">Elija su perfil de usuario</option>' +
        selectOptions +
        '</select>';

      // Limpiar el contenido dentro de la .gjs-cell y agregar el nuevo campo de lista select
      cell.empty().append(selectHtml);
    }


    // Eliminar gjs-row, gjs-cell y gjs-row vacíos
    $('.gjs-row:empty, .gjs-cell:empty, .es_gdpr:empty').each(function() {
      $(this).remove();
    });

  });
});
