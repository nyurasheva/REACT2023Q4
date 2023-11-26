import Image from 'next/image';

const Logo = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
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
