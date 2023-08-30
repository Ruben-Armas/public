/**
 * This file is register in CustomSQLTableController with the name 'iuma_cst_view_script'
 */
document.addEventListener('DOMContentLoaded', function(e){
    $("#generate_view_settings").click( function(e) {
        e.preventDefault();

        hash_id = $("#hash_id").text().trim();
        grps = getCSTNewGroups();
        $.ajax({
            url : dcms_vars.ajaxurl,
            type: 'post',
            data: {
                action : 'dcms_ajax_cstview',
                hash : hash_id,
                data : grps
            },
            success: function(response){
                $('#cstViewOptions').html(response);
            }
        });
    });

    $('#db_fields').select2({ width: '100%' });
    $('#db_fields').on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);
        
        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

    var tableViewGroups = $('#cstTableViewGroups').DataTable( 
        {
            "ordering": false,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": true
        }
    );
    
    $('#cstTableViewGroups tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            tableViewGroups.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $("#add_button").on( 'click', function () {
        var fields = $('#db_fields').select2('data')
        
        var fieldsToTxt = [];
        var i;
        for (i=0; i < fields.length; i++)
            fieldsToTxt.push(fields[i].text);
        
        tableViewGroups.row.add( [
            $("#grp_name").val(),
            fieldsToTxt
        ] ).draw( false );
    } );

    $('#delete_row').click( function () {
        tableViewGroups.row('.selected').remove().draw( false );
    } );
});

/**
 * Obtain the view groups create in custom_table_view_config.php
 */
function getCSTNewGroups() {
    var array = [];
    var headers = [];
    $('#cstTableViewGroups th').each(function(index, item) {
        headers[index] = $(item).html();
    });
    $('#cstTableViewGroups tr').has('td').each(function() {
        var arrayItem = {};
        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
        });
        array.push(arrayItem);
    });

    return (array);
}
