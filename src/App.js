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
  const [pregledi, setPregledi] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pregledTitle, setPregledTitle] = useState("");
  const [pregledBody, setPregledBody] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("hiveCount"))) {
      setHiveCount(JSON.parse(localStorage.getItem("hiveCount")));
    } else setHiveCount(0);
  }, []);

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
    localStorage.setItem(hive, JSON.stringify(allPregledi));
    setPregledTitle("");
    setPregledBody("");
    history.push("/");
  };

  const handleNewSubmit = (e) => {
    if (hive) {
      e.preventDefault();
      const newHiveNo = hive;
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
      if (JSON.parse(localStorage.getItem(hive))) {
        alert("Vec imate kosnicu sa tim brojem!");
        setHive("");
        return;
      }
      localStorage.setItem(newHiveNo, JSON.stringify(allNew));
      localStorage.setItem("hiveCount", JSON.stringify(hiveCount + 1));
      setHiveCount(hiveCount + 1);
    } else alert("Unesite broj kosnice!");
  };

  const handleHive = (h) => {
    if (JSON.parse(localStorage.getItem(h))) {
      setPregledi(JSON.parse(localStorage.getItem(h)));
      setHive(h);
    } else {
      setPregledi([]);
      setHive("");
    }
  };
  const handleDelete = () => {
    if (hive) {
      localStorage.removeItem(hive);
      localStorage.setItem("hiveCount", JSON.stringify(hiveCount - 1));
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
            <Home pregledi={searchResults} />
          ) : (
            <Route path="*" component={Missing} />
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
            />
          ) : (
            <Route path="*" component={Missing} />
          )}
        </Route>
        <Route path="/pregled/:id">
          {hive ? (
            <PregledPage pregledi={pregledi} />
          ) : (
            <Route path="*" component={Missing} />
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
            handleDelete={handleDelete}
          />
        </Route>
        <Route path="*" component={Missing} />
      </Switch>
      <Footer hive={hive} hiveCount={hiveCount} />
    </div>
  );
}

export default App;
