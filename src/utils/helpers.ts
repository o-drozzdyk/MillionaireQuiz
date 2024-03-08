/* eslint-disable no-param-reassign */
import { GameState } from '../types/GameState';
import { Question } from '../types/Question';

export const getStingPrize = (totalPrize: number) => {
  let curr = totalPrize.toString();
  let res = '';

  while (curr.length > 3) {
    res = `,${curr.slice(-3)}${res}`;
    curr = curr.slice(0, -3);
  }

  res = `${curr}${res}`;

  return res;
};

export const getRandomQuestion = (state: GameState) => {
  const sample = state.questions
    .filter((qustion: Question) => qustion.prize === state.currentPrize);

  const randomIndex = Math.floor(Math.random() * (sample.length));

  return sample[randomIndex];
};

export const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
