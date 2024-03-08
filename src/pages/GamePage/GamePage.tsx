import React, { useEffect, useState } from 'react';
import './GamePage.scss';
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
  const [options, setOptions] = useState<string[]>([]);
  const { currentQuestion } = useAppSelector((state) => state.game);
  const { lang } = useAppSelector((state) => state.language);

  useEffect(() => {
    setOptions(shuffleArray(currentQuestion?.options[lang] || []));
  }, [currentQuestion]);

  return (
    <div className="page">
      <main className="page__main">
        <a href="#menu" className="page__menu-link"> </a>

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

      <div id="menu" className="page__menu-container">
        <a href="#/" className="page__close-icon"> </a>

        <Menu />
      </div>
    </div>
  );
}

export default GamePage;
