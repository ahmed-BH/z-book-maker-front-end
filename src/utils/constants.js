import { error, success, warning } from '../theme/palette';

export const HEIGHT_OF_THUMBNAIL = 150;
export const PARAGRAPHIGH_HLIGHTER_ACTION = 'paragraph-highlighter-action';
export const LINE_HIGHLIGHTER_ACTION = 'line-highlighter-action';
export const WORD_HIGHLIGHTER_ACTION = 'word-highlighter-action';

export const confidanceToColorMap = [
  { check: (confidance) => confidance < 60, color: error.darker, label: '< 60%' },
  { check: (confidance) => confidance < 70, color: error.main, label: '61% - 70%' },
  { check: (confidance) => confidance < 80, color: error.light, label: '71% - 80%' },
  { check: (confidance) => confidance < 90, color: warning.main, label: '81% - 90%' },
  { check: (confidance) => confidance <= 100, color: success.main, label: '91% - 100%'},
];

export const confidanceColors = confidanceToColorMap.map(({ color }) => color);
