import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const RecipeInfo = () => {
    const { recipeid } = useParams();
    const [info, setInfo] = useState("");
    const [lastInfo, setLastInfo] = useState(""); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const fetchInfo = async () => {
        if (info === lastInfo) {
            return; 
          }
        setLoading(true); 
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                setInfo(data.meals[0]);
                setLastInfo(data.meals[0]); 
            } else {
                setError("No recipe found");
            }
        } catch (err) {
            setError("An error occurred while fetching the recipe.");
            setLoading(false); 
        } 
    };

    
    if (info !== "") {
        fetchInfo();
    }
 

    if (loading) {
        return (
            <div id="preloader">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            {error && <p className="error">{error}</p>}
            {info && (
                <div className="recipeInfo">
                    <img src={info.strMealThumb} alt="" />
                    <div className="info">
                        <h1>Recipe Details</h1>
                        <button>
                            <FontAwesomeIcon className="fa-search" icon={faInfo} />
                            {info.strMeal}
                        </button>
                        <h3>Instructions</h3>
                        <p>{info.strInstructions}</p>
                    </div>
                </div>
            )}
            {!info && <p>No recipes found</p>}
        </>
    );
};

export default RecipeInfo;