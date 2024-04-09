export class OCRAPI {
  static OCRImage(image) {
    const formData = new FormData()
    formData.append('imgData', image);

    return fetch('/ocr', {
      method: 'post',
      body: formData
    });
  }
}