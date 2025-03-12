import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  alphabetically = 'alphabetically',
  length = 'length',
}

export const App: React.FC = () => {
  const [sortField, setField] = useState<SortType | ''>('');
  const [isReverse, setReverse] = useState(false);
  const [sortGoods, setGoods] = useState(goodsFromServer);

  type RenderParams = (
    goods: string[],
    _sortField: SortType | '',
    _isReverse: boolean,
  ) => void;

  const renderGoods: RenderParams = (goods, _sortField, _isReverse) => {
    if (_sortField === sortField && _isReverse === isReverse) {
      return;
    }

    let preparedGoods = [...goods];

    setField(_sortField);
    setReverse(_isReverse);

    if (_sortField) {
      preparedGoods.sort((good1, good2) => {
        const value1 = good1;
        const value2 = good2;

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          switch (_sortField) {
            case SortType.alphabetically:
              return value1.localeCompare(value2);
            case SortType.length:
              if (value1.length - value2.length === 0) {
                return value1.localeCompare(value2);
              }

              return value1.length - value2.length;
            default:
              return 0;
          }
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return value1 - value2;
        }

        return 0;
      });
    }

    if (_isReverse) {
      preparedGoods = [...preparedGoods].reverse();
    }

    if (!_sortField && !_isReverse) {
      preparedGoods = [...goodsFromServer];
    }

    setGoods(preparedGoods);
  };

  const handlerAlphaSort = (): void => {
    renderGoods(goodsFromServer, SortType.alphabetically, isReverse);
  };

  const handlerLengthSort = (): void => {
    renderGoods(goodsFromServer, SortType.length, isReverse);
  };

  const handlerReverse = (): void => {
    renderGoods(goodsFromServer, sortField, !isReverse);
  };

  const handlerReset = (): void => {
    renderGoods(goodsFromServer, '', false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={handlerAlphaSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ' is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={handlerLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ' is-warning', {
            'is-light': !isReverse,
          })}
          onClick={handlerReverse}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className={cn('button', ' is-danger', 'is-light')}
            onClick={handlerReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
