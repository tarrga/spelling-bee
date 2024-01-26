import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from '../store/wordsSlice';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});
