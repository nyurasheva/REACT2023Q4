import Image from 'next/image';
import { useRouter } from 'next/router';
import { MAIN_ROUTE } from '../constants/route';

const Logo = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    router.push(MAIN_ROUTE);
  };

  return (
    <div className="logo-container" onClick={handleClick}>
      <Image
        className="logo-container__image"
        alt="logo"
        title=""
        src="/logo.png"
        priority={true}
        width={100}
        height={100}
      />
    </div>
  );
};

export { Logo };
