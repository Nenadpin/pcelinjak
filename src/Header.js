const Header = ({ title, setHive, hive, handleHive }) => {
  return (
    <header className="Header">
      <h1>{title}</h1>
      <input
        placeholder="Broj:"
        className="searchHive"
        autoFocus
        required
        type="text"
        value={hive}
        onFocus={() => setHive("")}
        onChange={(e) => {
          setHive(e.target.value);
          handleHive(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleHive(hive);
        }}
      ></input>
    </header>
  );
};

export default Header;
