import { OCRUtils } from './common/ocr.utils';
import { useBookPageStore } from '../store/book-store';

export default function BookPageEditor() {
  const storedBookPage = useBookPageStore();

  return (
    <>
      {
        OCRUtils.flattenParagraphLines(storedBookPage.textBlocks).map((line, index) =>
           (
            <div style={{ margin: '10px', fontSize: '13px' }} dir='rtl' lang='ar' key={index}>
              {line.text}
            </div>
          )
        )
      }
    </>
  );
};
