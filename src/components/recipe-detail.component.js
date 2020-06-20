import React, { Component } from 'react';
const axios = require('axios');

export default class RecipeDetail extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            recipe: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/fatsecret/get-recipe/')
            .then(response => {
                this.setState({
                    recipe: response.data.recipe,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
      
    render() {
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-64 overflow-hidden">
                        <img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1200x500"/>
                        </div>
                        <div className="flex flex-col text-left w-full mt-8 mb-8">
                            <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Dessert</h2>
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{ this.state.recipe.recipe_name }</h1>
                            <p className="leading-relaxed text-base">{ this.state.recipe.recipe_description }</p>
                            <ul className="flex flex-wrap list-none mt-3">
                                <li className="lg:w-1/2 mb-1 w-1/2 text-left">
                                <p className="text-gray-600">Yields : <span className="text-green-700 font-semibold">6 Servings</span></p>
                                </li>
                                <li className="lg:w-1/2 mb-1 w-1/2 text-right">
                                <p className="text-gray-600">Total Time : <span className="text-green-700 font-semibold">15 Minutes</span></p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="text-left mb-6">
                                <h2 className="text-gray-900 text-xl title-font font-medium mb-1">Ingredients</h2>
                                <ul>
                                    <li className="mt-1">1 lb ground beef</li>
                                    <li className="mt-1">1 egg</li>
                                    <li className="mt-1">2 cups water</li>
                                    <li className="mt-1">4 cloves of garlic</li>
                                    <li className="mt-1">1 tsp freshly ground black pepper</li>
                                    <li className="mt-1">4 large bell peppers</li>
                                    <li className="mt-1">1 cup finley grated parmigiano reggiano</li>
                                </ul>
                            </div>
                            <div className="text-left">
                                <h2 className="text-gray-900 text-xl title-font font-medium mb-1">Nutrition Facts</h2>
                                <h3 className="text-xs">Amount Per Serving</h3>
                                <h4 className="">Calories<span className="float-right font-bold">330</span></h4>
                                <hr className="mb-1 mt-1"/>
                                <ul>
                                    <li className="text-sm text-right font-semibold">% Daily Value*</li>
                                    <li className="text-sm font-semibold">Total Fat <span className="text-green-700">3.08g</span><span className="float-right font-semibold">4%</span></li>
                                    <li className="text-xs ml-3">Saturated Fat <span className="text-green-700">0.798g</span><span className="float-right font-semibold">4%</span></li>
                                    <li className="text-xs ml-3">Trans Fat <span className="text-green-700">0.06g</span><span className="float-right font-semibold"></span></li>
                                    <li className="text-xs ml-3">Polyunsaturated Fat <span className="text-green-700">0.714g</span><span className="float-right font-semibold"></span></li>
                                    <li className="text-xs ml-3">Monounsaturated Fat <span className="text-green-700">0.729g</span><span className="float-right font-semibold"></span></li>
                                    <li className="text-sm font-semibold">Cholesterol <span className="text-green-700">137mg</span><span className="float-right font-semibold">46%</span></li>
                                    <li className="text-sm font-semibold">Sodium <span className="text-green-700">1952mg</span><span className="float-right font-semibold">85%</span></li>
                                    <li className="text-sm font-semibold">Total Carbohydrate <span className="text-green-700">15.16g</span><span className="float-right font-semibold">6%</span></li>
                                    <li className="text-xs ml-3">Dietary Fiber <span className="text-green-700">0.6g</span><span className="float-right font-semibold">2%</span></li>
                                    <li className="text-xs ml-3">Sugars <span className="text-green-700">10g</span><span className="float-right font-semibold"></span></li>
                                    <li className="text-sm font-semibold">Protein <span className="text-green-700">56.95g</span><span className="float-right font-semibold">6%</span></li>
                                    <hr className="mb-1 mt-1"/>
                                    <li className="text-xs">Vitamin D <span className="text-green-700"></span><span className="float-right">
                                    </span></li>
                                    <li className="text-xs">Calcium <span className="text-green-700">46mg</span><span className="float-right">4%
                                    </span></li>
                                    <li className="text-xs">Iron <span className="text-green-700">2.69mg</span><span className="float-right">15%
                                    </span></li>
                                    <li className="text-xs">Potassium <span className="text-green-700">803mg</span><span className="float-right">17%</span></li>
                                    <li className="text-xs">Vitamin A <span className="text-green-700">14mcg</span><span className="float-right">2%</span></li>
                                    <li className="text-xs">Vitamin C <span className="text-green-700">12.3mg</span><span className="float-right">14%</span></li>
                                </ul>
                                <hr className="mb-1 mt-1"/>
                                <p className="text-xs">* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-300 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h2 className="text-gray-900 text-xl title-font font-medium mb-1">Directions</h2>
                            <ol className="list-decimal">
                                <li className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque atque, iure obcaecati doloremque placeat sit exercitationem ex excepturi suscipit repellendus quam a repellat natus assumenda mollitia asperiores reprehenderit nam corporis.</li>
                                <li className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea natus officiis velit deserunt id labore quos ducimus vero architecto est? At eligendi ex suscipit, accusamus labore sit eum similique quod quo tenetur architecto sint tempore.</li>
                                <li className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sint?</li>
                                <li className="mt-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nulla necessitatibus! Esse illum placeat quia laboriosam earum voluptate quam dignissimos, suscipit, dolorum accusamus doloremque dolor atque?</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}