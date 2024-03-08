/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import data from '../utils/gameConfig.json';
import { GameState } from '../types/GameState';
import { getRandomQuestion } from '../utils/helpers';
import { Stage } from '../types/Stage';

const initialState: GameState = {
  stage: 'start',
  questions: data.questions,
  prizes: Array.from(new Set(data.questions.map((question) => question.prize))),
  currentQuestion: null,
  currentPrize: null,
  isAnswerCorrect: null,
  selectedAnswer: null,
  totalPrize: 0,
};

function proccessNextQuestion(state: GameState) {
  state.isAnswerCorrect = null;
  state.selectedAnswer = null;

  if (state.currentPrize) {
    const currentPrize = state.currentPrize ? state.currentPrize : 0;
    state.currentPrize = state.prizes.find((prize) => prize > currentPrize) || null;
  } else {
    [state.currentPrize] = state.prizes;
  }

  if (state.currentPrize) {
    state.currentQuestion = getRandomQuestion(state);
  } else {
    state.currentQuestion = null;
    state.stage = 'end';
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state, action: PayloadAction<Stage>) => {
      state.stage = action.payload;

      if (action.payload === 'start') {
        state.totalPrize = 0;
      } else if (action.payload === 'game') {
        state.totalPrize = 0;
        proccessNextQuestion(state);
      } else {
        state.currentQuestion = null;
        state.currentPrize = null;
      }
    },

    getNextQuestion: (state) => {
      proccessNextQuestion(state);
    },

    checkAnswer: (state, action: PayloadAction<{ option: string, isCorrect: boolean }>) => {
      const { option, isCorrect } = action.payload;

      state.isAnswerCorrect = isCorrect;
      state.selectedAnswer = option;

      if (isCorrect) {
        state.totalPrize = state.currentPrize || 0;
      }
    },
  },
});

export const {
  setStage, getNextQuestion, checkAnswer,
} = gameSlice.actions;
export default gameSlice.reducer;
