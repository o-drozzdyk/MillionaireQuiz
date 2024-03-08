import React from 'react';
import cn from 'classnames';
import './OptionButton.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import {
  changeStage, checkAnswer, getNextQuestion,
} from '../../store/gameSlice';

type Props = {
  option: string;
  optionNumber: string;
};

function OptionButton({ option, optionNumber }: Props) {
  const dispatch = useDispatch();
  const {
    isAnswerCorrect, selectedAnswer, currentQuestion,
  } = useAppSelector((state) => state.game);

  const handleOptionClick = () => {
    const isCorrect = currentQuestion?.correctAnswers.includes(option) || false;

    dispatch(checkAnswer({ option, isCorrect }));

    setTimeout(() => {
      if (isCorrect) {
        dispatch(getNextQuestion());
      } else {
        dispatch(changeStage('end'));
      }
    }, 1500);
  };

  return (
    <button
      type="button"
      className={cn('button', {
        'button--correct': isAnswerCorrect && selectedAnswer === option,
        'button--wrong': !isAnswerCorrect && selectedAnswer === option,
        'button--disabled': selectedAnswer,
      })}
      disabled={selectedAnswer !== null}
      onClick={handleOptionClick}
    >
      <p className="button__text button__text--option">{optionNumber}</p>

      <p className="button__text button__text--answer">{option}</p>
    </button>
  );
}

export default OptionButton;
