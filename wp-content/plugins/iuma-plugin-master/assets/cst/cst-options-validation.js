document.addEventListener('DOMContentLoaded', function(e){

    jQuery.validator.addMethod('IPv4Checker', function(value) {
            var ip = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
            return value.match(ip);
        },
        'Invalid IPv4 address'
    );

    jQuery.validator.addMethod('SQLChecker', function(value) {
            var sql_query = /(SELECT\s[\w\*\)\(\,\s]+\sFROM\s[\w]+)/i;
            return value.match(sql_query);
        },
        'Invalid SQL Query'
    );

    var validator = jQuery('#iuma_cst_setting').validate({
        rules: {
            'iuma_plugin_cst[db_ip]': {
                required: true,
                IPv4Checker: true
            },
            'iuma_plugin_cst[db_port]': {
                required: true,
                digits: true
            },
            'iuma_plugin_cst[db_name]': {
                required: true
            },
            'iuma_plugin_cst[db_user]': {
                required: true
            },
            'iuma_plugin_cst[db_passwd]': {
                required: true
            },
            'iuma_plugin_cst[db_sql_query]': {
                required: true,
                SQLChecker: true
            }
        }
    });

    jQuery('#iuma_cst_setting').submit(function(e){
        if (!validator.valid()) {
            e.preventDefault();
        }
    });
});
