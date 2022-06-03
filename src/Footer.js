const Footer = ({ hive, hiveCount }) => {
  return (
    <footer className="Footer">
      <p>
        Kosnica br: {hive} od ukupno {hiveCount}
      </p>
    </footer>
  );
};

export default Footer;
