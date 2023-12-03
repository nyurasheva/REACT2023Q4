// AutoComplete.tsx

import { ChangeEvent, useState } from 'react';
import { IData, AutoCompleteProps } from '../types/interfaces';
import { useAppSelector } from '../redux/hooks';

const AutoComplete = ({ register }: AutoCompleteProps) => {
  const { countries } = useAppSelector((state) => state.countriesState);

  const [search, setSearch] = useState({
    text: '',
    suggestions: [] as IData[],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: IData[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      const countriesCopy = [...countries];
      suggestions = countriesCopy
        .sort()
        .filter((v: IData) => regex.test(v.name));
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

  // console.log(isComponentVisible);

  return (
    <div className="country">
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
