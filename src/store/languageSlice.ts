/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Language } from '../types/Language';

type State = {
  lang: Language
};

const initialState: State = {
  lang: (localStorage.getItem('gameLang') as Language) || 'en',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      if (state.lang !== action.payload) {
        state.lang = action.payload;

        localStorage.setItem('gameLang', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
