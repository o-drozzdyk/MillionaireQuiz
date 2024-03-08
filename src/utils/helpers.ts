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

  const min = sample[0].id;
  const max = sample[sample.length - 1].id + 1;

  const randomId = Math.floor(Math.random() * (max - min) + min);

  return sample.find((question) => question.id === randomId) || null;
};
