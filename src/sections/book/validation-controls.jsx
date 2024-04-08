import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function ValidationCOntrols() {
  const theme = useTheme();

  return (
    <>
      <IconButton>
        <Iconify icon="gg-check-o" color={theme.palette.grey['700']} />
      </IconButton>
      <IconButton>
        <Iconify icon="carbon:select-01" color={theme.palette.grey['700']} />
      </IconButton>
    </>
  );
};