import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Recipecard = ({ detail }) => {
  return (
    <div className="recipe">
      {!detail
        ? "Recipe Not Found"
        : detail.map((curItem) => {
            return (
              <div className="recipeImg">
                <img src={curItem.strMealThumb} alt="" />
                <p>{curItem.strMeal}</p>
                <NavLink to={`/${curItem.idMeal}`}>
                  <button>
                    <FontAwesomeIcon className="fa-search" icon={faPlus} /> get
                    recipe
                  </button>
                </NavLink>
              </div>
            );
          })}
    </div>
  );
};

export default Recipecard;
