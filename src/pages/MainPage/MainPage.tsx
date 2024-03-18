import React from 'react';
import cn from 'classnames';
import './MainPage.scss';
import handImage from '../../styles/img/hand.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setStage } from '../../store/gameSlice';
import { getStingPrize } from '../../utils/helpers';
import { setLanguage } from '../../store/languageSlice';
import localization from '../../utils/localization';

function MainPage() {
  const { stage, totalPrize } = useAppSelector((state) => state.game);
  const { lang } = useAppSelector((state) => state.language);
  const selectedLang = localization[lang];

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setStage('game'));
  };

  return (
    <div className={cn('main-page', {
      'main-page--start': stage === 'start',
    })}
    >
      <div className="main-page__langs">
        <button
          type="button"
          className={cn('main-page__lang', {
            'main-page__lang--selected': lang === 'en',
          })}
          onClick={() => dispatch(setLanguage('en'))}
        >
          EN
        </button>

        <button
          type="button"
          className={cn('main-page__lang', {
            'main-page__lang--selected': lang === 'ua',
          })}
          onClick={() => dispatch(setLanguage('ua'))}
        >
          УКР
        </button>
      </div>

      <div className="main-page__hand">
        <img
          src={handImage}
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
              {selectedLang.title}
            </p>
          )
          : (
            <div className="main-page__top">
              <p className="main-page__text main-page__text--top">{selectedLang.totalScore}</p>

              <p className="main-page__text">{`$${getStingPrize(totalPrize)} ${selectedLang.earned}`}</p>
            </div>
          )}

        <button
          type="button"
          className="main-page__button"
          onClick={startGame}
        >
          {stage === 'start' ? selectedLang.start : selectedLang.tryAgain}
        </button>
      </div>
    </div>
  );
}

export default MainPage;
