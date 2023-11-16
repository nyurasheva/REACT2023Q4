// Main.tsx

import { Header } from '../components/Header';
import { PokemonSearch } from '../components/PokemonSearch';
import { Footer } from '../components/Footer';

const Main = () => {
  return (
    <div className="tygh">
      <Header />
      <PokemonSearch />
      <Footer />
    </div>
  );
};

export { Main };
