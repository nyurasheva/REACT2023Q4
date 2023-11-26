const Footer = () => {
  return (
    <footer className="footer container">
      <div className="row">{new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
