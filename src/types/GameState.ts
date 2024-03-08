import { Question } from './Question';
import { Stage } from './Stage';

export interface GameState {
  stage: Stage;
  questions: Question[];
  prizes: number[];
  currentQuestion: Question | null;
  currentPrize: number | null;
  isAnswerCorrect: boolean | null;
  selectedAnswer: string | null;
  totalPrize: number;
}
