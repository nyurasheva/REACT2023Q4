// AutoComplete.tsx

import { ChangeEvent, useEffect, useState } from 'react';
import { AutoCompleteProps, IData } from '../types/interfaces';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { setFormData } from '../redux/formReducer';

const AutoComplete = ({ register }: AutoCompleteProps) => {
  const dispatch = useDispatch();
  const { countries } = useAppSelector((state) => state.countriesState);
  const { formData } = useAppSelector((state) => state.formState);

  const [search, setSearch] = useState({
    text: '',
    suggestions: [] as IData[],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const handleTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSuggestionSelected = (value: IData) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.name,
      suggestions: [],
    });

    dispatch(setFormData({ ...formData, country: value.name }));
  };

  useEffect(() => {
    if (!search.text && formData.country !== '') {
      dispatch(setFormData({ ...formData, country: '' }));
    }
  }, [search.text, formData.country, dispatch, formData]);

  const { suggestions } = search;

  return (
    <div className="country">
      <div>
        <input
          {...(register && register('country'))}
          id="input"
          name="country"
          autoComplete="off"
          value={search.text}
          onChange={handleTextChanged}
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
                onClick={() => handleSuggestionSelected(item)}
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
