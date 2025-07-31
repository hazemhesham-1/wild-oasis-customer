"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarDaysIcon, UserIcon } from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";

const navLinks = [
    {
        name: "Home",
        href: "/account",
        icon: <HomeIcon className="icon"/>,
    },
    {
        name: "Reservations",
        href: "/account/reservations",
        icon: <CalendarDaysIcon className="icon"/>,
    },
    {
        name: "Guest profile",
        href: "/account/profile",
        icon: <UserIcon className="icon"/>,
    },
];

const SideNavigation = () => {
    const pathname = usePathname();

    return (
        <nav className="border-x border-primary-900 md:border-s-0">
            <ul className="account-sidenav">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.href}
                            className={`${pathname === link.href ? "bg-primary-900" : ""} account-sidenav__button`}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    </li>
                ))}
                <li className="mt-auto">
                    <SignOutButton/>
                </li>
            </ul>
        </nav>
    );
};

export default SideNavigation;