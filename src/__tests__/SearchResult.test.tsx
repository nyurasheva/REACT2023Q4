import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchResult from '../components/SearchResult';
import { Pokemon } from '../context/PokemonContext';

const mockResults: Pokemon[] = [
  { name: 'bulbasaur', url: 'url1', abilities: ['ability1', 'ability2'] },
  { name: 'charmander', url: 'url2', abilities: ['ability3', 'ability4'] },
  { name: 'squirtle', url: 'url3', abilities: ['ability5', 'ability6'] },
];

const mockAbilityDescriptions = {
  bulbasaur: 'Overgrow',
  charmander: 'Blaze',
  squirtle: 'Torrent',
};

const mockImages = {
  bulbasaur: 'bulbasaur-image-url',
  charmander: 'charmander-image-url',
  squirtle: null,
};

describe('SearchResult Component', () => {
  it('renders loading state', () => {
    render(
      <SearchResult
        isLoading={true}
        results={[]}
        abilityDescriptions={{}}
        images={{}}
        selectedId={null}
        onItemClick={() => {}}
        onClosePokemonDetails={() => {}}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles item click', () => {
    const onItemClick = jest.fn();

    render(
      <SearchResult
        isLoading={false}
        results={mockResults}
        abilityDescriptions={mockAbilityDescriptions}
        images={mockImages}
        selectedId={null}
        onItemClick={onItemClick}
        onClosePokemonDetails={() => {}}
      />
    );

    fireEvent.click(screen.getByText(mockResults[0].name));
    expect(onItemClick).toHaveBeenCalledWith(mockResults[0].name);
  });
});
