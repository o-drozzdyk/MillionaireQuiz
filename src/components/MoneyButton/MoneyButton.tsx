import React from 'react';
import cn from 'classnames';
import './MoneyButton.scss';
import { useAppSelector } from '../../store/hooks';
import { getStingPrize } from '../../utils/helpers';

type Props = {
  prize: number;
};

function MoneyButton({ prize }: Props) {
  const currentPrize = useAppSelector((state) => state.game.currentPrize) || 0;
  const prizeStr = getStingPrize(prize);

  return (
    <button
      type="button"
      className={cn('money-button', {
        'money-button--current': prize === currentPrize,
        'money-button-finished': prize < currentPrize,
      })}
    >
      <p
        className={cn('money-button__text', {
          'money-button__text--current': prize === currentPrize,
          'money-button__text--finished': prize < currentPrize,
        })}
      >
        {`$${prizeStr}`}
      </p>
    </button>
  );
}

export default MoneyButton;
