import React from 'react';
import './Menu.scss';
import { useAppSelector } from '../../store/hooks';
import MoneyButton from '../MoneyButton/MoneyButton';

function Menu() {
  const { prizes } = useAppSelector((state) => state.game);

  return (
    <aside className="menu">
      {prizes.map((prize) => <MoneyButton prize={prize} key={prize} />)}
    </aside>
  );
}

export default Menu;
