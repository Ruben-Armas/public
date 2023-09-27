// Variable de estado para almacenar el estado anterior de isMobileWidth y isPortraitWidth
let wasMobile = false;
let wasPortrait = false;

// Función para verificar si la pantalla es de ancho móvil
function isMobileWidth() {
  return window.innerWidth <= 719;
}

// Función para aplicar las transformaciones según el ancho de pantalla
function adjustContent() {
  console.log('adjustContent');
  const isCurrentlyMobile = isMobileWidth();
  const isCurrentlyPortrait = !isMobileWidth();

  if (isCurrentlyMobile  && !wasMobile) {
    console.log('---Mobile---');
    // Selecciona todos los elementos con la clase .list_category_item
    $(".list_category_item").each(function() {
      // Encuentra los elementos .col-4 y .col-8 dentro de .ulpgcds-article
      var col4 = $(this).find(".col-img");
      var col8 = $(this).find(".col-content");

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
        $(this).removeClass('container_row');
        // Elimina el atributo style
        //$(this).removeAttr('style');

        // Construye el nuevo HTML y lo reemplaza en .ulpgcds-article
        $(this).html(`
          <article class='ulpgcds-article ulpgcds-article--short'>
            <a class='list_link' href='${listLink}'>
              <figure class='mobile_figure_img'>
                <img class='list_img' alt='${imgAlt}' src='${imgSrc}' />
              </figure>
              <h3 class='list_title'>${title}</h3>
              <div class="ulpgcds-article__date">${date}</div>
            </a>
            <p class='list_content'>${content}</p>
          </article>
        `);
      }
    })
  }  

  if (isCurrentlyPortrait  && !wasPortrait) {
    // Selecciona todos los elementos con la clase .list_category_item
    $(".list_category_item").each(function() {

      // Encuentra los elementos .col-4 y .col-8 dentro de .ulpgcds-article
      var col4 = $(this).find(".col-img");
      var col8 = $(this).find(".col-content");

      // Si ambos elementos existen
      if (!col4.length && !col8.length) {
        // Contenedor <a>
        var containerA = $(this).find(".list_link");
        // Contenedor <p> del contenido
        var containerP = $(this).find(".list_content");

        // Encuentra el link
        var listLink = containerA.find(".list_link").attr("href");

        // Encuentra la imagen dentro de .col-4 y extrae la URL de la imagen y el alt
        var imgFigure = containerA.find(".figure");
        var imgSrc = containerA.find(".list_img").attr("src");
        var imgAlt = containerA.find(".list_img").attr("alt");

        // Encuentra el título
        var title = containerA.find(".list_title").html();
        // Encuentra la fecha
        var date = containerA.find(".ulpgcds-article__date").html();

        // Encuentra el contenido
        var content = $(this).find(".list_content").html();

        // Elimina el <a> y su contenido
        containerA.remove();
        // Elimina el <p> y su contenido
        containerP.remove();

        // Modifica las clases de .ulpgcds-article
        $(this).addClass('container_row');
        //$(this).addClass('row resize_article_row');

        // Construye el nuevo HTML y lo reemplaza en .ulpgcds-article
        $(this).html(`
          <article class='ulpgcds-article ulpgcds-article--short row resize_article_row'>
            <div class='col-4 col-img'>
              <a class='list_link' href='${listLink}'>
                <figure>
                  <img class='list_img' alt='${imgAlt}' src='${imgSrc}' />
                </figure>
            </div>
            <div class='col-8 col-content'>
              <a class='list_link' href='${listLink}'>
                <h3 class='list_title'>${title}</h3>
                <div class="ulpgcds-article__date">${date}</div>
              </a>
              <p class='list_content'>${content}</p>
            </div>
          </article>
        `);
      }
    })
  }

  // Actualiza el estado anterior
  wasMobile = isCurrentlyMobile;
  wasPortrait = isCurrentlyPortrait;
}

// Llama a la función cuando el documento esté completamente cargado
$(document).ready(function() {
  adjustContent();
});

// Escucha cambios en el tamaño de la ventana para ajustar el contenido cuando sea necesario.
$(window).resize(adjustContent);