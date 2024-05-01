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
    if (!width || !height) {
      return;
    }
    if (!fabricRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current);
    }
    fabricRef.current.clear();
    const marginX = 10;
    OCRUtils.flattenParagraphLines(storedBookPage.textBlocks)
      .forEach((line) =>
        fabricRef.current.add(new fabric.Textbox(line.text,
          {
            left: marginX, top: line.bbox.y0, textAlign: 'right', fontSize: 13,
            width: width - marginX * 2, height: line.bbox.y1 - line.bbox.y0,
          }

        ))
      );

  }, [storedBookPage.textBlocks, width, height]);

  return width && height ? (
    <canvas
      style={{ marginTop: '5px' }}
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
