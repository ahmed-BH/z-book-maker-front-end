import { useRef, useState } from 'react';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Card, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import SubToolBar from '../sub-tool-bar';
import { OCRAPI } from '../common/ocr-apis';
import { BookViewer } from '../book-viewer/BookViewer.component';
import BookPageEditor from '../book-editor/BookPageEditor.component';
import { useBookStore, useBookPageStore, useBookStoreActions } from '../store/book-store';

export default function BookView() {
  const bookInTheStore = useBookStore((state) => state.bookName);
  const bookStoreActions = useBookStoreActions();
  const storedBookPage = useBookPageStore();

  const [file, setFile] = useState(null);
  const [mainPageHeight, setMainPageHeight] = useState(0);

  const bookViewerRef = useRef(null);
  const inputRef = useRef(null);

  const fileChanged = (event) => {
    const { files } = event.target || {};
    if (files && files[0]) {
      setFile(files[0]);
      setMainPageHeight(bookViewerRef.current.getBoundingClientRect().height);

      // if the selected book is not the same as the one in the store
      // then reset the store
      // else do nothing
      if (bookInTheStore !== files[0].name) {
        bookStoreActions.reset();
        bookStoreActions.addNewBook(files[0].name);
      }
    }
  };

  const controls = {
    basicControls: {
      onClickNewFile: () => document.querySelector('input[type="file"]').click(),
      onClickScan: () => {
        const base64Image = storedBookPage.imageGetter();
        OCRAPI.OCRImage(base64Image)
          .then((result) => result.json())
          .then((textBlocks) => {
            bookStoreActions.setPageTextBlocks(textBlocks);
          })
      }
    }
  }

  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Input
        type='file'
        inputProps={{ accept: '.pdf' }}
        sx={{ display: 'none' }}
        onChange={fileChanged}
        ref={inputRef} />
      <SubToolBar {...controls} />

      <Grid container spacing={1} sx={{ height: '100%', mt: 0.2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{ height: '100%' }} ref={bookViewerRef}>
            <BookViewer
              book={file}
              mainPageHeight={mainPageHeight} />
          </Card>
        </Grid>

        <Grid item md={6} xl={6}>
          <Card sx={{ height: '100%' }}>
            <BookPageEditor/>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}