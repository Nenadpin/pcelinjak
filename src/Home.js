import Feed from "./Feed";

const Home = ({ pregledi, handleDelete }) => {
  return (
    <main className="Home">
      {pregledi.length ? (
        <Feed pregledi={pregledi} handleDelete={handleDelete} />
      ) : (
        <p style={{ marginTop: "2rem" }}>
          Nema pregleda za ovu kosnicu sa trazenim podacima.
        </p>
      )}
    </main>
  );
};

export default Home;
