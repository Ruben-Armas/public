<div class="wrap">
    <h1> IUMA Members </h1>
    <?php settings_errors(); ?>
    
    <form id="iuma_members_setting" method="post" action="options.php">
        <?php
            settings_fields( 'iuma_plugin_members_settings' );
            do_settings_sections( 'iuma_members' );
            submit_button();
        ?>
    </form>    
</div>
