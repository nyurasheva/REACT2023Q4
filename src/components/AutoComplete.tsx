// AutoComplete.tsx

import { ChangeEvent, useState } from 'react';
import country from '../constants/country.json';
import { IData, AutoCompleteProps } from '../types/interfaces';

const AutoComplete = ({ register }: AutoCompleteProps) => {
  const [search, setSearch] = useState({
    text: '',
    suggestions: [] as IData[],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: IData[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = country.sort().filter((v: IData) => regex.test(v.name));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value: IData) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.name,
      suggestions: [],
    });
  };

  const { suggestions } = search;

  return (
    <div className="country">
      <div
        className={`country__options ${isComponentVisible ? 'off' : ''}`}
        onClick={() => setIsComponentVisible(false)}
      />
      <div>
        <input
          {...register('country')}
          id="input"
          name="country"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type={'text'}
          className="country__input"
        />
        <i className={`country__icon ${isComponentVisible ? 'open' : ''}`} />
      </div>
      {suggestions.length > 0 && isComponentVisible && (
        <ul className="country__list">
          {suggestions.map((item: IData) => (
            <li className="country__item" key={item.code}>
              <button
                key={item.code}
                onClick={() => suggestionSelected(item)}
                className="country__button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { AutoComplete };
