import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function UndoRedoControls() {
  const theme = useTheme();

  return (
    <>
      <IconButton>
        <Iconify icon="material-symbols:undo" color={theme.palette.grey['700']} />
      </IconButton>
      <IconButton>
        <Iconify icon="material-symbols:redo" color={theme.palette.grey['700']} />
      </IconButton>
    </>
  );
};