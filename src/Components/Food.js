import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Food = () => {
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [data, setData] = useState(null);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [msg, setMsg] = useState("Search and Get your Favorite Recipe's");
  const [loading, setLoading] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(true); // Loader for random recipes
  const [error, setError] = useState(false);
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const fetchFood = async () => {
    if (search.trim() === "") {
      setMsg("Please enter a Recipe's Name");
      return; 
    }
    if (search === lastSearch) {
      return; 
    }
    try {
      setError(false)
      setLoading(true); // Set loading for search
      setMsg("Searching for recipes...");
      setLastSearch(search);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      if (!response.ok) {
        throw new Error("Recipes not found");
      }

      const data = await response.json();
      setData(data.meals);
      setMsg("Your Favorite Recipes");
    } catch (err) {
      console.error(err.message); // Log error to console
      setData(null);
      setError("Not found error")
      console.log('error finding',setData)
    } finally {
      setLoading(false); // Stop loading for search
    }
  };

  const fetchRandomRecipes = async () => {
    const numberOfRandomRecipes = 10; 
    setLoadingRandom(true); 
    try {
      const responses = await Promise.all(
        Array.from({ length: numberOfRandomRecipes }).map(() => fetch(`https://www.themealdb.com/api/json/v1/1/random.php`))
      );

      const randomData = await Promise.all(responses.map(response => response.json()));
      const recipes = randomData.map(data => data.meals).flat();
      setRandomRecipes(recipes); 
    } catch (err) {
      console.error("Error fetching random recipes:", err);
    } finally {
      setLoadingRandom(false); 
    }
  };

  useEffect(() => {
    fetchRandomRecipes(); 
  }, []);

  return (
    <>
   <Link to="/">
  <h1 className="header">Recipe Seeker</h1>
</Link>

     
      <div className="container">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Enter Dish"
            value={search}
            onChange={handleInput}
          />
          <button onClick={fetchFood}>
            <FontAwesomeIcon className="fa-search" icon={faSearch} />
          </button>
        </div>
        <h2 className="msg">{msg}</h2>
        <div>
          {loading ? (
            <div id="preloader">
              <div className="loader"></div>
            </div>
          ) : 
            <>{data ? <Cards detail={data} /> : null}
            {error && <p className="error">{"No Result found"}</p>}
</>
          }
          <h2 className='random-title'> Recipes you may like</h2>
          {loadingRandom ? (
<div id="preloader">
              <div className="loader"></div>
            </div>
          ) : (
            <Cards detail={randomRecipes} />
          )}
        </div>
      </div>
    </>
  );
};

export default Food;