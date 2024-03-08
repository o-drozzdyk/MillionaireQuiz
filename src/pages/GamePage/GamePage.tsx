import React from 'react';
import './GamePage.scss';
import { useAppSelector } from '../../store/hooks';
import OptionButton from '../../components/OptionButton/OptionButton';
import Menu from '../../components/Menu/Menu';

const NUMBERING: { [key: number]: string } = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
};

function GamePage() {
  const { currentQuestion } = useAppSelector((state) => state.game);

  return (
    <div className="page">
      <main className="page__main">
        <a href="#menu" className="page__menu-link"> </a>

        <p className="page__question">
          {currentQuestion?.text}
        </p>

        <div className="page__options">
          {currentQuestion?.options.map((option, index) => (
            <OptionButton
              option={option}
              optionNumber={NUMBERING[index]}
              key={option}
            />
          ))}
        </div>
      </main>

      <div id="menu" className="page__menu-container">
        <a href="#/" className="page__close-icon"> </a>

        <Menu />
      </div>
    </div>
  );
}

export default GamePage;
