import { v4 as uuidv4 } from 'uuid';

import { axiosAPIInstance } from '../utils/constants';
import { OCRUtils } from '../sections/book/common/ocr-utils';

export const saveBookInfo = async (bookInfo, base64Thumbnail, forTheFirstTime) => {
  try {
    const httpMethod = forTheFirstTime ? 'post' : 'patch';
    const formData = new FormData()
    Object.keys(bookInfo).forEach((key) => {
      formData.append(key, bookInfo[key]);
    });
    if (base64Thumbnail) {
      const fileFromImage = OCRUtils.dataURLtoFile(base64Thumbnail, uuidv4());
      formData.append('thumbnail', fileFromImage);
    }
    return axiosAPIInstance[httpMethod](`/book`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data);
  } catch (error) {
    throw new Error(`Failed to save book info: ${error}`);
  }
}
