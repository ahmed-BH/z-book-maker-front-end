import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack, FormControl } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';
import FormHelperText from '@mui/material/FormHelperText';

import { saveBookInfo } from '../../service/book.api.service';
import { useBookInfoStore, useBookPageStore, useBookStoreActions } from './store/book-store';

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
  const storedBook = useBookInfoStore(({ title, pagesCount, description, isbn, publishDate, genre }) => ({ title, pagesCount, description, isbn, publishDate, genre }));
  const bookStoreActions = useBookStoreActions();
  const bookPageStore = useBookPageStore();

  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const draftBook = {};
  const draftBookFieldChanged = (field, value) => {
    draftBook[field] = value;
  };

  const saveBook = async () => {
    setIsLoading(true);
    const isFirstSave = !storedBook.id;
    try {
      const thumbnail = storedBook.thumbnailURL ? null : bookPageStore.imageGetter();
      const savedBook = await saveBookInfo({ ...storedBook, ...draftBook }, thumbnail, isFirstSave);
      bookStoreActions.setBookInfo(savedBook);
      setSaveError(false);
      setHelperText('Book saved successfully.');
      setTimeout(() => setHelperText(''), 2000);

    } catch (error) {
      setSaveError(true);
      setHelperText(`${error}`);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading && <LinearProgress sx={{ mb: 2 }} />}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please fill these general information about the book.
          </Typography>
          <FormControl fullWidth error variant='standard'>
            <Stack sx={{ mt: 2 }} direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2 }} useFlexGap>
              <img src={bookPageStore.imageGetter()} style={{ width: '110px', height: '154px' }} alt="Book cover" />
              <Stack direction='column' sx={{ width: '100%' }} useFlexGap>
                <TextField
                  defaultValue={storedBook.title}
                  label="Book title"
                  variant="outlined" fullWidth sx={{ mt: 2 }}
                  onChange={(event) => draftBookFieldChanged('title', event.target.value)} />
                <TextField
                  defaultValue={storedBook.description}
                  label="Book description"
                  variant="outlined" fullWidth sx={{ mt: 2 }}
                  onChange={(event) => draftBookFieldChanged('description', event.target.value)} />
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              useFlexGap>
              <TextField
                type="number"
                defaultValue={storedBook.pagesCount}
                label="Number of pages"
                variant="outlined"
                fullWidth sx={{ mt: 2 }}
                onChange={(event) => draftBookFieldChanged('pagesCount', Number(event.target.value))} />
              <TextField
                defaultValue={storedBook.publishDate}
                type="date"
                label="Publish date"
                InputLabelProps={{ shrink: true }}
                variant="outlined" fullWidth sx={{ mt: 2 }}
                onChange={(event) => draftBookFieldChanged('publishDate', event.target.value)} />
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              useFlexGap>
              <TextField
                defaultValue={storedBook.genre}
                label="Genre"
                variant="outlined" fullWidth sx={{ mt: 2 }}
                onChange={(event) => draftBookFieldChanged('genre', event.target.value)} />
              <TextField
                defaultValue={storedBook.isbn}
                label="ISBN"
                variant="outlined" fullWidth sx={{ mt: 2 }}
                onChange={(event) => draftBookFieldChanged('isbn', event.target.value)} />
            </Stack>
            <FormHelperText error={saveError}>{helperText}</FormHelperText>
          </FormControl>

          <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
            <Button onClick={handleClose} size='large'>Cancel</Button>
            <Button onClick={saveBook} size='large'>Save</Button>
          </ButtonGroup>

        </Box>
      </Modal>
    </div>
  );
}

BookInfoFiller.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};