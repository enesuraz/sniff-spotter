import { useEffect, useState } from "react";
import InfoGrid from "./InfoGrid";
import StarRating from "./StarRating";

function InfoBox({ dog, onAddDogList, onIsOpen, listDogs }) {
  const [star, setStar] = useState(0);

  function handleStar(star) {
    setStar(star);
  }

  const isList = listDogs.find((d) => d.name === dog.name);

  useEffect(() => {
    if (!dog.name) return;
    document.title = `Dog | ${dog.name}`;

    return function () {
      document.title = "SniffSpotter";
    };
  }, [dog.name]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onIsOpen();
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onIsOpen]);

  return (
    <div className="info-box">
      <img src={dog.image_link} alt={dog.name} />
      <div className="info-box-details">
        <h2 className="info-name">{dog.name}</h2>
        <div className="info-rate">
          {isList ? (
            <p>Already in list</p>
          ) : (
            <>
              <StarRating maxRating={5} size={24} onSetRating={handleStar} />
              {star !== 0 && (
                <button
                  className="btn-secondary"
                  onClick={() => onAddDogList({ ...dog, starRate: star })}
                >
                  Add to list
                </button>
              )}
            </>
          )}
        </div>
        <InfoGrid dog={dog} />
      </div>
      <button className="btn btn--back" onClick={onIsOpen}>
        ⬅
      </button>
    </div>
  );
}

export default InfoBox;
