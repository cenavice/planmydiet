import React, { Component } from "react";
const axios = require("axios");

function RecipeData(props) {
  const recipeData = props.data;
  
  if (Object.keys(recipeData).length === 0) {
    return <h2>loading...</h2>;
  }

  return <div className="flex flex-col text-left w-full mt-8 mb-8">
    <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
      {props.data.recipeType}
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
      {/* <li className="lg:w-1/2 mb-1 w-1/2 text-right">
        <p className="text-gray-600">
          Total Time :{" "}
          <span className="text-green-700 font-semibold">
            15 Minutes
          </span>
        </p>
      </li> */}
    </ul>
  </div>;
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
      recipeData: {}
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/fatsecret/get-recipe/")
      .then((response) => {
        this.setState({
          directions: response.data.recipe.directions.direction,
          ingredients: response.data.recipe.ingredients.ingredient,
          numberOfServings: response.data.recipe.number_of_servings,
          recipeDescription: response.data.recipe.recipe_description,
          recipeName: response.data.recipe.recipe_name,
          recipeId: response.data.recipe.recipe_id,
          recipeType: response.data.recipe.recipe_types.recipe_type,
          servingSizes: response.data.recipe.serving_sizes.servings,
          recipeData: {
            recipeDescription: response.data.recipe.recipe_description,
            recipeName: response.data.recipe.recipe_name,
            recipeId: response.data.recipe.recipe_id,
            recipeType: response.data.recipe.recipe_types.recipe_type,
            numberOfServings: response.data.recipe.number_of_servings,
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="https://dummyimage.com/1200x500"
              />
            </div>
            
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
                  <h3 className="text-xs">Amount Per Serving</h3>
                  <h4 className="">
                    Calories<span className="float-right font-bold">330</span>
                  </h4>
                  <hr className="mb-1 mt-1" />
                  <ul>
                    <li className="text-sm text-right font-semibold">
                      % Daily Value*
                    </li>
                    <li className="text-sm font-semibold">
                      Total Fat <span className="text-green-700">3.08g</span>
                      <span className="float-right font-semibold">4%</span>
                    </li>
                    <li className="text-xs ml-3">
                      Saturated Fat{" "}
                      <span className="text-green-700">0.798g</span>
                      <span className="float-right font-semibold">4%</span>
                    </li>
                    <li className="text-xs ml-3">
                      Trans Fat <span className="text-green-700">0.06g</span>
                      <span className="float-right font-semibold"></span>
                    </li>
                    <li className="text-xs ml-3">
                      Polyunsaturated Fat{" "}
                      <span className="text-green-700">0.714g</span>
                      <span className="float-right font-semibold"></span>
                    </li>
                    <li className="text-xs ml-3">
                      Monounsaturated Fat{" "}
                      <span className="text-green-700">0.729g</span>
                      <span className="float-right font-semibold"></span>
                    </li>
                    <li className="text-sm font-semibold">
                      Cholesterol <span className="text-green-700">137mg</span>
                      <span className="float-right font-semibold">46%</span>
                    </li>
                    <li className="text-sm font-semibold">
                      Sodium <span className="text-green-700">1952mg</span>
                      <span className="float-right font-semibold">85%</span>
                    </li>
                    <li className="text-sm font-semibold">
                      Total Carbohydrate{" "}
                      <span className="text-green-700">15.16g</span>
                      <span className="float-right font-semibold">6%</span>
                    </li>
                    <li className="text-xs ml-3">
                      Dietary Fiber <span className="text-green-700">0.6g</span>
                      <span className="float-right font-semibold">2%</span>
                    </li>
                    <li className="text-xs ml-3">
                      Sugars <span className="text-green-700">10g</span>
                      <span className="float-right font-semibold"></span>
                    </li>
                    <li className="text-sm font-semibold">
                      Protein <span className="text-green-700">56.95g</span>
                      <span className="float-right font-semibold">6%</span>
                    </li>
                    <hr className="mb-1 mt-1" />
                    <li className="text-xs">
                      Vitamin D <span className="text-green-700"></span>
                      <span className="float-right"></span>
                    </li>
                    <li className="text-xs">
                      Calcium <span className="text-green-700">46mg</span>
                      <span className="float-right">4%</span>
                    </li>
                    <li className="text-xs">
                      Iron <span className="text-green-700">2.69mg</span>
                      <span className="float-right">15%</span>
                    </li>
                    <li className="text-xs">
                      Potassium <span className="text-green-700">803mg</span>
                      <span className="float-right">17%</span>
                    </li>
                    <li className="text-xs">
                      Vitamin A <span className="text-green-700">14mcg</span>
                      <span className="float-right">2%</span>
                    </li>
                    <li className="text-xs">
                      Vitamin C <span className="text-green-700">12.3mg</span>
                      <span className="float-right">14%</span>
                    </li>
                  </ul>
                  <hr className="mb-1 mt-1" />
                  <p className="text-xs">
                    * The % Daily Value (DV) tells you how much a nutrient in a
                    serving of food contributes to a daily diet. 2,000 calories
                    a day is used for general nutrition advice.
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-300 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
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
