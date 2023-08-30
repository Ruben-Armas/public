<div class="wrap">
    <h1> IUMA Custom SQL Table </h1>
    <?php settings_errors(); ?>
    
    <form id="iuma_cst_setting" method="post" action="options.php">
        <?php
            settings_fields( 'iuma_plugin_cst_settings' );
            do_settings_sections( 'iuma_cst' );
            submit_button();
        ?>
    </form>    
</div>
