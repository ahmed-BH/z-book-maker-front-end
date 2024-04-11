import { confidanceToColorMap } from 'src/utils/constants';

export class OCRUtils {
  static flattenParagraphLines(textBlocks) {
    const lines = [];
    textBlocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        paragraph.lines.forEach((line) => {
          lines.push(line);
        })
      })
    });
    return lines;
  }

  static flattenParagraphWords(textBlocks) {
    const words = [];
    textBlocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        paragraph.lines.forEach((line) => {
          line.words.forEach((word) => {
            words.push(word);
          })
        })
      })
    });
    return words;
  }

  static getWordsConfidenceStats(textBlocks) {
    const words = this.flattenParagraphWords(textBlocks);
    const series = confidanceToColorMap.map(({ label }) => ({ label, value: 0 }));
    words.forEach(({ confidence }) => {
      const confidance = Math.ceil(confidence);
      const index = confidanceToColorMap.findIndex(({ check }) => check(confidance));
      series[index].value += 1;
    });
    return series;
  }

  static getLinesConfidenceStats(textBlocks) {
    const lines = this.flattenParagraphLines(textBlocks);
    const series = confidanceToColorMap.map(({ label }) => ({ label, value: 0 }));
    lines.forEach(({ confidence }) => {
      const confidance = Math.ceil(confidence);
      const index = confidanceToColorMap.findIndex(({ check }) => check(confidance));
      series[index].value += 1;
    });
    return series;
  }
};
