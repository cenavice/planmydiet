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
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);

    this.state = {
      recipes: [],
      maxResults: 20,
      pageNumber: 1,
      totalResults: 0,
      searchExpression: "",
      searchResultText: "",
    };
  }

  componentDidMount() {
    const search = {
      searchExpression: this.state.searchExpression,
      pageNumber: this.state.pageNumber,
      maxResults: this.state.maxResults,
    };

    axios
      .post("http://localhost:5000/fatsecret/search-recipe/", search)
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: parseInt(response.data.recipes.max_results),
          pageNumber: parseInt(response.data.recipes.page_number),
          totalResults: parseInt(response.data.recipes.total_results),
        });

        console.log(this.state);
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

    const search = {
      searchExpression: this.state.searchExpression,
      pageNumber: this.state.pageNumber,
      maxResults: this.state.maxResults,
    };

    axios
      .post("http://localhost:5000/fatsecret/search-recipe/", search)
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: parseInt(response.data.recipes.max_results),
          pageNumber: parseInt(response.data.recipes.page_number),
          totalResults: parseInt(response.data.recipes.total_results),
          searchResultText:
            "Showing search result for : " + this.state.searchExpression,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onPrevious() {
    const search = {
      searchExpression: this.state.searchExpression,
      pageNumber: this.state.pageNumber - 1,
      maxResults: this.state.maxResults,
    };

    axios
      .post("http://localhost:5000/fatsecret/search-recipe/", search)
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: parseInt(response.data.recipes.max_results),
          pageNumber: parseInt(response.data.recipes.page_number),
          totalResults: parseInt(response.data.recipes.total_results),
          searchResultText:
            "Showing search result for : " + this.state.searchExpression,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onNext() {
    const search = {
      searchExpression: this.state.searchExpression,
      pageNumber: this.state.pageNumber + 1,
      maxResults: this.state.maxResults,
    };

    axios
      .post("http://localhost:5000/fatsecret/search-recipe/", search)
      .then((response) => {
        this.setState({
          recipes: response.data.recipes.recipe,
          maxResults: parseInt(response.data.recipes.max_results),
          pageNumber: parseInt(response.data.recipes.page_number),
          totalResults: parseInt(response.data.recipes.total_results),
          searchResultText:
            "Showing search result for : " + this.state.searchExpression,
        });
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

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-3">
            <div className="flex-1 flex justify-between sm:hidden">
              <Link
                to="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Previous
              </Link>
              <Link
                to="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Next
              </Link>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm leading-5 text-gray-700">
                  Showing <span className="font-medium">{(this.state.pageNumber - 1) * this.state.maxResults + 1}</span> to{" "}
                  <span className="font-medium">{(this.state.pageNumber - 1) * this.state.maxResults + this.state.maxResults}</span> of{" "}
                  <span className="font-medium">{this.state.totalResults}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex shadow-sm">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Previous"
                    onClick={this.onPrevious}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    3
                  </button>
                  <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                    ...
                  </span>
                  <button
                    type="button"
                    className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    8
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    9
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    10
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Next"
                    onClick={this.onNext}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
