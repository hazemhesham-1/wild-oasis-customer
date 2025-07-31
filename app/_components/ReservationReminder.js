"use client";

import { format } from "date-fns";
import { useReservation } from "@/app/_contexts/ReservationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ReservationReminder = () => {
    const { range, resetRange } = useReservation();
    if(!range.from || !range.to) return null;

    return (
        <div className="reservation-banner">
            <p>
                <span>👋</span> Don't forget to reserve your dates<br/>
                from{" "}{format(new Date(range.from), "MMM dd yyyy")}{" "}
                to{" "}{format(new Date(range.to), "MMM dd yyyy")}
            </p>
            <button
                className="rounded-full p-1 hover:bg-accent-600 transition"
                onClick={resetRange}
            >
                <XMarkIcon className="size-5"/>
            </button>
        </div>
    );
};

export default ReservationReminder;