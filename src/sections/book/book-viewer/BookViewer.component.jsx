import PropTypes from 'prop-types';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Page, pdfjs, Document, Thumbnail } from 'react-pdf';
import React, { useRef, useMemo, useState, useEffect } from 'react';

import { Box, Pagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import './BookViewer.component.css'
import { useBookStoreActions } from '../store/book-store';
import { HEIGHT_OF_THUMBNAIL } from '../../../utils/constants';


export function BookViewer({ book, mainPageHeight }) {
  const theme = useTheme();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [pdfPagesCount, setPDFPagesCount] = useState(0);
  const [calculatedMainPageHeight, setCalculatedMainPageHeight] = useState(0);

  const paginationRef = useRef(null);
  const mainPageRef = useRef(null);

  const bookStoreActions = useBookStoreActions();

  const onPageLoadSuccess = () => {
    setCalculatedMainPageHeight(mainPageHeight - paginationRef.current.getBoundingClientRect().height - 10);
    setNumberOfThumbnails(Math.floor(calculatedMainPageHeight / (HEIGHT_OF_THUMBNAIL )));
  }

  const onPageRenderSuccess = () => {
    const imageGetter = () => mainPageRef.current.toDataURL();
    bookStoreActions.setPage(currentPage, imageGetter);
    bookStoreActions.setPageBoundingRect(mainPageRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    if (paginationRef.current) {
      setCalculatedMainPageHeight(mainPageHeight - paginationRef.current.getBoundingClientRect().height);
    }
  }, [mainPageHeight, pdfPagesCount]);

  const goToPage = ({ pageNumber }) => {
    setCurrentPage(pageNumber);
  }

  const onPDFLoadSuccess = ({ numPages }) => {
    setPDFPagesCount(numPages);
    setCurrentPage(1);
    bookStoreActions.setPagesCount(numPages);
  }

  const listOfThumbnails = useMemo(() =>
    Array.from(new Array(Math.min(numberOfThumbnails, pdfPagesCount - currentPage)), (_, i) => (
      <Box sx={{ border: `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden ' }} key={i}>
        <Thumbnail
          pageNumber={currentPage + i + 1}
          noData=""
          height={HEIGHT_OF_THUMBNAIL}
          onItemClick={goToPage}
        />
        <Box
          textAlign='center'
          sx={{ fontSize: theme.typography.caption, backgroundColor: theme.palette.grey[200], letterSpacing: 'wide' }}>
          {currentPage + i + 1}
        </Box>
      </Box>
    )), [currentPage, numberOfThumbnails, pdfPagesCount, theme.typography, theme.palette]);

  return (
    <div className="book-viewer">
      <Document className='book-viewer__page-viewer'
        file={book}
        onLoadSuccess={onPDFLoadSuccess}
        noData="">
        <div className='book-viewer__page-viewer__thumbnails'>
          {listOfThumbnails}
        </div>
        <div className="book-viewer__page-viewer__main-page">
          <Page
            canvasRef={mainPageRef}
            onRenderSuccess={onPageRenderSuccess}
            height={calculatedMainPageHeight}
            pageNumber={currentPage}
            noData=""
            onLoadSuccess={onPageLoadSuccess}
          />
        </div>
      </Document>
      <Pagination
        style={{ display: pdfPagesCount ? 'block' : 'none' }}
        count={pdfPagesCount}
        page={currentPage}
        onChange={(_, pageNumber) => goToPage({ pageNumber })}
        ref={paginationRef} />
    </div>
  );

}

BookViewer.propTypes = {
  book: PropTypes.any,
  mainPageHeight: PropTypes.number
}
