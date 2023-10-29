import React, { useEffect, useState } from 'react';

const SearchResult: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // В этом блоке useEffect будет выполнен запрос к выбранному API
    // Используйте `searchQuery` в запросе для поиска

    if (searchQuery) {
      fetch(`https://pokeapi.co/api/v2/pokemon`)
        .then((response) => response.json())
        .then((data) => {
          // Обновите состояние `searchResults` с полученными данными
          setSearchResults(data.results);
        })
        .catch((error) => {
          // Обработка ошибок при запросе
          console.error('Ошибка при выполнении запроса:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div>
      {Array.isArray(searchResults) ? (
        searchResults.map((result, index) => (
          <div key={index}>
            {/* Отображение названия и описания элемента */}
          </div>
        ))
      ) : (
        <div>Результаты поиска не найдены</div>
      )}
    </div>
  );
};

export default SearchResult;
