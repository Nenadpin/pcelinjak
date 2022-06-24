import Pregled from "./Pregled";

const Feed = ({ pregledi, handleDelete }) => {
  return (
    <>
      {pregledi.map((pregled) => (
        <Pregled key={pregled.id} pregled={pregled} />
      ))}
      <button className="delete" onClick={() => handleDelete()}>
        Obrisi kosnicu
      </button>
    </>
  );
};

export default Feed;
