import React, { useEffect } from 'react';
import { setCurrentPage, setItemsPerPage } from '../redux/pokemonReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const PageInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { itemsPerPage, searchTermValue } = useAppSelector(
    (state) => state.pokemonState
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d+$/.test(newValue) && !searchTermValue) {
      const newItemsPerPage = parseInt(newValue, 10);
      dispatch(setItemsPerPage(newItemsPerPage));
    }
  };

  const handleDecreaseClick = () => {
    if (!searchTermValue) {
      const newItemsPerPage = itemsPerPage - 1;
      if (newItemsPerPage >= 1) {
        dispatch(setItemsPerPage(newItemsPerPage));
      }
    }
  };

  const handleIncreaseClick = () => {
    if (!searchTermValue) {
      const newItemsPerPage = itemsPerPage + 1;
      dispatch(setItemsPerPage(newItemsPerPage));
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, itemsPerPage]);

  return (
    <div className="page-input">
      <label htmlFor="itemsPerPageInput">Кол-во покемонов на странице: </label>
      <div className="changer">
        <button
          className="increase"
          onClick={handleIncreaseClick}
          disabled={!!searchTermValue}
        >
          +
        </button>
        <input
          id="itemsPerPageInput"
          className="amount"
          type="text"
          value={itemsPerPage}
          onChange={handleInputChange}
        />
        <button
          className="decrease"
          onClick={handleDecreaseClick}
          disabled={!!searchTermValue || itemsPerPage === 1}
        >
          −
        </button>
      </div>
    </div>
  );
};

export default PageInput;
