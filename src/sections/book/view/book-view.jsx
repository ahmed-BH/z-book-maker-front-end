import { useRef, useState } from 'react';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Card, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import SubToolBar from '../sub-tool-bar';
import { BookViewer } from '../book-viewer/BookViewer.component';

export default function BookView() {
  const [file, setFile] = useState(null);
  const [mainPageHeight, setMainPageHeight] = useState(0);

  const bookViewerRef = useRef(null);
  const inputRef = useRef(null);

  const fileChanged = (event) => {
    const { files } = event.target || {};
    if (files && files[0]) {
      setFile(files[0]);
      setMainPageHeight(bookViewerRef.current.getBoundingClientRect().height);
    }
  };

  const controls = {
    basicControls: {
      onClickNewFile: () => document.querySelector('input[type="file"]').click(),
    }
  }

  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Input type='file' sx={{ display: 'none' }} onChange={fileChanged} ref={inputRef}/>
      <SubToolBar {...controls} />

        <Button
          onClick={() => document.querySelector('input[type="file"]').click()}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}>
          New Book
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{ height: '100%' }} ref={bookViewerRef}>
            <BookViewer
             book={file}
             mainPageHeight={mainPageHeight}/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{ height: '100%' }}>
            hello
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}