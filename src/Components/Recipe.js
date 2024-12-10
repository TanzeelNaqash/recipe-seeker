import React, { useState, useEffect } from "react";
import { NavLink,Link, json, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const Recipe = ({ detail }) => {
  const [data, setData] = useState();
  const { recipeid } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchrecipe = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`
      );
      console.log('recipe response',response)
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setLoading(false);
        setData(data.meals[0]);
        console.log(data.meals[0])
      } else {
        setError("No recipe found recipe");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while fetching the recipe.");
      console.log('error is',err);
    }
  };
 useEffect(() => {
  fetchrecipe()
 }, [recipeid]);
 
 if (loading) {
  return (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  );
}

  return (
    <>
     <Link  to="/" id="link">
  <h1 className="header">Recipe Seeker</h1>
</Link>
    {error && <p className="error">{error}</p>}
    {data && (
        <div className="recipeInfo">
            <img src={data.strMealThumb} alt="" />
            <div className="info">
                <h1>Recipe Details</h1>
                <button>
                    <FontAwesomeIcon className="fa-search" icon={faInfo} />
                </button>
                <span >{data.strMeal}</span>
                <p>Category: {data.strCategory}</p>

                <ul>
      {Object.keys(data)
        .filter(key => key.includes('strIngredient') && data[key]) // Check for valid ingredients
        .map((key, index) => (
          <li key={index}>
            {data[key]} {data[`strMeasure${index + 1}`] && `(${data[`strMeasure${index + 1}`]})`}
          </li>
        ))}
    </ul>

                <h3>Instructions</h3>
                
                <p>{data.strInstructions}</p>
            </div>
        </div>
    )}
    {!data && <p>No recipes found recipe</p>}
</>
  );
};

export default Recipe;
