import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function ConfidanceStatus() {
  const theme = useTheme();

  return (
    <IconButton>
      <Iconify icon="mdi:content-save-check-outline" color={theme.palette.grey['700']} />
    </IconButton>
  );
};