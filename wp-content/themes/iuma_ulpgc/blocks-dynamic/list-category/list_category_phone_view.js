// Variable de estado para almacenar el estado anterior de isMobileWidth
let wasMobile = false;

// Función para verificar si la pantalla es de ancho móvil
function isMobileWidth() {
  return window.innerWidth <= 768; // Aquí puedes ajustar el ancho de pantalla que consideras móvil.
}

// Función para aplicar las transformaciones según el ancho de pantalla
function adjustContent() {
  console.log('adjustContent');
  const isCurrentlyMobile = isMobileWidth();

  if (isCurrentlyMobile  && !wasMobile) {
    console.log('---isMobileWidth---');
    // Selecciona todos los elementos con la clase .ulpgcds-article
    $(".ulpgcds-article").each(function() {

      // Verifica si col-4 existe
      var col4 = $(this).find(".col-4");

      if (col4.length) {
        // Encuentra el contenido del <a> dentro de .col-4
        var col4Content = $col4.find("a").html();
      
        // Verifica si col-8 existe
        var col8 = $(this).find(".col-8");

        if (col8.length) {
          // Encuentra el elemento .col-8 dentro de .ulpgcds-article y extrae su contenido
          var col8Content = col8.html();
        
          // Elimina .col-4
          $(this).find(".col-4").remove();  
          // Elimina .col-8
          $(this).find(".col-8").remove();
          
          // Agrega el contenido de col-8 con la imagen a .ulpgcds-article
          $(this).append("<a href='#'>" + col4Content.prop('outerHTML') + col8Content + "</a>");
        }
      }
    })
  }

  // Actualiza el estado anterior
  wasMobile = isCurrentlyMobile;
}

// Llama a la función cuando el documento esté completamente cargado
$(document).ready(function() {
  adjustContent();
});

// Escucha cambios en el tamaño de la ventana para ajustar el contenido cuando sea necesario.
$(window).resize(adjustContent);