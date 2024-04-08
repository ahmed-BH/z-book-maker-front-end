import { useMemo, useState } from 'react';
import { useTheme } from '@emotion/react';

import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function DocumentHeaderSection() {
  const theme = useTheme();

  const [isFavourite, setFavourite] = useState(false);
  const [syncStatus, setSyncStatus] = useState('unsynced');
  const [count, setCount] = useState(0);

  const favouriteIconClicked = () => {
    setFavourite((prevIsFavourite) => !prevIsFavourite);
  };

  const syncIconClicked = () => {
    setCount((prevCount) => prevCount + 1);
    if (count % 2 === 0) {
      setSyncStatus('syncing');
    } else if (count % 3 === 0) {
      setSyncStatus('synced');
    } else {
      setSyncStatus('unsynced');
    }
  };

  const syncIcon = useMemo(() => {
    if (syncStatus === 'synced') {
      return 'ic:outline-cloud-done';
    }
    if (syncStatus === 'syncing') {
      return 'ic:outline-cloud-sync';
    }
    return 'fluent:cloud-off-28-regular';
  }, [syncStatus]);

  const favouriteIcon = useMemo(() => isFavourite ? 'mdi:star' : 'mdi:star-outline', [isFavourite]);


  return (
    <Stack direction="row" alignItems="center">
      <Input disableUnderline value="Untitled document" />
      <IconButton>
        <Iconify icon={favouriteIcon} color={theme.palette.grey['700']} onClick={favouriteIconClicked} />
      </IconButton>
      <IconButton>
        <Iconify icon={syncIcon} color={theme.palette.grey['700']} onClick={syncIconClicked} />
      </IconButton>
    </Stack>
  );
};
