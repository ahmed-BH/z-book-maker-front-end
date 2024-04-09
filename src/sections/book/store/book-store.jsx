import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export const useBookStore = create((set) => ({
  bookId: null,
  bookName: '',
  page: {
    pageNumber: 0,
    imageGetter: () => null,
    textBlocks: [],
    boundingClientRect: {},
  },

  actions: {
    reset: () => set({
      page: {
        pageNumber: 0,
        imageGetter: () => null,
        textBlocks: [],
        boundingClientRect: {},
      },
      bookId: null,
    }),
    setPage: (pageNumber, imageGetter, textBlocks = []) => set((state) => ({
      page: {
        ...state.page,
        imageGetter,
        pageNumber,
        textBlocks
      }
    })),
    setPageTextBlocks: (textBlocks) => set((state) => ({ page: { ...state.page, textBlocks } })),
    setPageBoundingRect: (boundingClientRect) => set((state) => ({ page: { ...state.page, boundingClientRect } })),
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
