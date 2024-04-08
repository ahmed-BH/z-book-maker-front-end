import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function TextControls() {
  const theme = useTheme();

  return (
    <>
      <IconButton>
        <Iconify icon="ph:text-b-bold" color={theme.palette.grey['800']} />
      </IconButton>
      <IconButton>
        <Iconify icon="ph:text-italic-bold" color={theme.palette.grey['800']} />
      </IconButton>
      <IconButton>
        <Iconify icon="ph:text-underline-bold" color={theme.palette.grey['800']} />
      </IconButton>
      <IconButton>
        <Iconify icon="ic:baseline-format-color-text" color={theme.palette.grey['800']} />
      </IconButton>
    </>
  );
};