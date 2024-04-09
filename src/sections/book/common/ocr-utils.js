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
};
