import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function BasicToolBarControls({ onClickNewFile, onClickScan, onClickHighlight }) {
  const theme = useTheme();

  return (
    <>
      <IconButton onClick={onClickNewFile}>
        <Iconify icon="fluent:quiz-new-24-regular" color={theme.palette.grey['700']} />
      </IconButton>
      <IconButton onClick={onClickScan}>
        <Iconify icon="fluent:scan-text-28-filled" color={theme.palette.grey['700']} />
      </IconButton>
      <IconButton onClick={onClickHighlight}>
        <Iconify icon="tabler:paint" color={theme.palette.grey['700']} />
      </IconButton>
    </>
  );
};

BasicToolBarControls.propTypes = {
  onClickNewFile: PropTypes.func,
  onClickScan: PropTypes.func,
  onClickHighlight: PropTypes.func,
};
