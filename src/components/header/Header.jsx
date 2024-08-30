"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const baseURL = "https://satyalok.in";

const menuItems = [
    {
        name: "Home",
        href: `${baseURL}/`,
    },
    {
        name: "About",
        href: `${baseURL}/about`,
    },
    {
        name: "Social Activities",
        href: `${baseURL}/socialactivities`,
    },
    {
        name: "Get Involved",
        href: `${baseURL}/join`,
    },
    {
        name: "Media",
        href: `${baseURL}/gallery`,
    },
    {
        name: "Contact",
        href: `${baseURL}/contact`,
    },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative w-full bg-white">
            <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <img src={logo} alt="Satyalok" className="h-14" />
                </div>
                <div className="hidden grow items-center justify-end lg:flex">
                    <ul className="ml-12 inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="font-semibold text-gray-800 hover:text-blue-900 cursor-pointer hover:underline underline-offset-4"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="https://wa.me/918210228101?text=Hi%2C%20I%20am%20facing%20an%20issue%20with%20Satyalok%20Donation%20Portal."
                        target="_blank"
                        className="ml-8 border-red-600 border text-red-600 px-4 py-1 rounded-md font-semibold hover:bg-red-600 hover:text-white cursor-pointer"
                    >
                        <i className="fas fa-bug mr-2"></i>
                        Report an Issue
                    </a>
                </div>
                <div className="lg:hidden">
                    <Menu
                        onClick={toggleMenu}
                        className="h-6 w-6 cursor-pointer"
                    />
                </div>
                {isMenuOpen && (
                    <div
                        className={`fixed inset-0 z-50 transform transition ${
                            isMenuOpen ? "translate-x-0" : "translate-x-full"
                        } bg-white`}
                    >
                        <div className="h-full w-full divide-y-2 divide-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5 flex items-center justify-between">
                                <div className="inline-flex items-center space-x-2">
                                    <img
                                        src={logo}
                                        alt="Satyalok"
                                        className="h-14"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <button
                                        type="button"
                                        onClick={toggleMenu}
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <X
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 px-5 flex flex-col items-center justify-between">
                                <nav className="grid gap-y-4 w-full">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                        >
                                            <span className="ml-3 text-base font-medium text-gray-900">
                                                {item.name}
                                            </span>
                                        </a>
                                    ))}
                                </nav>

                                <a
                                    href="https://wa.me/918210228101?text=Hi%2C%20I%20am%20facing%20an%20issue%20with%20Satyalok%20Donation%20Portal."
                                    target="_blank"
                                    className="mt-16 border-red-600 border text-red-600 px-4 py-1 rounded-md font-semibold hover:bg-red-600 hover:text-white cursor-pointer"
                                >
                                    <i className="fas fa-bug mr-2"></i>
                                    Report an Issue
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
