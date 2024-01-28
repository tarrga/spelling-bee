import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  guessedWords: [],
  lettersOfTheDay: [],
  possibleWordsLength: 0,
};

export const counterSlice = createSlice({
  name: 'guessedWords',
  initialState,
  reducers: {
    addWord: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.guessedWords = [...state.guessedWords, action.payload];
    },
    setLettersOfTheDay: (state, action) => {
      state.lettersOfTheDay = action.payload;
    },
    setPossibleWordsLength: (state, action) => {
      state.possibleWordsLength = action.payload;
    },
    setGuessedWords: (state, action) => {
      state.guessedWords = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addWord,
  setLettersOfTheDay,
  setPossibleWordsLength,
  setGuessedWords,
} = counterSlice.actions;

export default counterSlice.reducer;
