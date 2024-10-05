import { axiosAPIInstance } from 'src/utils/constants';

export class OCRAPI {
  static OCRImage(image) {
    const formData = new FormData()
    formData.append('imgData', image);

    return axiosAPIInstance.post(`/page/ocr`, formData);
  }
}