import React from 'react';

interface ItemsPerPageInputProps {
  itemsPerPage: number;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

const PageInput: React.FC<ItemsPerPageInputProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d+$/.test(newValue)) {
      const newItemsPerPage = parseInt(newValue, 10);
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const handleInputBlur = () => {
    onItemsPerPageChange(itemsPerPage);
  };

  const handleDecreaseClick = () => {
    const newItemsPerPage = itemsPerPage - 1;
    if (newItemsPerPage >= 1) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const handleIncreaseClick = () => {
    const newItemsPerPage = itemsPerPage + 1;
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div className="page-input">
      <label>Кол-во покемонов на странице: </label>
      <div className="changer">
        <button className="increase" onClick={handleIncreaseClick}>
          +
        </button>
        <input
          className="amount"
          type="text"
          value={itemsPerPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <button className="decrease" onClick={handleDecreaseClick}>
          −
        </button>
      </div>
    </div>
  );
};

export default PageInput;
