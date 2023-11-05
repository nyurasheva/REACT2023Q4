import ErrorThrowButton from './ErrorThrowButton';
import { Logo } from './Logo';

const Header = () => {
  return (
    <header className="header container">
      <div className="row">
        <div className="top-logo">
          <Logo />
        </div>
        <ErrorThrowButton />
      </div>
    </header>
  );
};

export { Header };
