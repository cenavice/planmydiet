import React, { Component } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function RecipeCards(props) {
  const recipes = props.recipes;

  let listItems = "loading...";

  if (recipes.length !== 0) {
    listItems = recipes.map((recipe) => (
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={recipe.recipe_id}>
        <Link
          to={"/recipe/" + recipe.recipe_id}
          className="block relative h-48 rounded overflow-hidden"
        >
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={recipe.recipe_image}
          />
        </Link>
        <div className="mt-4">
          {/* <h3 className="text-green-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3> */}
          <a
            href="detail-recipe.html"
            className="text-gray-900 title-font text-lg font-medium"
          >
            {recipe.recipe_name}
          </a>
          <p className="leading-relaxed text-base">
            {recipe.recipe_description}
          </p>
          <p className="leading-relaxed text-xs font-medium mt-1">
            Per serve - Energy: {recipe.recipe_nutrition.calories}kcal <br /> Carb: {recipe.recipe_nutrition.carbohydrate}g | Prot: {recipe.recipe_nutrition.protein}g |
            Fat: {recipe.recipe_nutrition.fat}g
          </p>
        </div>
      </div>
    ));
  }

  return <div className="flex flex-wrap -m-4">{listItems}</div>;
}

export default class RecipesList extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      recipes: [],
      maxResults: "",
      pageNumber: "",
      totalResults: "",
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/fatsecret/search-recipe/")
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: response.data.recipes.max_results,
          pageNumber: response.data.recipes.page_number,
          totalResults: response.data.recipes.total_results,
        });

        console.log(this.state.recipes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <section className="text-gray-700 body-font">
        <div className="container px-5 pt-10 mx-auto">
          <div className="mb-12 text-center w-full">
            <p className="mb-3 leading-relaxed">
              Showing search result for : Chicken
            </p>
            <div className="flex w-3/6 mx-auto">
              <input
                className="flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
                placeholder="Search Recipe"
                type="text"
              />
              <a
                href="recipe.html"
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Search
              </a>
            </div>
          </div>
          <RecipeCards recipes={this.state.recipes} />
        </div>
      </section>
    );
  }
}
