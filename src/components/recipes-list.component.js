import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecipesList extends Component {
    render() {
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 pt-10 mx-auto">
                    <div className="mb-12 text-center w-full">
                        <p className="mb-3 leading-relaxed">Showing search result for : Chicken</p>
                        <div className="flex w-3/6 mx-auto">
                            <input className="flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0" placeholder="Search Recipe" type="text"/>
                            <a href="recipe.html" className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Search</a>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a href="detail-recipe.html" className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block"
                                    src="https://dummyimage.com/420x260"/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-green-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <a href="detail-recipe.html" className="text-gray-900 title-font text-lg font-medium">The Catalyzer</a>
                                <p className="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Repellat, nesciunt! ...</p>
                                <p className="leading-relaxed text-xs font-medium mt-1">Per serve - Energy: 261kcal <br/> Carb:
                                    37.59g | Prot: 22.01g | Fat: 4.01g</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        );
    }
}