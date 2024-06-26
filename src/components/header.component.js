import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className="text-gray-700 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
                            viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">PlanMyDiet</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to="/" className="mr-5 hover:text-gray-900 cursor-pointe">Home</Link>
                        <Link to="/tdee-calculator" className="mr-5 hover:text-gray-900 cursor-pointe">TDEE Calcutator</Link>
                        <Link to="/recipes" className="mr-5 hover:text-gray-900 cursor-pointe">Recipes</Link>
                        {/* <Link to="/pricing" className="mr-5 hover:text-gray-900 cursor-pointe">Pricing</Link> */}
                        <Link to="/about" className="mr-5 hover:text-gray-900 cursor-pointe">About Us</Link>
                    </nav>
                </div>
            </header>
        );
    }
}