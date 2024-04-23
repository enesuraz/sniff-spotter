import DogItem from "./DogItem";

function StatBox({ dogs, onChoosenDog, onDeleteDog }) {
  const dogsNumber = dogs.length;
  const dogsStarRate =
    dogsNumber > 0
      ? (
          dogs.map((d) => d.starRate).reduce((acc, cur) => acc + cur, 0) /
          dogsNumber
        ).toFixed(2)
      : 0;
  return (
    <div className="stat-box">
      <div className="stat-info">
        <h2 className="stat-title">Dogs you choose</h2>
        <div className="stat-details">
          <div className="stat-detail">
            <span>🐱</span> <span>{dogsNumber}</span>
          </div>
          <div className="stat-detail">
            <span>⭐</span> <span>{dogsStarRate}</span>
          </div>
        </div>
      </div>
      <ul className="stat-items">
        {dogs.map((dog) => (
          <DogItem
            key={dog.name}
            dog={dog}
            onChoosenDog={onChoosenDog}
            search={false}
            onDeleteDog={onDeleteDog}
          />
        ))}
      </ul>
    </div>
  );
}

export default StatBox;
