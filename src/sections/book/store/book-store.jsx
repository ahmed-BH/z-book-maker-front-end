import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export const useBookStore = create((set) => ({
  id: null,
  bookName: '',
  description: '',
  publishDate: '', // yyyy-mm-dd
  genre: '',
  isbn: '',
  pagesCount: 0,
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
    },
    setPagesCount: (pagesCount) => set({ pagesCount }),
    setBookInfo: (bookGeneralInfo) => set((state) => ({ ...state, ...bookGeneralInfo})),
  }
}));

export const useBookStoreActions = () => useBookStore((state) => state.actions);
export const useBookPageStore = () => useBookStore((state) => state.page);
export const useBookInfoStore = () => useBookStore((state) => ({
  title: state.bookName,
  pagesCount: state.pagesCount,
  description: state.description,
  genre: state.genre,
  isbn: state.isbn,
  publishDate: state.publishDate,
}));
