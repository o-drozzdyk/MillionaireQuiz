import React from 'react';
import cn from 'classnames';
import './MainPage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeStage } from '../../store/gameSlice';
import { getStingPrize } from '../../utils/helpers';

function MainPage() {
  const { stage, totalPrize } = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(changeStage('game'));
  };

  return (
    <div className={cn('main-page', {
      'main-page--start': stage === 'start',
    })}
    >
      <div className="main-page__hand">
        <img
          src="https://o-drozzdyk.github.io/MillionaireQuiz/img/hand.png"
          // src="img/hand.png"
          alt="Thumbs Up"
          className="main-page__image"
        />
      </div>

      <div className={cn('main-page__content', {
        'main-page__content--finish': stage === 'end',
      })}
      >
        {stage === 'start'
          ? (
            <p className="main-page__text">
              Who wants to be a millionaire?
            </p>
          )
          : (
            <div className="main-page__top">
              <p className="main-page__text main-page__text--top">Total score:</p>

              <p className="main-page__text">{`$${getStingPrize(totalPrize)} earned`}</p>
            </div>
          )}

        <button
          type="button"
          className="main-page__button"
          onClick={startGame}
        >
          {stage === 'start' ? 'Start' : 'Try again'}
        </button>
      </div>
    </div>
  );
}

export default MainPage;
