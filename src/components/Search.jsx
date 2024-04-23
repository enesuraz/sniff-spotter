import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <form action="#" className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="ex.;energy=2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchRef}
      />
    </form>
  );
}

export default Search;
