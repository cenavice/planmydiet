import React, { Component } from "react";
import Nutrition from "./nutrition.component";
const axios = require("axios");

function RecipeData(props) {
  const recipeData = props.data;
  let recipeType;
  let recipeImage;

  if (Object.keys(recipeData).length === 0) {
    return <h2>loading...</h2>;
  }

  recipeType = props.data.recipeType;
  if (Array.isArray(recipeType) && recipeType.length > 1) {
    recipeType = props.data.recipeType[0];
  }

  recipeImage = props.data.recipeImage;
  console.log(recipeData);
  const cookingTimeMin = parseInt(recipeData.cookingTimeMin);
  const preparationTimeMin = parseInt(recipeData.preparationTimeMin);
  const totalTime =
    (Number.isInteger(cookingTimeMin) ? cookingTimeMin : 0) +
    Number.isInteger(preparationTimeMin)
      ? preparationTimeMin
      : 0;

  return (
    <div>
      <div className="flex justify-center rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full"
          src={recipeImage}
        />
      </div>
      <div className="flex flex-col text-left w-full mt-8 mb-8">
        <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
          {recipeType}
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          {props.data.recipeName}
        </h1>
        <p className="leading-relaxed text-base">
          {props.data.recipeDescription}
        </p>
        <ul className="flex flex-wrap list-none mt-3">
          <li className="lg:w-1/2 mb-1 w-1/2 text-left">
            <p className="text-gray-600">
              Yields :{" "}
              <span className="text-green-700 font-semibold">
                {props.data.numberOfServings} Servings
              </span>
            </p>
          </li>
          {totalTime > 0 && (
            <li className="lg:w-1/2 mb-1 w-1/2 text-right">
              <p className="text-gray-600">
                Total Time :{" "}
                <span className="text-green-700 font-semibold">
                  {totalTime} Minutes
                </span>
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function IngredientList(props) {
  const ingredients = props.ingredients;

  let listItems = "loading...";

  if (ingredients.length !== 0) {
    listItems = ingredients.map((ingredient) => (
      <li className="mt-1" key={ingredient.food_id}>
        {ingredient.ingredient_description}
      </li>
    ));
  }

  return <ul>{listItems}</ul>;
}

function DirectionList(props) {
  const directions = props.directions;

  let listItems = "loading...";

  if (directions.length !== 0) {
    listItems = directions.map((direction) => (
      <li className="mt-3" key={direction.direction_number}>
        {direction.direction_description}
      </li>
    ));
  }

  return <ol className="list-decimal">{listItems}</ol>;
}

export default class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      directions: [],
      ingredients: [],
      numberOfServings: "",
      recipeDescription: "",
      recipeName: "",
      recipeId: "",
      recipeType: "",
      servingSizes: [],
      recipeData: {},
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/fatsecret/get-recipe/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          directions: response.data.recipe.directions.direction,
          ingredients: response.data.recipe.ingredients.ingredient,
          numberOfServings: response.data.recipe.number_of_servings,
          recipeDescription: response.data.recipe.recipe_description,
          recipeName: response.data.recipe.recipe_name,
          recipeId: response.data.recipe.recipe_id,
          recipeType: response.data.recipe.recipe_types.recipe_type,
          servingSizes: response.data.recipe.serving_sizes.serving,
          recipeData: {
            recipeImage: response.data.recipe.recipe_images.recipe_image,
            recipeDescription: response.data.recipe.recipe_description,
            recipeName: response.data.recipe.recipe_name,
            recipeId: response.data.recipe.recipe_id,
            recipeType: response.data.recipe.recipe_types.recipe_type,
            numberOfServings: response.data.recipe.number_of_servings,
            cookingTimeMin: response.data.recipe.cooking_time_min,
            preparationTimeMin: response.data.recipe.preparation_time_min,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <section className="text-gray-700 body-font">
        <div className="container px-5 pt-10 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <RecipeData data={this.state.recipeData} />
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="text-left mb-6">
                  <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                    Ingredients
                  </h2>
                  <IngredientList ingredients={this.state.ingredients} />
                </div>
                <div className="text-left">
                  <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                    Nutrition Facts
                  </h2>
                  <Nutrition nutiritions={this.state.servingSizes} />
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-300 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 sm:text-left">
                <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                  Directions
                </h2>
                <DirectionList directions={this.state.directions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
