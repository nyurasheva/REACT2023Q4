import { useState } from 'react';
import { SearchInput } from './SearchInput';
import SearchResult from './SearchResult';

const Content = () => {
  const [, setTextQuery] = useState('');

  const handleSearchChange = (text: string) => {
    setTextQuery(text);
    // setShouldChangePageNumber(true);
  };

  return (
    <main className="content container">
      <div>
        <SearchInput
          onSearch={(searchText: string) => handleSearchChange(searchText)}
        />
      </div>
      <div>
        <SearchResult />
      </div>
    </main>
  );
};

export { Content };
