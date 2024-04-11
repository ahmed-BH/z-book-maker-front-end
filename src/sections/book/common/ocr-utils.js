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
};
