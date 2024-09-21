import { useRef, useMemo, useState, useEffect } from 'react';

import Input from '@mui/material/Input';
import { Card, Grid } from '@mui/material';
import Container from '@mui/material/Container';

import SubToolBar from '../sub-tool-bar';
import { OCRAPI } from '../common/ocr-apis';
import { OCRUtils } from '../common/ocr-utils';
import BookInfoFiller from '../book-info-filler';
import ScanConfidenceStats from '../scan-confidence-stats';
import { BookViewer } from '../book-viewer/BookViewer.component';
import BookPageEditor from '../book-editor/BookPageEditor.component';
import { BookSectionHighlighter } from '../highlighter/book-section-highlighter';
import { useBookStore, useBookPageStore, useBookStoreActions } from '../store/book-store';
import { confidanceColors, LINE_HIGHLIGHTER_ACTION, WORD_HIGHLIGHTER_ACTION, PARAGRAPHIGH_HLIGHTER_ACTION } from '../../../utils/constants';

export default function BookView() {
  const bookInTheStore = useBookStore((state) => state.bookName);
  const bookStoreActions = useBookStoreActions();
  const storedBookPage = useBookPageStore();

  const [file, setFile] = useState(null);
  const [mainPageHeight, setMainPageHeight] = useState(0);
  const [highlightAction, setHighlightAction] = useState(null);
  const [showConfidenceStats, setShowConfidenceStats] = useState(false);
  const [editorSectionWidth, setEditorSectionWidth] = useState(0);
  const [editorSectionHeight, setEditorSectionHeight] = useState(0);
  const [isBookInfoFillerOpen, setIsBookInfoFillerOpen] = useState(false);

  const editorGrid = useMemo(() => showConfidenceStats ? { md: 4, xl: 4 } : { md: 6, xl: 6 },
    [showConfidenceStats]
  );

  const bookViewerRef = useRef(null);
  const inputRef = useRef(null);
  const editorSectionRef = useRef(null);

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

  const setEditorDimensions = () => {
    const width = Math.floor(editorSectionRef.current.getBoundingClientRect().width) - 8; // 8 is the padding left
    setEditorSectionWidth(width);
    const height = Math.floor(editorSectionRef.current.getBoundingClientRect().height) - 8; // 8 is the padding top
    setEditorSectionHeight(height);
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
      },
      highlightOptions: [
        { value: WORD_HIGHLIGHTER_ACTION, label: 'Words' },
        { value: LINE_HIGHLIGHTER_ACTION, label: 'Lines' },
        { value: PARAGRAPHIGH_HLIGHTER_ACTION, label: 'Paragraphs' },
        { value: '', label: 'None' },
      ],
      onClickHighlight: (highlightOption) => setHighlightAction(highlightOption),
      onClickFillBookInfo: () => setIsBookInfoFillerOpen(true),
    },
    onClickShowConfidenceStats: () => {
      setShowConfidenceStats((prev) => !prev);
      setEditorDimensions();
    }
  }

  const linesStatsSeries = useMemo(() => OCRUtils.getLinesConfidenceStats(storedBookPage.textBlocks), [storedBookPage.textBlocks]);
  const wordsStatsSeries = useMemo(() => OCRUtils.getWordsConfidenceStats(storedBookPage.textBlocks), [storedBookPage.textBlocks]);

  /* editor setup section */
  useEffect(() => {
    setEditorDimensions();
  }, []);

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
            
            <BookInfoFiller
              isOpen={isBookInfoFillerOpen}
              handleClose={() => setIsBookInfoFillerOpen(false)}
            />
          </Card>
        </Grid>

        <BookSectionHighlighter
          highlightAction={highlightAction}
          container={storedBookPage.boundingClientRect}
          textBlocks={storedBookPage.textBlocks} />

        <Grid item {...editorGrid}>
          <Card sx={{ height: '100%' }} ref={editorSectionRef}>
            <BookPageEditor width={editorSectionWidth} height={editorSectionHeight} />
          </Card>
        </Grid>

        { showConfidenceStats ? (
          <Grid item md={2} xl={2}>
            <Grid item xs={12} sm={6} md={12} mb={2}>
              <ScanConfidenceStats
                title="Confidance of lines"
                chart={{
                  series: linesStatsSeries,
                  colors: confidanceColors,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} mb={2}>
              <ScanConfidenceStats
                title="Confidance of words"
                chart={{
                  series: wordsStatsSeries,
                  colors: confidanceColors,
                }}
              />
            </Grid>
          </Grid>)
          : null
        }
      </Grid>
    </Container>
  );
}