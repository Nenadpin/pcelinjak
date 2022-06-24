import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NoviPregled from "./NoviPregled";
import PregledPage from "./PregledPage";
import Add from "./Add";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [hive, setHive] = useState("");
  const [hiveCount, setHiveCount] = useState(0);
  const [apiary, setApiary] = useState([]);
  const [i, setI] = useState();
  const [pregledi, setPregledi] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pregledTitle, setPregledTitle] = useState("");
  const [pregledBody, setPregledBody] = useState("");
  const [opis, setOpis] = useState({
    matica: true,
    tip: "db",
  });
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("apiary"))) {
      setApiary(JSON.parse(localStorage.getItem("apiary")));
      setHiveCount(apiary.length);
    } else setHiveCount(0);
  }, [apiary.length]);

  useEffect(() => {
    const filteredResults = pregledi.filter(
      (pregled) =>
        pregled.body.toLowerCase().includes(search.toLowerCase()) ||
        pregled.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [pregledi, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = pregledi.length ? pregledi[pregledi.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const noviPregled = {
      id,
      title: pregledTitle,
      datetime,
      body: pregledBody,
    };
    const allPregledi = [...pregledi, noviPregled];
    setPregledi(allPregledi);
    apiary[i].details.push(noviPregled);
    if (apiary[i].opis) {
      apiary[i].opis.matica = opis.matica;
      apiary[i].opis.tip = opis.tip;
    } else {
      apiary[i] = { ...apiary[i], opis };
    }
    localStorage.setItem("apiary", JSON.stringify(apiary));
    setPregledTitle("");
    setPregledBody("");
    history.push("/");
  };

  const handleNewSubmit = (e) => {
    if (hive) {
      e.preventDefault();
      const id = 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      let allNew = [];
      const newHive = {
        id,
        title: pregledTitle,
        datetime,
        body: pregledBody,
      };
      allNew[0] = newHive;
      setPregledTitle("");
      setPregledBody("");
      history.push("/");
      if (apiary.findIndex((x) => x.no.toString() === hive) !== -1) {
        alert("Vec imate kosnicu sa tim brojem!");
        setHive("");
        return;
      }
      apiary.push({
        no: Number(hive),
        details: allNew,
        opis: opis,
      });
      localStorage.setItem("apiary", JSON.stringify(apiary));
    } else alert("Unesite broj kosnice!");
  };

  const handleHive = (h) => {
    let index = apiary.findIndex((x) => x.no.toString() === h.toString());
    if (index !== -1) {
      setPregledi(apiary[index].details);
      if (apiary[index].opis) setOpis(apiary[index].opis);
      setHive(h);
      setI(index);
    } else {
      setPregledi([]);
      // setOpis({});
    }
  };

  const handleDelete = () => {
    if (hive) {
      apiary.splice(i, 1);
      localStorage.setItem("apiary", JSON.stringify(apiary));
      setHive("");
      setHiveCount(hiveCount - 1);
    }
  };

  return (
    <div className="App">
      <Header
        title="Izbor kosnice:"
        hive={hive}
        handleHive={handleHive}
        setHive={setHive}
      />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          {hive ? (
            <Home pregledi={searchResults} handleDelete={handleDelete} />
          ) : (
            <Missing
              apiary={apiary}
              setHive={setHive}
              handleHive={handleHive}
            />
          )}
        </Route>
        <Route exact path="/pregled">
          {hive ? (
            <NoviPregled
              handleSubmit={handleSubmit}
              pregledTitle={pregledTitle}
              setPregledTitle={setPregledTitle}
              pregledBody={pregledBody}
              setPregledBody={setPregledBody}
              opis={opis}
              setOpis={setOpis}
            />
          ) : (
            <Missing
              apiary={apiary}
              setHive={setHive}
              handleHive={handleHive}
            />
          )}
        </Route>
        <Route path="/pregled/:id">
          {hive ? (
            <PregledPage pregledi={pregledi} />
          ) : (
            <Missing
              apiary={apiary}
              setHive={setHive}
              handleHive={handleHive}
            />
          )}
        </Route>
        <Route path="/add">
          <Add
            handleNewSubmit={handleNewSubmit}
            pregledTitle={pregledTitle}
            setPregledTitle={setPregledTitle}
            pregledBody={pregledBody}
            setPregledBody={setPregledBody}
            hive={hive}
            opis={opis}
            setOpis={setOpis}
          />
        </Route>
        <Route path="*">
          <Missing apiary={apiary} setHive={setHive} handleHive={handleHive} />
        </Route>
      </Switch>
      <Footer hive={hive} hiveCount={hiveCount} />
    </div>
  );
}

export default App;
