// Main.tsx

import { Header } from '../components/Header';
import PokemonSearch from '../components/PokemonSearch';
import { Footer } from '../components/Footer';
import { PokemonProvider } from '../context/PokemonContext';

const Main = () => {
  return (
    <div className="tygh">
      <Header />
      <PokemonProvider>
        <PokemonSearch />
      </PokemonProvider>
      <Footer />
    </div>
  );
};

export { Main };
