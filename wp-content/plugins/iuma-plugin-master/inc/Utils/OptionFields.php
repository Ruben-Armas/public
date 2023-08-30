<?php
/**
 * @package IUMAPlugin
 */

namespace Inc\Utils;

/**
 * This class provides the option fields which can be used in order 
 * to generate a administration option page.
 */
class OptionFields
{
    /**
     * Generates a text field
     * 
     * @param args an array with provides the cofiguration of this text field
     *      - Mandatory arguments:
     *          - 'label_for': ID of the option field
     *          - 'option_name': Name of the option group
     *      - Optional argument:
     *          - 'class': This argument is used in order to assign a class name to the <input>
     *          - 'type': This argument specifies the input type: password, hidden or text. By default, it's text.
     *          - 'placeholder': Specifies a short hint that describes the expected value of an input field
     *          - 'value': Specifies a default value, If you don't use this option the default value 
     *                  is the current value in the database if it exists
     *          - 'idx': This argument is used to save data in array format. Is neccesary indicate the index value,
     *                  for instance, "[0]" (don't forget the brackets). It can be used as multidimensional: "[0]['Test']"
     */
    public static function textField( $args )
    {
        if (!isset($args['option_name'], $args['label_for']))
            return;
        
        $option_name = $args['option_name'];
        $name = $args['label_for'];
        $input = get_option( $option_name );
        $value = (isset($args['value']) ? $args['value'] : (isset($input[$name]) ? $input[$name] : ''));
        $type = (isset($args['type']) ? $args['type'] : 'text');
        $placeholder = (isset($args['placeholder']) ? $args['placeholder'] : '');
        $array_idx = (isset($args['idx']) ? $args['idx'] : "");

        echo '<input type="'.$type.'" class="regular-text" id="' . $name . '" name="' . $option_name . '[' . $name . ']'.$array_idx.'" value="' . $value . '" placeholder="'.$placeholder.'">';
    }

    /**
     * Generates a textarea field
     * @param args an array with provides the cofiguration of this textarea field
     *      - Mandatory arguments:
     *          - 'label_for': ID of the option field
     *          - 'option_name': Name of the option group
     *      - Optional argument:
     *          - 'placeholder': Specifies a short hint that describes the expected value of an input field
     */
    public static function textareaField( $args )
    {
        if (!isset($args['option_name'], $args['label_for']))
            return;

        $option_name = $args['option_name'];
        $name = $args['label_for'];
        $input = get_option( $option_name );
        $value = (isset($input[$name]) ? $input[$name] : '');
        $placeholder = (isset($args['placeholder']) ? $args['placeholder'] : '');

        echo '<textarea class="regular-text" id="'.$name.'" name="'.$option_name.'['.$name.']" placeholder="'.$placeholder.'">'. $value .'</textarea>';
    }


    /**
     * Generates a checkbox field
     * 
     * @param args an array with provides the cofiguration of this checkbox field
     *      - Mandatory arguments:
     *          - 'label_for': ID of the option field
     *          - 'option_name': Name of the option group
     *      - Optional argument:
     *          - 'class': This argument is used in order to assign a class name to the <input>
     *          - 'placeholder': Specifies a short hint that describes the expected value of an input field
     */
    public static function checkboxField( $args )
    {
        if (!isset($args['option_name'], $args['label_for']))
            return;

        $option_name = $args['option_name'];
        $name = $args['label_for'];
        $checkbox = get_option( $option_name );
        $checked = isset($checkbox[$name]) ? ($checkbox[$name] ? true : false) : false;
        
        echo '
            <label class="switch">
                <input type="checkbox" id="'.$name.'" name="'.$option_name.'['.$name.']" value="1" '. ($checked ? 'checked':'') .'>
                <span class="slider"></span>
            </label>';
    }

    /**
     * Generates a Media field using Wordpress Media Uploader
     * 
     * @param args an array with provides the cofiguration of this media field
     *      - Mandatory arguments:
     *          - 'label_for': ID of the option field
     *          - 'option_name': Name of the option group
     */
    public static function mediaField( $args )
    {
        if (!isset($args['option_name'], $args['label_for']))
            return;

        $option_name = $args['option_name'];
        $name = $args['label_for'];

        $option_config = get_option( $option_name );
        $image_url = isset($option_config[$name]) ? $option_config[$name] : "";

        $img_preview_id = $name.'-img-preview';
        $upload_button_id = $name.'-upload-button';
        $url_input_id = $name.'-image-url';

        echo '
            <div class="image-container">
                <img id="'.$img_preview_id.'" class="media-field-img" src="'.$image_url.'"/>
            </div>
            <input id="'.$url_input_id.'" type="hidden" name="'.$option_name.'['.$name.']" value="'.$image_url.'" />
            <input id="'.$upload_button_id.'" type="button button-secondary" class="button" value="Upload Image" />

            '.self::mediaScript($upload_button_id, $url_input_id, $img_preview_id);
    }

    /**
     * Generates the script for Media field processing
     */
    private static function mediaScript( $upload_id, $url_id, $preview_id)
    {
        return "
            <script type='text/javascript'>
                document.getElementById('$upload_id').addEventListener('click', function(e){
                    e.preventDefault();
                    var mediaUploader;
                    

                    if (mediaUploader)
                    {
                        mediaUploader.open();
                        return;
                    }

                    mediaUploader = wp.media.frames.file_frame = wp.media({
                        title: 'Choose Image',
                        button: {
                        text: 'Choose Image'
                    }, multiple: false });

                    mediaUploader.on('select', function() {
                        attachment = mediaUploader.state().get('selection').first().toJSON();
                        var url_input = document.getElementById('$url_id');
                        var preview_img = document.getElementById('$preview_id');
                        url_input.value = attachment.url;
                        url_input.setAttribute('value', attachment.url);
                        //preview_img.style.backgroundImage = 'url('+attachment.url+')';
                        preview_img.src = attachment.url;
                    });

                    mediaUploader.open();
                });
            </script>
        ";
    }
}