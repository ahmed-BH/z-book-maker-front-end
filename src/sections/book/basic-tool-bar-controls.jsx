import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import ButtonAsSelect from './button-as-select';
import { useBookStore } from './store/book-store';

export default function BasicToolBarControls({ onClickNewFile, onClickScan, onClickHighlight, onClickFillBookInfo, highlightOptions = [] }) {
  const thereIsNoBook = useBookStore((state) => !state.bookName.length);
  const theme = useTheme();

  return (
    <>
      <IconButton onClick={onClickNewFile}>
        <Tooltip title="New file">
          <Iconify icon="fluent:quiz-new-24-regular" color={theme.palette.grey['700']} />
        </Tooltip>
      </IconButton>
      <IconButton disabled={thereIsNoBook} onClick={onClickFillBookInfo}>
        <Tooltip title="Fill book info">
          <Iconify icon="fluent:book-question-mark-rtl-24-regular" color={theme.palette.grey['700']} />
        </Tooltip>
      </IconButton>
      <IconButton onClick={onClickScan}>
        <Tooltip title="Scan current file">
          <Iconify icon="fluent:scan-text-28-filled" color={theme.palette.grey['700']} />
        </Tooltip>
      </IconButton>
      <ButtonAsSelect
        tooltipText='Highlight mode'
        onItemSelected={onClickHighlight}
        menuItems={highlightOptions}
        startIcon={<Iconify icon="tabler:paint" color={theme.palette.grey['700']} />} />
    </>
  );
};

BasicToolBarControls.propTypes = {
  onClickNewFile: PropTypes.func,
  onClickScan: PropTypes.func,
  onClickHighlight: PropTypes.func,
  onClickFillBookInfo: PropTypes.func,
  highlightOptions: PropTypes.array,
};
