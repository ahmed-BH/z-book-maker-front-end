import {v4 as uuid} from 'uuid';
import { create } from 'zustand';

export const useBookStore = create((set) => ({
  bookId: null,
  bookName: '',
  page: {
    pageNumber: 0,
    imageGetter: () => null,
    textBlocks: [],
  },
  
  actions: {
    reset: () => set({ page: { pageNumber: 0, imageGetter: () => null, textBlocks: [] }, bookId: null }),
    setPage: (pageNumber, imageGetter, textBlocks=[]) => set(() => ({ page: { imageGetter, pageNumber, textBlocks } })),
    setBookName: (bookName) => set({ bookName }),
    generateBookId: () => set({ bookId: uuid() }),
    addNewBook: (bookName) => {
      set({ bookName });
      set({ bookId: uuid() });
    }
  }
}));

export const useBookStoreActions = () => useBookStore((state) => state.actions);
export const useBookPageStore = () => useBookStore((state) => state.page);
