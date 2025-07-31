"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const MenuButton = ({ isOpen, onToggle }) => {
    return (
        <button
            title="Menu button"
            onClick={onToggle}
            className={`navigation__button ${!isOpen ? "relative" : "fixed"}`}
        >
            <span className="sr-only">
                {!isOpen ? "Open" : "Close"} main menu
            </span>
            {!isOpen ? <Bars3Icon/> : <XMarkIcon/>}
        </button>
    );
};

const Navigation = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <MenuButton
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen(open => !open)}
            />
            <nav className={`navigation ${isMenuOpen ? "translate-y-0" : "-translate-y-full sm:translate-y-0"}`}>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link href="/cabins" onClick={closeMenu}>
                            Cabins
                        </Link>
                    </li>
                    <li className="navigation__item" onClick={closeMenu}>
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li className="navigation__item">
                        {user?.image ? (
                            <Link
                                href="/account"
                                onClick={closeMenu}
                                className="navigation__account-link"
                            >
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="rounded-full size-8"
                                    referrerPolicy="no-referrer"
                                />
                                <span>Guest area</span>
                            </Link>
                        ) : (
                            <Link href="/account" onClick={closeMenu}>
                                Guest area
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navigation;