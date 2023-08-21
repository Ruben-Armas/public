//const { Toolbar, ToolbarButton } = require('@wordpress/components');
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { formatBold, formatItalic, link } from '@wordpress/icons';

function MyToolbar() {
    return (
        <Toolbar label="Options">
            <ToolbarButton icon={ formatBold } label="Bold" />
            <ToolbarButton icon={ formatItalic } label="Italic" />
            <ToolbarButton icon={ link } label="Link" />
        </Toolbar>
    );
}

/*const { ToolbarGroup, ToolbarButton } = wp.components;

function CustomToolbar(props) {
  const { onClickButton } = props;

  return (
    <ToolbarGroup>
      <ToolbarButton
        icon="edit"
        label="Editar"
        onClick={() => onClickButton("edit")}
      />
      <ToolbarButton
        icon="trash"
        label="Eliminar"
        onClick={() => onClickButton("delete")}
      />
    </ToolbarGroup>
  );
}*/