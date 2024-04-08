import PropTypes from 'prop-types';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import React, { useRef, useState, useEffect } from 'react';
import { Page, pdfjs, Document, Thumbnail } from 'react-pdf';

import { Box, Pagination } from '@mui/material';

import './BookViewer.component.css'
import { HEIGHT_OF_THUMBNAIL } from './constants';


export function BookViewer({ book, mainPageHeight }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [pdfPagesCount, setPDFPagesCount] = useState(0);
  const [calculatedMainPageHeight, setCalculatedMainPageHeight] = useState(0);

  const paginationRef = useRef(null);

  const onPageLoadSuccess = () => {
    setCalculatedMainPageHeight(mainPageHeight - paginationRef.current.getBoundingClientRect().height - 10);
    setNumberOfThumbnails(Math.floor(calculatedMainPageHeight / (HEIGHT_OF_THUMBNAIL + 5)));
  }

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
  }

  return (
    <div className="book-viewer">
      <Document className='book-viewer__page-viewer'
        file={book}
        onLoadSuccess={onPDFLoadSuccess}
        noData="">
        <div className='book-viewer__page-viewer__thumbnails'>
          {
            Array.from(new Array(numberOfThumbnails), (_, i) => (
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={i}>
                <Thumbnail
                  pageNumber={currentPage + i + 1}
                  noData=""
                  height={HEIGHT_OF_THUMBNAIL}
                  onItemClick={goToPage}
                />
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  ml="2">
                  {currentPage + i + 1}
                </Box>
              </Box>
            ))
          }
        </div>
        <div className="book-viewer__page-viewer__main-page">
          <Page
            height={calculatedMainPageHeight}
            pageNumber={currentPage}
            noData=""
            onLoadSuccess={onPageLoadSuccess}
          />
        </div>
      </Document>
      <Pagination
        style={{ display: pdfPagesCount ? 'block' : 'none'}}
        count={pdfPagesCount}
        onChange={(_, pageNumber) => goToPage({ pageNumber })}
        ref={paginationRef} />
    </div>
  );

}

BookViewer.propTypes = {
  book: PropTypes.any,
  mainPageHeight: PropTypes.number
}
