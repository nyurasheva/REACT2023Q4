import React from 'react';
import { setItemsPerPage } from '../redux/pokemonReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const PageInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemsPerPage = useAppSelector(
    (state) => state.pokemonState.itemsPerPage
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d+$/.test(newValue)) {
      const newItemsPerPage = parseInt(newValue, 10);
      dispatch(setItemsPerPage(newItemsPerPage));
    }
  };

  const handleDecreaseClick = () => {
    const newItemsPerPage = itemsPerPage - 1;
    if (newItemsPerPage >= 1) {
      dispatch(setItemsPerPage(newItemsPerPage));
    }
  };

  const handleIncreaseClick = () => {
    const newItemsPerPage = itemsPerPage + 1;
    dispatch(setItemsPerPage(newItemsPerPage));
  };

  return (
    <div className="page-input">
      <label htmlFor="itemsPerPageInput">Кол-во покемонов на странице: </label>
      <div className="changer">
        <button className="increase" onClick={handleIncreaseClick}>
          +
        </button>
        <input
          id="itemsPerPageInput"
          className="amount"
          type="text"
          value={itemsPerPage}
          onChange={handleInputChange}
        />
        <button className="decrease" onClick={handleDecreaseClick}>
          −
        </button>
      </div>
    </div>
  );
};

export default PageInput;
