import { fabric } from 'fabric';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { OCRUtils } from '../common/ocr-utils';
import { useBookPageStore } from '../store/book-store';

export default function BookPageEditor({ width, height }) {
  const storedBookPage = useBookPageStore();

  const fabricRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current);
  }, [width, height]);

  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.clear();
      OCRUtils.flattenParagraphLines(storedBookPage.textBlocks)
        .forEach((line) =>
          fabricRef.current.add(new fabric.Textbox(line.text,
            {
              left: line.bbox.x0, top: line.bbox.y0, textAlign: 'right', fontSize: 13,
              width: line.bbox.x1 - line.bbox.x0 + 10, height: line.bbox.y1 - line.bbox.y0
            }

          )))
    }
  }, [storedBookPage.textBlocks]);

  return width && height ? (
    <canvas
      ref={canvasRef}
      width={width}
      height={height} />
  )
    : null;
};

BookPageEditor.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
