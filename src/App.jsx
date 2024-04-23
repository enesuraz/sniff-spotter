import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NavResults from "./components/NavResults";
import Search from "./components/Search";
import SearchBox from "./components/SearchBox";
import StatBox from "./components/StatBox";
import { useEffect, useState } from "react";
import Box from "./components/Box";
import Loader from "./components/Loader";
import InfoBox from "./components/InfoBox";
import Error from "./components/Error";
import { useLocalStorage } from "./hooks/useLocalStorage";

const API_ENDPOINT = "https://api.api-ninjas.com/v1/dogs/";
const API_KEY = "RmNJ0WTgE+a1Q3U4FhmYzA==7mr6lfj7u7goInVk";

function App() {
  const [query, setQuery] = useState("");
  const [dogs, setDogs] = useState([]);
  const [dogsLoading, setDogsIsLoading] = useState(false);
  const [dogsError, setDogsError] = useState("");
  const [choosenDog, setChoosenDog] = useState(undefined);
  const [dog, setDog] = useState({});
  const [dogLoading, setDogLoading] = useState(false);
  const [dogError, setDogError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [resultQuery, setResultQuery] = useState("energy");

  const [listDogs, setListDogs] = useLocalStorage([], "dogs");

  function handleChoosenDog(dogName) {
    setChoosenDog(dogName);
    setIsOpen(true);
  }

  function handleAddListDog(dog) {
    setListDogs((oldDogs) => [...oldDogs, dog]);
    setIsOpen(false);
  }

  function handleDeleteDog(name) {
    setListDogs((oldDogs) => oldDogs.filter((d) => d.name !== name));
  }

  function handleIsOpen() {
    setIsOpen(false);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function getDogs() {
        try {
          setDogError("");
          setDogsIsLoading(true);
          const res = await fetch(`${API_ENDPOINT}?${query}`, {
            headers: {
              "X-API-KEY": API_KEY,
            },
            signal: controller.signal,
          });

          const data = await res.json();
          setDogs(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setDogsError(err.message);
          }
        } finally {
          setDogsIsLoading(false);
        }
      }

      const filteredObjects = [
        "protectiveness",
        "shedding",
        "trainability",
        "energy",
        "barking",
      ];

      const filteredString = query?.split("=");

      if (
        filteredObjects.includes(filteredString[0]) &&
        ["1", "2", "3", "4", "5"].includes(filteredString[1])
      ) {
        getDogs();
        setResultQuery(filteredString[0]);
        setDogsError("");
        handleIsOpen();
      }

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(
    function () {
      async function getDog() {
        try {
          setDogError("");
          setDogLoading(true);
          const res = await fetch(`${API_ENDPOINT}?name=${choosenDog}`, {
            headers: {
              "X-API-KEY": API_KEY,
            },
          });
          const data = await res.json();
          setDog(data[0]);
        } catch (err) {
          setDogError(err.message);
        } finally {
          setDogLoading(false);
        }
      }
      getDog();
    },
    [choosenDog]
  );

  return (
    <div className="app">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NavResults dogs={dogs} />
      </Navbar>
      <Main>
        <Box>
          {dogsLoading && <Loader />}
          {!dogsError && !dogsLoading && (
            <SearchBox
              dogs={dogs}
              onChoosenDog={handleChoosenDog}
              query={resultQuery}
            />
          )}
          {dogError && <Error />}
        </Box>
        <Box>
          {choosenDog && dogLoading && <Loader />}
          {dog && isOpen && !dogLoading && !dogError && (
            <InfoBox
              dog={dog}
              onAddDogList={handleAddListDog}
              onIsOpen={handleIsOpen}
              listDogs={listDogs}
            />
          )}
          {choosenDog && dogError && <Error />}
          {!isOpen && (
            <StatBox
              dogs={listDogs}
              onChoosenDog={handleChoosenDog}
              onDeleteDog={handleDeleteDog}
            />
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
