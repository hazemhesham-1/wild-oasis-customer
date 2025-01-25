"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

const DeleteReservation = ({ bookingId, onDelete }) => {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        if(confirm("Are you sure you want to delete this reservation?")) {
            startTransition(() => onDelete(bookingId));
        }
    }

    return (
        <button
            className="text-primary-300 flex items-center gap-2 flex-grow px-3 font-bold uppercase text-xs group hover:bg-accent-600 transition-colors hover:text-primary-900"
            onClick={handleDelete}
        >
            {!isPending ?
                <>
                    <TrashIcon className="text-primary-600 h-5 w-5 group-hover:text-primary-800 transition-colors"/>
                    <span className="mt-1">Delete</span>
                </> : <span className="mx-auto"><SpinnerMini/></span>
            }
        </button>
    );
};

export default DeleteReservation;