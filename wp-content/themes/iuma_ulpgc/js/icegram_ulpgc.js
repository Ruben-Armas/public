// Seleccionar cada contenedor de campo del formulario
console.log('¡El script se ha cargado correctamente!');

jQuery(document).ready(function($) {
  $('.es-form-field-container').each(function() {
    // Añadir el formulario y la clase ulpgcds-form
    $(this).prepend('<form class="ulpgcds-form"></form>');

    // Recorrer cada campo en el contenedor actual
    $(this).find('.gjs-row').each(function() {
      // Añadir la clase ulpgcds-form__item a la celda
      $(this).find('.gjs-cell').addClass('ulpgcds-form__item');

      // Mover el campo al formulario
      $(this).appendTo($(this).closest('.es-form-field-container').find('.ulpgcds-form'));
    });

    // Transformar el campo .es_gdpr si existe
    var gdprDiv = $(this).find('.es_gdpr');
    if (gdprDiv.length > 0) {
      var checkboxInput = gdprDiv.find('input[type="checkbox"]');
      var label = gdprDiv.find('label');
      var link = label.find('a');

      // Obtener el id del label original
      var labelId = label.attr('id');

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

    // Agregar la clase ulpgcds-btn y ulpgcds-btn--primary al input submit
    $(this).find('input[type="submit"]').addClass('ulpgcds-btn ulpgcds-btn--primary');
  });
});
