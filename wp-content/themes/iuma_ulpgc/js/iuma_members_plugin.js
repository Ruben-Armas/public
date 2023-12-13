jQuery(document).ready(function() {
  // Busca e inicializa todas las tablesaw con la clase 'custom-member-table'
  $('.custom-member-table').each(function() {
    var myTable = $(this);

    // Verifica si tiene algún ancestro con la cantidad de filas por pagina
    var maxRows = getMaxRowsValue(myTable); // Más cercano sin límite
    //var maxRows = getMaxRowsValueLimited(myTable, 3);  // Busca hasta un límite

    initializeTable(myTable, maxRows);
  });
});

// Busca la cantidad de filas por pagina definida en el bloque, o por defecto
function getMaxRowsValue(table) {
  // Busca el elemento más cercano con la clase y el atributo especificados
  var parentBlock = table.closest('.wp-block-table-members-block-my-block[data-members-maxrows]');

  if (parentBlock.length > 0)
    maxRows = parseInt(parentBlock.attr('data-members-maxrows'), 10);
  else
    maxRows = 5;  // Por defecto

  return maxRows;
}
// Busca la cantidad de filas del bloque, hasta un nº de jerarquía máximo, o por defecto
function getMaxRowsValueLimited(table, maxParents) {
  var currentElement = table;

  // Busca el elemento hasta un limite
  for (var i = 0; i < maxParents; i++) {
    currentElement = currentElement.parent();

    if (currentElement.hasClass('wp-block-table-members-block-my-block') && currentElement.attr('data-members-maxrows')) {
      return parseInt(currentElement.attr('data-members-maxrows'), 10);
    }
  }

  return 5; // Por defecto
}


function initializeTable(myTable, rowsPerPage) {
  var actualPage = 1;   // Estado actual de la página
  var totalPages = Math.ceil(myTable.find('tbody tr').length / rowsPerPage); // Total de páginas
  var totalRecords = myTable.find('tbody tr').length; // Total de registros
  var pagination = $(myTable).siblings('.ulpgcds-pager.paginationCustom');  // Inicializa la paginación      
  
  // Genera los enlaces numéricos
  generateNumericLinks(myTable, pagination, totalRecords, totalPages, actualPage, rowsPerPage);
  
  // Muestra la primera página y oculta las demás filas
  showPage(myTable, actualPage, rowsPerPage);

  // Manejador de eventos para cambiar de página
  pagination.on('click', '.page_a', function(e) {
    e.preventDefault();
    actualPage = $(this).data('page_a');

    // Genera los enlaces numéricos
    generateNumericLinks(myTable, pagination, totalRecords, totalPages, actualPage, rowsPerPage);

    // Muestra la nueva página
    showPage(myTable, actualPage, rowsPerPage);
  });
}

// Función para mostrar una página específica
function showPage(myTable, page, rowsPerPage) {
  // Oculta todas las filas
  myTable.find('tbody tr').hide();
  // Muestra solo las filas de la página actual
  var inicio = (page - 1) * rowsPerPage;
  var fin = inicio + rowsPerPage;
  myTable.find('tbody tr').slice(inicio, fin).show();
}

// Función para generar los enlaces numéricos
function generateNumericLinks(myTable, pagination, totalRecords, totalPages, actualPage, rowsPerPage) {
  // Si no hay más paǵinas, no muestra la paginación
  if (totalRecords <= rowsPerPage) return;

  // Limpia la paginación actual
  pagination.empty();
  var paginationContent = "";

  console.log("t "+totalRecords+" - a "+rowsPerPage);
  // Pagination Info
  paginationContent +='<div class="ulpgcds-pager__results">'+showPaginationInfo(myTable, actualPage, totalRecords, rowsPerPage)+'</div>';  

  // Agrega enlace "Anterior"
  var disabledPrev = actualPage > 1 ? 'false' : 'true';
  paginationContent +=
    '<ul>' +
      '<li class="ulpgcds-pager__item ulpgcds-pager__item--prev">' +
        '<a class="pagination__link page_a" href="#" data-page_a="'+(actualPage -1)+'" title="Ir a la página anterior" aria-disabled="'+disabledPrev+'">' +
          '<span class="visually-hidden">Anterior</span>' +
        '</a>' +
      '</li>';  

  // Agrega enlaces numéricos
  if (totalPages <= 5) {
    for (var i = 1; i <= totalPages; i++) {
      paginationContent +=
        '<li class="ulpgcds-pager__item ' + (i === actualPage ? 'ulpgcds-pager__item--is-active' : '') + '">' +
          '<a class="pagination__link page_a" href="#" data-page_a="'+i+'" title="Ir a la página '+i+'">' +i+ '</a>' +
        '</li>';      
    }
  } else {
    var startRange = Math.max(1, actualPage - 2);
    var endRange = Math.min(totalPages, startRange + 4);

    if (actualPage > 3) {
      paginationContent += '<li class="ulpgcds-pager__item"><a class="pagination__link page_a" href="#" data-page_a="1">1</a></li>';
      paginationContent += '<li class="ulpgcds-pager__item">...</li>';
    }

    for (var i = startRange; i <= endRange; i++) {
      paginationContent +=
        '<li class="ulpgcds-pager__item ' + (i === actualPage ? 'ulpgcds-pager__item--is-active' : '') + '">' +
          '<a class="pagination__link page_a" href="#" data-page_a="'+i+'" title="Ir a la página '+i+'">' +i+ '</a>' +
        '</li>';      
    }

    if (actualPage < totalPages - 2) {
      paginationContent += '<li class="ulpgcds-pager__item">...</li>';
      paginationContent += '<li class="ulpgcds-pager__item"><a class="pagination__link page_a" href="#" data-page_a="'+totalPages+'">'+totalPages+'</a></li>';
    }
  }

  // Agrega enlace "Siguiente"
  var disabledNext = actualPage < totalPages ? 'false' : 'true';
  paginationContent +=
      '<li class="ulpgcds-pager__item ulpgcds-pager__item--next">' +
        '<a class="pagination__link page_a" href="#" data-page_a="'+(actualPage +1)+'" title="Ir a la página siguiente" aria-disabled="'+disabledNext+'">' +
          '<span class="visually-hidden">Siguiente</span>' +
        '</a>' +
      '</li>' +
    '</ul>';


  // Agrega el contenido al contenedor
  pagination.append(paginationContent);
}
function showPaginationInfo(myTable, actualPage, totalRecords, rowsPerPage){
  var totalRecords = myTable.find('tbody tr').length;
  var startRecord = Math.min((actualPage - 1) * rowsPerPage + 1, totalRecords);
  var endRecord = Math.min(actualPage * rowsPerPage, totalRecords);
  return 'Mostrando del '+startRecord+' al '+endRecord+' de un total de '+totalRecords+' registros';
}