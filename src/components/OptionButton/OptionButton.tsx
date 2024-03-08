import React from 'react';
import cn from 'classnames';
import './OptionButton.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import {
  setStage, checkAnswer, getNextQuestion,
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
  const { lang } = useAppSelector((state) => state.language);

  const handleOptionClick = () => {
    const isCorrect = currentQuestion?.correctAnswers[lang].includes(option) || false;

    dispatch(checkAnswer({ option, isCorrect }));

    setTimeout(() => {
      if (isCorrect) {
        dispatch(getNextQuestion());
      } else {
        dispatch(setStage('end'));
      }
    }, 1000);
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

      <p
        className={cn('button__text', 'button__text--answer', {
          'button__text--answer--long': option.length >= 25,
        })}
      >
        {option}
      </p>
    </button>
  );
}

export default OptionButton;
