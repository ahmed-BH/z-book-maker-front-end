import {v4 as uuid} from 'uuid';
import { create } from 'zustand';

export const useBookStore = create((set) => ({
  bookId: null,
  bookName: '',
  currentPageImage: null,
  pagesTextBlocks: [],
  
  actions: {
    reset: () => set({ pagesTextBlocks: [], currentPageImage: null, bookId: null }),
    addPageTextBlock: (pageTextBlock) => set((state) => ({ pagesTextBlocks: state.pagesTextBlocks.concat([pageTextBlock]) })),
    setCurrentPageImage: (currentPageImage) => set({ currentPageImage }),
    setBookName: (bookName) => set({ bookName }),
    generateBookId: () => set({ bookId: uuid() }),
    addNewBook: (bookName) => {
      set({ bookName });
      set({ bookId: uuid() });
    }
  }
}));

export const useBookStoreActions = () => useBookStore((state) => state.actions);
