import { useRef, useState } from "react";

const Add = ({
  handleNewSubmit,
  pregledTitle,
  setPregledTitle,
  pregledBody,
  setPregledBody,
  hive,
  opis,
  setOpis,
}) => {
  const body = useRef();
  const [queen, setQueen] = useState(opis.matica);
  const [hiveType, setHiveType] = useState(opis.tip);
  return (
    <main className="NoviPregled">
      <h2>
        Nova kosnica br: {hive}
        <span>
          <label htmlFor="matica">Matica? </label>
          <input
            type="checkbox"
            id="matica"
            checked={queen}
            onChange={() => setQueen(!queen)}
          ></input>
        </span>
        <span>
          <label htmlFor="tip">Tip: </label>
          <select
            id="tip"
            value={hiveType}
            onChange={(e) => setHiveType(e.target.value)}
          >
            <option value="db">DadanBlat</option>
            <option value="fa">Farar</option>
            <option value="all">Kombinovana</option>
          </select>
        </span>
      </h2>
      <form className="noviPregledForm" onSubmit={handleNewSubmit}>
        <label htmlFor="pregledTitle">Datum:</label>
        <input
          id="pregledTitle"
          type="date"
          required
          onChange={(e) => {
            setPregledTitle(e.target.value);
            // body.target.focus();
            setOpis({
              matica: queen,
              tip: hiveType,
            });
          }}
        />
        <label htmlFor="pregledBody">Podaci:</label>
        <textarea
          id="pregledBody"
          required
          ref={body}
          value={pregledBody}
          onChange={(e) => setPregledBody(e.target.value)}
        />
        <button type="submit">Potvrdi</button>
      </form>
    </main>
  );
};

export default Add;
