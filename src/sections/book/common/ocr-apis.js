import { baseURL } from 'src/utils/constants';

export class OCRAPI {
  static OCRImage(image) {
    const formData = new FormData()
    formData.append('imgData', image);

    return fetch(`${baseURL}/ocr`, {
      method: 'post',
      body: formData
    });
  }
}