<html lang="es">
<head>
    <meta charset="utf-8">
    <title><?php wp_title(); ?></title>

    <!--jquery-->
	<script src="https://www2.ulpgc.es/js/jquery-latest.js"></script>

	<!--ulpgc style-->
	<link rel="stylesheet" type="text/css" href="https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css" media="all" />
    <!--table-->
    <link rel="stylesheet" href="https://designsystem.ulpgc.es/code/tablesaw/tablesaw.css">
	<!--carrusel-->
	<link rel="stylesheet" type="text/css" href="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.css"/>
	<!--ORIGINAL CON ERRORES<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.min.js"></script>-->
	<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/slick/slick.js"></script>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>		
    <!--ulpgc style-->
	<!--jquery MOVIDO AL PRINCIPIO<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>-->
	<script type="text/javascript" src="https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js?v=1.0"></script>
    <!--table-->
    <script src="https://designsystem.ulpgc.es/code/tablesaw/tablesaw.jquery.js"></script>
    <script src="https://designsystem.ulpgc.es/code/tablesaw/tablesaw-init.js"></script>

    <?php wp_body_open(); ?>
    <header class="ulpgcds-header">

        <div class="ulpgcds-header__top">		
            <div class="ulpgcds-header__top__logo">
            <a href="https://www.ulpgc.es" target="_blank"><span>ULPGC</span></a>
            <a href="/"><span>Nombre unidad</span></a>
            </div>    
            <div class="ulpgcds-header__top__links">              
                <ul>
                    <li class="hidden-mobile"><a href="https://correo.ulpgc.es/" class="ulpgcds-btn ulpgcds-btn--text"><span class="ulpgcds-btn__icon ulpgcds-icon-envelope" aria-hidden="true"></span>Link 1</a></li>
                    <li class="hidden-mobile"><a href="https://biblioteca.ulpgc.es" class="ulpgcds-btn ulpgcds-btn--text"><span class="ulpgcds-btn__icon ulpgcds-icon-book" aria-hidden="true"></span>Link 2</a></li>                    
                    <li><a href="/" class="ulpgcds-btn ulpgcds-btn--small ulpgcds-btn--primary"><span class="ulpgcds-btn__icon ulpgcds-icon-user" aria-hidden="true"></span>Login</a></li>
                    <li><a class="nav-toggle hidden-desktop ulpgcds-btn ulpgcds-btn--small ulpgcds-btn--secondary" href="#"><span class="ulpgcds-btn__icon ulpgcds-icon-menu" aria-hidden="true"></span>Menú</a></li>
                </ul>	                                                
            </div>
        </div>
        <?php get_ulpgc_header_nav_menus('HeaderMenu'); ?>

    </header>

