<?php
    # Editor
    $label = block_value( 'label' );
    $text = block_value( 'text' );
    $textArea_Config = block_field_config( 'text' );
    $textArea_placeHolder = $textArea_Config['settings']['placeholder'];
    # Inspector
    $form_count = block_value( 'char-count' );
    $max_chars = block_value( 'max-length-slider' );

    $help_text_type = block_value( 'help-text-type' );
    $help_text_value = block_value( 'help-text' );
    $help_text_Config = block_field_config( 'help-text' );
    echo $help_text_default = $help_text_Config['settings']['default'];

    # Default (without help-text)
    $label_html = 'for="text-area-1"';
    $textarea_html = 'id="text-area-1" name="text-area-1" placeholder="'.$textArea_placeHolder.'"';
    $help_text_div = '';

    // char-count
    if ($form_count){
        $label_html = 'for="text-area-4"';
        $textarea_html = 'id="text-area-4" placeholder="'.$textArea_placeHolder.'"';
        $class_form_count = '';
        
        $class_form_count = 'ulpgcds-form__item--counter';
        $textarea_html .= ' maxlength="'.$max_chars.'"';
    }
    // help-text
    if ($help_text_type != 'without'){
        if ( $help_text_value == '' ){
            if ($help_text_type == 'error')
                $help_text_div = '<div class="help-text">Este campo no puede quedar vacío.</div>';
            else
                $help_text_div = '<div class="help-text">'.$help_text_default.'</div>';
        }
        else
            $help_text_div = '<div class="help-text">'.$help_text_value.'</div>';
    }
    // error type
    if ($help_text_type == 'error'){
        $label_html = 'for="text-area-2"';
        $textarea_html = 'id="text-area-2" placeholder="'.$textArea_placeHolder.'" required="required" aria-required="true" class="form-item__error"';
    } 
?>

<form class="ulpgds-form">
     <div class="ulpgcds-form__item ulpgcds-form__item--textarea <?php echo $class_form_count ?>">
          <label <?php echo $label_html ?>><?php echo $label ?></label>
          <textarea <?php echo $textarea_html; ?>><?php echo $text ?></textarea>
          <?php echo $help_text_div ?>
     </div>
</form>