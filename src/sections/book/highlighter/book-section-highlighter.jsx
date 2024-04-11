import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { OCRUtils } from '../common/ocr-utils';
import { LINE_HIGHLIGHTER_ACTION, PARAGRAPHIGH_HLIGHTER_ACTION } from '../../../utils/constants';

export function BookSectionHighlighter({ highlightAction, container, textBlocks }) {

  const getRectangle = ({ bbox }, margin, clazz) => {
    const { x0, x1, y0, y1 } = bbox || {};
    const width = x1 - x0;
    const height = y1 - y0;
    const rect = document.createElement('div');
    rect.setAttribute('class', clazz);
    return {
      left: `${margin.x + x0}px`,
      top: `${margin.y + y0}px`,
      height: `${height}px`,
      width: `${width}px`,
      position: 'absolute',
      backgroundColor: 'blue',
      opacity: '0.5'
    }

  };

  const highlightedSections = useMemo(() => {
    let sections = []
    if (highlightAction === PARAGRAPHIGH_HLIGHTER_ACTION) {
      const paragraphs = textBlocks[0]?.paragraphs || [];
      sections = paragraphs.map((paragraph) => (<div style={getRectangle(paragraph, container)} />));
    } else if (highlightAction === LINE_HIGHLIGHTER_ACTION) {
      const lines = OCRUtils.flattenParagraphLines(textBlocks)
      sections = lines.map((line) => (<div style={getRectangle(line, container)} />));
    }
    return sections;
  }, [highlightAction, textBlocks, container]);

  return (
    <>{highlightedSections}</>
  )
};

BookSectionHighlighter.propTypes = {
  highlightAction: PropTypes.string,
  container: PropTypes.object,
  textBlocks: PropTypes.array,
};