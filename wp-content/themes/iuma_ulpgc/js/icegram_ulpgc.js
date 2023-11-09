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
  });
});
