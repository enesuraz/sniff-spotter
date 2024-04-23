function DogItem({ dog, onChoosenDog, search, onDeleteDog, query }) {
  const searchQuery = query?.split("=")[0];

  function handleClick(e) {
    if (e.target.classList.contains("btn--delete")) {
      onDeleteDog(dog.name);
    } else {
      onChoosenDog(dog.name);
    }
  }

  return (
    <li className="dog-item" role="btn" onClick={handleClick}>
      <img src={dog.image_link} alt={dog.name} />
      {search && (
        <div className="dog-details">
          <span className="dog-name">{dog.name}</span>
          <span className="dog-property">
            {dog[searchQuery]}/5 {searchQuery}
          </span>
        </div>
      )}
      {!search && (
        <>
          <div className="dog-details">
            <span className="dog-name">{dog.name}</span>
            <span className="dog-property">{dog.starRate}/5 Star</span>
          </div>
          <button className="btn btn--delete">&times;</button>
        </>
      )}
    </li>
  );
}

export default DogItem;
