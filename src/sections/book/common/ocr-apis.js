import { v4 as uuidv4 } from 'uuid';

import { axiosAPIInstance } from 'src/utils/constants';

import { OCRUtils } from 'src/sections/book/common/ocr-utils';

export class OCRAPI {
  static OCRImage(base64Image) {
    const fileFromImage = OCRUtils.dataURLtoFile(base64Image, uuidv4());
    const formData = new FormData()
    formData.append('imgData', fileFromImage);

    return axiosAPIInstance.post(`/page/ocr`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data);
  }
}