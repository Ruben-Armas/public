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
      /*
      // Verifica si col-4 existe
      var col4 = $(this).find(".col-4");

      if (col4.length) {
        // Encuentra el contenido del <a> dentro de .col-4
        var col4Content = col4.find("a").html();
      
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
          //$(this).append("<a href='#'>" + col4Content/*.prop('outerHTML')*//* + col8Content + "</a>");
          $(this).append(col4Content/*.prop('outerHTML')*//* + col8Content );
        }
      }*/

      // Encuentra los elementos .col-4 y .col-8 dentro de .ulpgcds-article
      var col4 = $(this).find(".col-4");
      var col8 = $(this).find(".col-8");

      // Si ambos elementos existen
      if (col4.length && col8.length) {
        // Encuentra la imagen dentro de .col-4 y extrae la URL de la imagen y el alt
        var imgFigure = col4.find(".figure");
        var imgSrc = col4.find(".list_img").attr("src");
        var imgAlt = col4.find(".list_img").attr("alt");

        // Encuentra el link
        var listLink = col4.find(".list_link").attr("href");

        // Encuentra el título dentro de .col-8 y extrae su contenido
        var title = col8.find(".list_title").html();
        // Encuentra la fecha dentro de .col-8 y extrae su contenido
        var date = col8.find(".ulpgcds-article__date").html();
        // Encuentra el contenido dentro de .col-8 y extrae su contenido
        var content = col8.find(".list_content").html();

        // Elimina .col-4
        col4.remove();
        // Elimina .col-8
        col8.remove();

        // Modifica las clases de .ulpgcds-article
        $(this).removeClass('row');
        //$(this).addClass('ulpgcds-article--modified');
        // Elimina el atributo style
        $(this).removeAttr('style');

        // Construye el nuevo HTML y lo reemplaza en .ulpgcds-article
        $(this).html(`
          <a class='list_link' href='${listLink}'>
            <figure><img class='list_img' alt='${imgAlt}' src='${imgSrc}' /></figure>
            <h3 class='list_title'>${title}</h3>
            <div class="ulpgcds-article__date">${date}</div>
          </a>
          <p class='list_content'>${content}</p>
        `);
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