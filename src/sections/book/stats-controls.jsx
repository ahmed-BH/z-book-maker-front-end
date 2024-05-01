import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function StatsControls() {
  const theme = useTheme();

  return (
    <IconButton>
      <Iconify icon="nimbus:stats" color={theme.palette.grey['800']} />
    </IconButton>
  );
};