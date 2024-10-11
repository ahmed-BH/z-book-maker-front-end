import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';

import { OCRUtils } from '../common/ocr-utils';
import { error } from '../../../theme/palette';
import { confidanceToColorMap, LINE_HIGHLIGHTER_ACTION, WORD_HIGHLIGHTER_ACTION, PARAGRAPHIGH_HLIGHTER_ACTION } from '../../../utils/constants';

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
      sections = paragraphs.map((paragraph, i) => (
        <Tooltip followCursor title={`${Math.ceil(paragraph.confidence)}%`} key={`${i}_${paragraph.confidence}`}>
          <div style={getRectangle(paragraph, container)} />
        </Tooltip>
      ));
    } else if (highlightAction === LINE_HIGHLIGHTER_ACTION) {
      const lines = OCRUtils.flattenParagraphLines(textBlocks)
      sections = lines.map((line, i) => (
        <Tooltip followCursor title={`${Math.ceil(line.confidence)}%`} key={`${i}_${line.confidence}`}>
          <div style={getRectangle(line, container)} />
        </Tooltip>
      ));
    } else if (highlightAction === WORD_HIGHLIGHTER_ACTION) {
      const words = OCRUtils.flattenParagraphWords(textBlocks)
      sections = words.map((word, i) => (
        <Tooltip followCursor title={`${Math.ceil(word.confidence)}%`} key={`${i}_${word.confidence}`}>
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