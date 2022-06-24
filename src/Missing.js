import { Link } from "react-router-dom";
import data from "./data.json";

const Missing = ({ apiary, setHive, handleHive }) => {
  const loadData = () => {
    if (!localStorage.getItem("apiary")) {
      localStorage.setItem("apiary", JSON.stringify(data.apiary));
      window.location.reload(false);
    }
  };
  return (
    <main className="Missing">
      {apiary.length ? (
        <section>
          {apiary.map((item) => (
            <button
              style={{
                backgroundColor:
                  item.opis.tip === "db"
                    ? "white"
                    : item.opis.tip === "fa"
                    ? "lightgreen"
                    : "goldenrod",
                color: !item.opis.matica ? "red" : "black",
              }}
              onClick={() => {
                setHive(item.no);
                handleHive(item.no);
              }}
              key={item.no}
            >
              {item.no}
            </button>
          ))}
        </section>
      ) : null}
      <h2>Nemate takvu kosnicu</h2>
      <p>Kreirajte novu ili izaberite kosnicu iz liste.</p>
      <p>
        <Link to="/Add">Kreiraj novu kosnicu</Link>
        {!localStorage.getItem("apiary") ? (
          <p
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            onClick={loadData}
          >
            Ucitaj pocetne podatke
          </p>
        ) : null}
      </p>
    </main>
  );
};

export default Missing;
