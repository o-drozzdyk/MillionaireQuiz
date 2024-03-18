import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './GamePage.scss';
import closeIcon from '../../styles/img/close.svg';
import menuIcon from '../../styles/img/menu.svg';
import { useAppSelector } from '../../store/hooks';
import OptionButton from '../../components/OptionButton/OptionButton';
import Menu from '../../components/Menu/Menu';
import { shuffleArray } from '../../utils/helpers';

const NUMBERING: { [key: number]: string } = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
};

function GamePage() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const { currentQuestion } = useAppSelector((state) => state.game);
  const { lang } = useAppSelector((state) => state.language);

  useEffect(() => {
    setOptions(shuffleArray(currentQuestion?.options[lang] || []));
  }, [currentQuestion]);

  return (
    <div className="page">
      <main className="page__main">
        <button
          type="button"
          className="page__button"
          onClick={() => setIsMenuShown(true)}
        >
          <img src={menuIcon} alt="Menu" />
        </button>

        <p className="page__question">
          {currentQuestion?.text[lang]}
        </p>

        <div className="page__options">
          {options.map((option, index) => (
            <OptionButton
              option={option}
              optionNumber={NUMBERING[index]}
              key={option}
            />
          ))}
        </div>
      </main>

      <div
        className={cn('page__menu-container', {
          'page__menu-container--visible': isMenuShown,
        })}
      >
        <button
          type="button"
          className="page__button page__button--close"
          onClick={() => setIsMenuShown(false)}
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <Menu />
      </div>
    </div>
  );
}

export default GamePage;
