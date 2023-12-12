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
    <!--<table id="iuma-members-table" class="display">-->
    <!--<table class="tablesaw-columntoggle custom-member-table" data-tablesaw-mode="columntoggle">
    <table class="tablesaw-sortable custom-member-table" data-tablesaw-mode="sortable">-->
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
              if (is_numeric($value) || preg_match('/\d{4,}/', $value))
                $align = 'class="table-members-align-right"';
              else
                $align = '';

              echo "<td $align> $value </td>";
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
</div>
