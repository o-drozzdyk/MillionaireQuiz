import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import langReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    language: langReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
