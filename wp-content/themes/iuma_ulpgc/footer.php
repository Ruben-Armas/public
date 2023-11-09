<footer>
		<div class="ulpgcds-footer">       
			<div class="ulpgcds-footer__top wrapper">
				<div class="row">
					<div class="col-6">
						<div class="footer-logo">  </div>
						<div class="row">
							<div class="col-6">
								<h3>Datos de contacto</h3>
								<p>Tlf: <a href="tel:+34928451086">(+34) 928 451 086</a></p>
								<p>Email: <a href="mailto:iuma@iuma.ulpgc.es">iuma@iuma.ulpgc.es</a></p>
							</div>
							<div class="col-6">
								<h3>Dirección</h3>
								<p>Parque Científico Tecnológico</p>
								<p>35017 Las Palmas de Gran Canaria</p>
								<p>España</p>
								<p><a href="https://goo.gl/maps/A6gFbe3YqAazi8MX7">Ver en Google Maps</a></p>
							</div>      
						</div>                 
						<div class="ulpgcds-footer__social">
							<h3>Síguenos en</h3>
							<ul>
								<li class="twitter">
									<a href="https://twitter.com/iumanews" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-twitter"></i><span>Twitter</span></a>
								</li>
								<li class="facebook">
									<a href="https://www.facebook.com/IUMA.ulpgc" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-facebook"></i><span>Facebook</span></a>
								</li>
								<li class="youtube">
									<a href="https://www.youtube.com/channel/UC20M2ZeHe2kRCb8ltHeo2ZQ" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-youtube"></i><span>YouTube</span></a>
								</li>
								<li class="linkedin">
									<a href="https://www.linkedin.com/groups/1624607/" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-linkedin"></i><span>LinkedIn</span></a>
								</li>
								<li class="rdd">
									<a href="https://www.iuma.ulpgc.es/feed/" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-rss"></i><span>RSS</span></a>
								</li>
								<li class="git">
									<a href="https://git.iuma.ulpgc.es:8300/explore/projects" class="ulpgcds-btn ulpgcds-btn--ghost ulpgcds-btn--icon" target="_blank">
										<i class="ulpgcds-btn__icon ulpgcds-icon-git"></i><span>Git</span></a>
								</li>
							</ul>
						</div> 
					</div>
					<div class="col-6">
						<div class="row">
							<div class="col-6">
								<h3>Legal</h3>
								<ul>
                  <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('aviso-legal'))); ?>">Aviso legal</a></li>
									<!--<li><a href="https://www.ulpgc.es/">Política privacidad</a></li>-->
                  <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('cookies'))); ?>">Cookies</a></li>
                  <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('accesibilidad'))); ?>">Accesibilidad</a></li>
								</ul>
							</div>
							<div class="col-6">
								<h3>Servicios en línea</h3>
								<ul>
									<li><a href="https://webmail.iuma.ulpgc.es/">Correo IUMA</a></li>
									<li><a href="mailto:soporte@iuma.ulpgc.es">Soporte informático</a></li>
								</ul>    
							</div>
							<!--<div class="col-4">
								<h3>Otro bloque</h3>
								<ul>
									<li><a href="https://www.ulpgc.es/">Enlace 1</a></li>
									<li><a href="https://www.ulpgc.es/">Enlace 2</a></li>
									<li><a href="https://www.ulpgc.es/">Enlace 3</a></li>
								</ul>   
							</div>-->
						</div>
					</div>
				</div>     
			</div>

			<div class="ulpgcds-footer__medium">
				<div class="wrapper">
						<ul>
							<li class="europractice"><a href="http://www.europractice.com/" target="_blank">
								<span>Miembro de Europractice</span></a></li>
							<li class="mec_gobierno_canarias"><a href="https://portal.mineco.gob.es/es-es/Paginas/default.aspx" target="_blank">
								<span>Ministerio de economía, industria y competitividad. Gobierno de Canarias</span></a></li>
							<li class="inforegio"><a href="https://ec.europa.eu/regional_policy/en/funding/erdf/" target="_blank">
								<span>European Regional Development Fund</span></a></li>
							<li class="hipeac"><a href="https://www.hipeac.net/" target="_blank">
								<span>HIPEAC</span></a></li>
							<li class="nvidia"><a href="https://developer.nvidia.com/academia/centers/university-las-palmas-de-gran-canaria" target="_blank">
								<span>Centro de Investigación CUDA® por NVIDIA</span></a></li>
							<li class="heterogeneity"><a href="http://heterogeneityalliance.eu/" target="_blank">
								<span>Heterogeneity Alliance</span></a></li>
							<li class="red_riscv"><a href="http://red-riscv.org/" target="_blank">
								<span>Red-RISCV</span></a></li>
						</ul>
				</div>
			</div>

			<div class="ulpgcds-footer__bottom">
				<div class="wrapper">
					<p>© IUMA · Universidad de Las Palmas de Gran Canaria · ULPGC</p>             
				</div>
			</div>
		</div>

  <?php
    if (has_nav_menu('footer')) {
      wp_nav_menu(array(
        'theme_location' => 'footer',
        //'menu_class' => 'ulpgcds-footer',
        //'container' => 'div',
      ));
    }
    ?>

	</footer>
	<?php wp_footer(); ?>
</body>
</html>