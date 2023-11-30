// Main.tsx

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="tygh">
      <Header />
      <main>
        <h1>Main Page</h1>
        <ul>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">React Hook Form</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export { Main };
