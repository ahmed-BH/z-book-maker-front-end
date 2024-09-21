import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useBookStore } from './store/book-store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BookInfoFiller({ isOpen, handleClose }) {
  const storedBook = useBookStore(({ bookName, pagesCount}) => ({ bookName, pagesCount }));

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please fill these general information about the book.
          </Typography>
          <TextField value={storedBook.bookName} label="Book name" variant="outlined" fullWidth sx={{ mt: 2 }} />
          <TextField label="Book author" variant="outlined" fullWidth sx={{ mt: 2 }} />
          <TextField type="date" label="Publish date" InputLabelProps={{ shrink: true }} variant="outlined" fullWidth sx={{ mt: 2 }} />
          <TextField type="number" value={storedBook.pagesCount} label="Number of pages" variant="outlined" fullWidth sx={{ mt: 2 }} />
        </Box>
      </Modal>
    </div>
  );
}

BookInfoFiller.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};