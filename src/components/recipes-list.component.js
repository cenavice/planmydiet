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
            alt="recipe_image"
            className="object-cover object-center w-full h-full block"
            src={recipe.recipe_image}
          />
        </Link>
        <div className="mt-4">
          {/* <h3 className="text-green-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3> */}
          <Link
          to={"/recipe/" + recipe.recipe_id}
            className="text-gray-900 title-font text-lg font-medium"
          >
            {recipe.recipe_name}
          </Link>
          <p className="leading-relaxed text-base">
            {recipe.recipe_description}
          </p>
          <p className="leading-relaxed text-xs font-medium mt-1">
            Per serve - Energy: {recipe.recipe_nutrition.calories}kcal <br />{" "}
            Carb: {recipe.recipe_nutrition.carbohydrate}g | Prot:{" "}
            {recipe.recipe_nutrition.protein}g | Fat:{" "}
            {recipe.recipe_nutrition.fat}g
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

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      recipes: [],
      maxResults: "",
      pageNumber: "",
      totalResults: "",
      searchExpression: "",
      searchResultText: "",
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeSearch(e) {
    this.setState({
      searchExpression: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(e);
    const search = {
      searchExpression: this.state.searchExpression,
      pageNumber: 1,
      maxResults: 20,
    }

    console.log(search);

    axios
      .post("http://localhost:5000/fatsecret/search-recipe/", search)
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: response.data.recipes.max_results,
          pageNumber: response.data.recipes.page_number,
          totalResults: response.data.recipes.total_results,
          searchResultText: 'Showing search result for : ' + this.state.searchExpression,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // window.location = '/';
  }

  render() {
    return (
      <section className="text-gray-700 body-font">
        <div className="container px-5 pt-10 mx-auto">
          <div className="mb-12 text-center w-full">
            <p className="mb-3 leading-relaxed">
              {this.state.searchResultText}
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="flex w-3/6 mx-auto">
                  <input
                    className="flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
                    placeholder="Search Recipe"
                    type="text"
                    value={this.state.searchExpression}
                    onChange={this.onChangeSearch}
                  />
                  <input
                    type="submit"
                    className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                    value="search"
                  />
              </div>
            </form>
          </div>
          <RecipeCards recipes={this.state.recipes} />
        </div>
      </section>
    );
  }
}
