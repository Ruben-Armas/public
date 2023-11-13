// Seleccionar cada contenedor de campo del formulario
jQuery(document).ready(function($) {
  $('.es-form-field-container').each(function() {
    // Añadir el formulario y la clase ulpgcds-form
    $(this).prepend('<form class="ulpgcds-form"></form>');

    // Recorrer cada campo en el contenedor actual
    $(this).children().each(function() {
      var $element = $(this);
      var $form = $element.closest('.es-form-field-container').find('.ulpgcds-form');

      if ($element.is('.gjs-row')) {
        var cell = $element.children('.gjs-cell')
        if (cell.length > 0) cell.addClass('ulpgcds-form__item').appendTo($form);
      } else if ($element.is('.gjs-cell, p')) {
        $element.addClass('ulpgcds-form__item').appendTo($form);  // Suficiente para el inputText
      }

    });


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

      // Añadir el nuevo div y preservar el contenido original
      var newDiv = $('<div class="es_gdpr ulpgcds-form__item ulpgcds-form__item--checkbox"></div>').append(checkboxInput).append(label);

      // Asignar el id obtenido del label original al (id input) y (for label), y elimina el id del label
      newDiv.find('input[type="checkbox"]').attr('id', labelId);
      newDiv.find('label').attr('for', labelId).removeAttr('id');

      // Cambia el CSS
      link.css({'display': 'inline-block', 'background': 'none', 'padding': '0'});

      // Reemplazar el div .es_gdpr original con el nuevo div
      gdprDiv.replaceWith(newDiv);
    }


    // btn Submit - Agregar la clase ulpgcds-btn y ulpgcds-btn--primary al input submit
    var submitInput = $(this).find('input[type="submit"]');
    if (submitInput.length > 0)
      submitInput.addClass('ulpgcds-btn ulpgcds-btn--primary');


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
