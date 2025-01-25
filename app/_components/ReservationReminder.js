"use client";

import { format } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ReservationReminder = () => {
    const { range, resetRange } = useReservation();
    if(!range.from || !range.to) return null;

    return (
        <div className="bg-accent-500 text-primary-800 rounded-full flex items-center gap-8 fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-5 font-semibold shadow-xl shadow-slate-900">
            <p>
                <span>👋</span> Don't forget to reserve your dates<br/>
                from{" "}{format(new Date(range.from), "MMM dd yyyy")}{" "}
                to{" "}{format(new Date(range.to), "MMM dd yyyy")}
            </p>
            <button
                className="rounded-full p-1 hover:bg-accent-600 transition-all"
                onClick={resetRange}
            >
                <XMarkIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

export default ReservationReminder;