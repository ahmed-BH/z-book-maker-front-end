import { axiosAPIInstance } from '../utils/constants';

export const saveBookInfo = async (bookInfo) => {
  try {
    const response = await axiosAPIInstance.post('/book', bookInfo);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save book info: ${error}`);
  }
}