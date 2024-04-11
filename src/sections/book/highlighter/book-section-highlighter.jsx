import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';

import { OCRUtils } from '../common/ocr-utils';
import { error, success, warning } from '../../../theme/palette';
import { LINE_HIGHLIGHTER_ACTION, WORD_HIGHLIGHTER_ACTION, PARAGRAPHIGH_HLIGHTER_ACTION } from '../../../utils/constants';

const confidanceToColorMap = [
  { check: (confidance) => confidance < 60, color: error.darker },
  { check: (confidance) => confidance < 70, color: error.main },
  { check: (confidance) => confidance < 80, color: error.light },
  { check: (confidance) => confidance < 90, color: warning.main },
  { check: (confidance) => confidance <= 100, color: success.main },
]

export function BookSectionHighlighter({ highlightAction, container, textBlocks }) {

  const getRectangle = ({ bbox, confidence }, margin, clazz) => {
    const { x0, x1, y0, y1 } = bbox || {};
    const width = x1 - x0;
    const height = y1 - y0;
    const rect = document.createElement('div');
    rect.setAttribute('class', clazz);
    const backgroundColor = confidanceToColorMap.find(({ check }) => check(confidence))?.color || error.main;
    return {
      left: `${margin.x + x0}px`,
      top: `${margin.y + y0}px`,
      height: `${height}px`,
      width: `${width}px`,
      position: 'absolute',
      backgroundColor,
      opacity: '0.5'
    }

  };

  const highlightedSections = useMemo(() => {
    let sections = []
    if (highlightAction === PARAGRAPHIGH_HLIGHTER_ACTION) {
      const paragraphs = textBlocks[0]?.paragraphs || [];
      sections = paragraphs.map((paragraph) => (
        <Tooltip followCursor title={`${Math.ceil(paragraph.confidence)}%`}>
          <div style={getRectangle(paragraph, container)} />
        </Tooltip>
      ));
    } else if (highlightAction === LINE_HIGHLIGHTER_ACTION) {
      const lines = OCRUtils.flattenParagraphLines(textBlocks)
      sections = lines.map((line) => (
        <Tooltip followCursor title={`${Math.ceil(line.confidence)}%`}>
          <div style={getRectangle(line, container)} />
        </Tooltip>
      ));
    } else if (highlightAction === WORD_HIGHLIGHTER_ACTION) {
      const words = OCRUtils.flattenParagraphWords(textBlocks)
      sections = words.map((word) => (
        <Tooltip followCursor title={`${Math.ceil(word.confidence)}%`}>
          <div style={getRectangle(word, container)} />
        </Tooltip>
      ));
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