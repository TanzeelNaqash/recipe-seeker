import React, { useState } from "react";
import Recipecard from "./Recipecard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    if (search.trim() === "") {
      setError("Please enter a search term");
      return; // Prevents fetching if the search term is empty
    }
    if (search === lastSearch) {
      return; 
    }
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      setLastSearch(search);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      if (!response.ok) {
        throw new Error("Recipes not found");
      }

      const data = await response.json();
      setLoading(false);
      setData(data.meals); 
      console.log(data.meals);
    } catch (err) {
      setError(err.message);
      setData(null);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="preloader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="header">Recipe Seeker</h1>
      <div className="container">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Enter Dish"
            value={search}
            onChange={handleInput}
          />
          <button onClick={fetchData}>
            <FontAwesomeIcon className="fa-search" icon={faSearch} />
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {data && data.length > 0 ? (
          <div>
            <Recipecard detail={data} />
          </div>
        ) : (
          data && <p>No recipes found</p>
        )}
      </div>
    </>
  );
};

export default Homepage;