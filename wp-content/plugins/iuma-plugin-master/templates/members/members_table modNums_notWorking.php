<div>
  <?php
    /**
     * The table showing members
     *
     * @package IUMAPlugin
     */

    /** @var string[] $attr contains the attributes entered at the shortcode. */

    $options = get_option( 'iuma_plugin_members' );
    
    $host = $options['db_ip'].':'.$options['db_port'];
    $user = $options['db_user'];
    $db_name = $options['db_name'];
    $passwd = $options['db_passwd'];
    $division = strtoupper((isset($attr['division']) ? $attr['division'] : "all"));
    //echo $division;
    $show_email = (isset($options['show_email']) ? ($options['show_email'] ? true : false) : false );
    $show_job_position = (isset($options['show_job_position']) ? ($options['show_job_position'] ? true : false) : false );
    $show_phone = (isset($options['show_phone']) ? ($options['show_phone'] ? true : false) : false );
    $show_contact = (isset($options['show_contact']) ? ($options['show_contact'] ? true : false) : false );

    // Database connection and SQL query
    $mydb = new wpdb($user, $passwd, $db_name, $host);
      
    if ($division != "ALL")
      // $query = $mydb->prepare("SELECT * FROM miembros_iuma WHERE division=%s", $division);
      $query = $mydb->prepare("SELECT CONCAT((IF(esDr=1 AND sexo='M','Dra. ',(IF (esDr=1 and sexo='H', 'Dr. ','')))), nombre) AS nombre, apellido1, apellido2, cargo, email,
      (SELECT categorias.descripcion FROM categorias WHERE categorias.codigo=miembros_iuma.categoria) AS TipoMiembro,
      (SELECT categorias_ulpgc.descripcion FROM categorias_ulpgc WHERE categorias_ulpgc.codigo=catULP) AS Categoria,
      CONCAT(division,' - ',(SELECT division.descripcion FROM division WHERE division.codigo=division)) AS division, telefono_despacho, despacho
      FROM miembros_iuma
      left join categorias ON  categorias.codigo=miembros_iuma.categoria
      left join categorias_ulpgc ON categorias_ulpgc.codigo=miembros_iuma.catULP
      WHERE activo=1 AND division=%s ORDER BY  categorias.orden, categorias_ulpgc.orden, apellido1, apellido2", $division);
		else 
      //  $query = $mydb->prepare("SELECT * FROM miembros_iuma");
      $query = $mydb->prepare("SELECT CONCAT((IF(esDr=1 AND sexo='M','Dra. ',(IF (esDr=1 and sexo='H', 'Dr. ','')))), nombre) AS nombre, apellido1, apellido2, cargo, email,
      (SELECT categorias.descripcion FROM categorias WHERE categorias.codigo=miembros_iuma.categoria) AS TipoMiembro,
      (SELECT categorias_ulpgc.descripcion FROM categorias_ulpgc WHERE categorias_ulpgc.codigo=catULP) AS Categoria,
      CONCAT(division,' - ',(SELECT division.descripcion FROM division WHERE division.codigo=division)) AS division, telefono_despacho, despacho
      FROM miembros_iuma
      left join categorias ON  categorias.codigo=miembros_iuma.categoria
      left join categorias_ulpgc ON categorias_ulpgc.codigo=miembros_iuma.catULP
      WHERE activo=1 ORDER BY  categorias.orden, categorias_ulpgc.orden, apellido1, apellido2");

		
      $query_result = $mydb->get_results($query);
      $mydb->close();

      if (empty($query_result) || count($query_result) == 0){
          //echo "<h3>No se ha podido conectar a la Base de Datos</h3>";
          return;
      }

      // Preparing data for table visualization
      $members = array();
      foreach ($query_result as $member)
      {			
        $to_insert = array();			
        $to_insert['Nombre y Apellidos'] = "$member->nombre $member->apellido1 $member->apellido2" ;
        $to_insert['Categoría'] = $member->TipoMiembro;
          if ($show_email)
            $to_insert['Email'] = do_shortcode("[eeb_protect_emails] $member->email [/eeb_protect_emails]");
          if ($show_job_position)
            $to_insert['Cargo'] = $member->cargo;
          if ($show_phone)
            $to_insert['Teléfono'] = do_shortcode("[eeb_protect_content] $member->telefono_despacho [/eeb_protect_content]");
          if ($show_contact)
            $to_insert['Contacto'] = do_shortcode("[eeb_protect_emails] <a href='mailto:$member->email'><img style='display: block;margin: auto;' border='0' alt='Contacto' src='https://www.iuma.ulpgc.es/wp-content/uploads/2021/01/envelope.svg'></a>[/eeb_protect_emails]");
    
          array_push($members, $to_insert);
      }
  ?>
	
  <div class="container">
    <!--<table id="iuma-members-table" class="display">
    <table id="iuma-members-table" class="tablesaw-columntoggle" data-tablesaw-mode="columntoggle">-->
    <!--<table id="iuma-members-table" class="tablesaw" data-tablesaw-mode="stack">-->
    <table class="tablesaw custom-member-table" data-tablesaw-mode="stack">
      <thead>
        <tr>
          <?php
            foreach (array_keys($members[0]) as $keys)
            {
              echo "<th>$keys</th>";
            }
          ?>
        </tr>
      </thead>
      <tbody>
        <?php
          foreach ($members as $key => $member)
          {   
            echo "<tr>";
            foreach ($member as $key => $value)
            {
              echo "<td> $value </td>";
            }
            echo "</tr>";
    
          }
        ?>
      </tbody>
    </table>
    <nav aria-label="Paginación" class="ulpgcds-pager">
      <ul class="paginationCustom"></ul>
    </nav>

  </div>
  
  <script>
    $(document).ready(function() {
      // Busca e inicializa todas las tablesaw con la clase 'custom-member-table'
      $('.custom-member-table').each(function() {
        var myTable = $(this);
        initializeTable(myTable);
      });
    });
    
    var rowsPerPage = 5; // Número de filas por página

    function initializeTable(myTable) {
      var actualPage = 1;   // Estado actual de la página
      var totalPages = Math.ceil(myTable.find('tbody tr').length / rowsPerPage); // Total de páginas
      //var pagination = $('.paginationCustom');  // Inicializa la paginación
      var pagination = $(myTable).siblings('.ulpgcds-pager').find('.paginationCustom');  // Inicializa la paginación      
      
      // Genera los enlaces numéricos
      // Agrega enlace "Anterior"
      pagination.append(
        '<li class="ulpgcds-pager__item ulpgcds-pager__item--prev">' +
          '<a class="pagination__link page_a" href="#" data-page_a="'+(actualPage -1)+'" title="Ir a la página anterior" aria-disabled="true">' +
            '<span class="visually-hidden">Anterior</span>' +
          '</a>' +
        '</li>'
      );

      // Agrega enlaces numéricos
      if (totalPages <= 5) {
        for (var i = 1; i <= totalPages; i++) {
          pagination.append(
            '<li class="ulpgcds-pager__item ' + (i === actualPage ? 'ulpgcds-pager__item--is-active' : '') + '">' +
              '<a class="pagination__link page_a" href="#" data-page_a="'+i+'" title="Ir a la página '+i+'">' +i+ '</a>' +
            '</li>'
          );
        }
      } else {
        var startRange = Math.max(1, actualPage - 2);
        var endRange = Math.min(totalPages, startRange + 4);

        if (actualPage > 3) {
          pagination.append('<li class="ulpgcds-pager__item"><a class="pagination__link page_a" href="#" data-page_a="1">1</a></li>');
          pagination.append('<li class="ulpgcds-pager__item">...</li>');
        }

        for (var i = startRange; i <= endRange; i++) {
          pagination.append(
            '<li class="ulpgcds-pager__item ' + (i === actualPage ? 'ulpgcds-pager__item--is-active' : '') + '">' +
              '<a class="pagination__link page_a" href="#" data-page_a="'+i+'" title="Ir a la página '+i+'">' +i+ '</a>' +
            '</li>'
          );
        }

        if (actualPage < totalPages - 2) {
          pagination.append('<li class="ulpgcds-pager__item">...</li>');
          pagination.append('<li class="ulpgcds-pager__item"><a class="pagination__link page_a" href="#" data-page_a="'+totalPages+'">'+totalPages+'</a></li>');
        }
      }

      // Agrega enlace "Siguiente"
      pagination.append(
        '<li class="ulpgcds-pager__item ulpgcds-pager__item--next">' +
          '<a class="pagination__link page_a" href="#" data-page_a="'+(actualPage +1)+'" title="Ir a la página siguiente" aria-disabled="false">' +
            '<span class="visually-hidden">Siguiente</span>' +
          '</a>' +
        '</li>'
      );
      
      // Muestra la primera página y oculta las demás filas
      showPage(myTable, actualPage);


      // Manejador de eventos para cambiar de página
      pagination.on('click', '.page_a', function(e) {
        console.log(actualPage);
        e.preventDefault();
        actualPage = $(this).data('page_a');
        console.log("actualPage "+actualPage);

        // Muestra la nueva página
        showPage(myTable, actualPage);

        // Actualiza los controles de los enlaces
        updateControls(pagination, totalPages, actualPage);
        updateDOMCss(pagination);
      });
    }

    // Función para mostrar una página específica
    function showPage(myTable, page) {
      // Oculta todas las filas
      myTable.find('tbody tr').hide();
      // Muestra solo las filas de la página actual
      var inicio = (page - 1) * rowsPerPage;
      var fin = inicio + rowsPerPage;
      myTable.find('tbody tr').slice(inicio, fin).show();
    }

    function updateControls(pagination, totalPages, actualPage) {
      // Actualiza la propiedad aria-disabled en los controles previo/siguiente
      var isDisabledPrev = actualPage === 1;
      var isDisabledNext = actualPage === totalPages;
      pagination.find('.ulpgcds-pager__item--prev a').attr('aria-disabled', isDisabledPrev.toString());
      pagination.find('.ulpgcds-pager__item--next a').attr('aria-disabled', isDisabledNext.toString());

      // Actualiza los valores de data-page_a en los controles previo/siguiente
      pagination.find('.ulpgcds-pager__item--prev a').data('page_a', actualPage - 1);
      pagination.find('.ulpgcds-pager__item--next a').data('page_a', actualPage + 1);


      // Elimina la clase 'ulpgcds-pager__item--is-active' de todos los elementos
      pagination.find('.ulpgcds-pager__item').removeClass('ulpgcds-pager__item--is-active');

      // Busca el elemento con data-page_a igual a actualPage, pero que no sea "Anterior" ni "Siguiente"
      var paginaElement = pagination.find('.page_a').filter(function() {
        return !$(this).parent().hasClass('ulpgcds-pager__item--prev') && !$(this).parent().hasClass('ulpgcds-pager__item--next') && $(this).data('page_a') == actualPage;
      });
      // Agrega la clase 'ulpgcds-pager__item--is-active' al elemento encontrado
      paginaElement.parent().addClass('ulpgcds-pager__item--is-active');
    }

    function updateDOMCss(pagination){
      // Forzar un repintado del DOM
      pagination.css('display', 'none');
      pagination.height(); // Esto fuerza el repintado
      pagination.css('display', 'block');
    }
  </script>
</div>
