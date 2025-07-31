"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Button = ({ children, filter, handleFilter, isActive }) => {
    return (
        <button
            className={`${isActive ? "bg-primary-700 text-primary-50" : ""} px-5 py-2 hover:bg-primary-700 focus:outline-none`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
};

const Filter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams?.get("capacity") || "all";

    const filters = [
        {
            label: "All cabins",
            value: "all"
        },
        {
            label: "1—3 guests",
            value: "small"
        },
        {
            label: "4—7 guests",
            value: "medium"
        },
        {
            label: "8—12 guests",
            value: "large"
        },
    ];

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border border-primary-800 flex">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    filter={filter.value}
                    handleFilter={handleFilter}
                    isActive={filter.value === activeFilter}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
};

export default Filter;