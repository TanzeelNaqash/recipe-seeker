import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Cards = ({ detail }) => {
if(!detail){
  return
}

  return (
    <div className="recipe">
      {detail.map((curItem, index) => (
        <div key={index} className="recipeImg">
          <img src={curItem.strMealThumb} alt={curItem.strMeal} />
          <p>{curItem.strMeal}</p>
          <NavLink to={`/${curItem.idMeal}`}>
            <button>
              <FontAwesomeIcon className="fa-search" icon={faPlus} /> Get Recipe
            </button>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Cards;