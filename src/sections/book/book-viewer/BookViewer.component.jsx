import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Page, pdfjs, Document, Thumbnail } from 'react-pdf';

import { Box } from '@mui/material';

import './BookViewer.component.css'
import { HEIGHT_OF_THUMBNAIL } from './constants';


export function BookViewer({ book, mainPageHeight }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);

  const onPageLoadSuccess = () => {
    setNumberOfThumbnails(Math.floor(mainPageHeight / (HEIGHT_OF_THUMBNAIL + 5)));
  }

  const goToPage = ({ pageNumber }) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="book-viewer">
      <Document className='book-viewer__page-viewer'
        file={book}
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
            height={mainPageHeight}
            pageNumber={currentPage}
            noData=""
            onLoadSuccess={onPageLoadSuccess}
          />
        </div>
      </Document>
    </div>
  );

}

BookViewer.propTypes = {
  book: PropTypes.any,
  mainPageHeight: PropTypes.number
}
