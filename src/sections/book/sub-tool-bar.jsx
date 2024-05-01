import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import TextControls from './text-controls';
import ConfidanceStatus from './confidance-status';
import UndoRedoControls from './undo-redo-controls';
import ValidationCOntrols from './validation-controls';
import BasicToolBarControls from './basic-tool-bar-controls';

export default function SubToolBar({ basicControls, onClickShowConfidenceStats }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      backgroundColor={theme.palette.primary.lightest}
      sx={{
        flexGrow: 1,
        borderRadius: '15px',
        p: 0.3,
      }}>
      
      <BasicToolBarControls {...basicControls}/>

      <Divider orientation="vertical" flexItem />

      <UndoRedoControls/>

      <Divider orientation="vertical" flexItem />
      
      <ConfidanceStatus onClick={onClickShowConfidenceStats}/>

      <Divider orientation="vertical" flexItem />

      <TextControls/>

      <Divider orientation="vertical" flexItem />

      <ValidationCOntrols/>

      <Divider orientation="vertical" flexItem />

    </Stack>

  );
};

SubToolBar.propTypes = {
  basicControls: PropTypes.object,
  onClickShowConfidenceStats: PropTypes.func,
};
