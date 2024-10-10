import { axiosAPIInstance } from '../utils/constants';

export const saveBookInfo = async (bookInfo) => {
  try {
    return axiosAPIInstance.post('/book', bookInfo).then((response) => response.data);
  } catch (error) {
    throw new Error(`Failed to save book info: ${error}`);
  }
}