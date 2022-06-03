const Add = ({
  handleNewSubmit,
  pregledTitle,
  setPregledTitle,
  pregledBody,
  setPregledBody,
  hive,
  handleDelete,
}) => {
  return (
    <main className="NoviPregled">
      <h2>Nova kosnica br: {hive}</h2>
      <form className="noviPregledForm" onSubmit={handleNewSubmit}>
        <label htmlFor="pregledTitle">Naslov:</label>
        <input
          id="pregledTitle"
          type="text"
          required
          value={pregledTitle}
          onChange={(e) => setPregledTitle(e.target.value)}
        />
        <label htmlFor="pregledBody">Podaci:</label>
        <textarea
          id="pregledBody"
          required
          value={pregledBody}
          onChange={(e) => setPregledBody(e.target.value)}
        />
        <button type="submit">Potvrdi</button>
        <button className="delete" onClick={() => handleDelete()}>
          Obrisi kosnicu
        </button>
      </form>
    </main>
  );
};

export default Add;
