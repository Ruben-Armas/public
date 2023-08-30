document.addEventListener('DOMContentLoaded', function(e){

    jQuery.validator.addMethod('IPv4Checker', function(value) {
            var ip = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
            return value.match(ip);
        },
        'Invalid IPv4 address'
    );

    var validator = jQuery('#iuma_members_setting').validate({
        rules: {
            'iuma_plugin_members[db_ip]': {
                required: true,
                IPv4Checker: true
            },
            'iuma_plugin_members[db_port]': {
                required: true,
                digits: true
            },
            'iuma_plugin_members[db_name]': {
                required: true
            },
            'iuma_plugin_members[db_user]': {
                required: true
            },
            'iuma_plugin_members[db_passwd]': {
                required: true
            }
        }
    });

    jQuery('#iuma_members_setting').submit(function(e){
        if (!validator.valid()) {
            e.preventDefault();
        }
    });
});