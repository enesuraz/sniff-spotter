import DogItem from "./DogItem";

function SearchBox({ dogs, onChoosenDog, query }) {
  return (
    <ul className="search-list">
      {dogs.map((dog) => (
        <DogItem
          key={dog.name}
          dog={dog}
          onChoosenDog={onChoosenDog}
          search={true}
          query={query}
        />
      ))}
    </ul>
  );
}

export default SearchBox;
