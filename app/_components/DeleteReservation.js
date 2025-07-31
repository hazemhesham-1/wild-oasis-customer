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
        <button onClick={handleDelete} className="reservation-card__button group">
            {!isPending ? (
                <>
                    <TrashIcon className="icon group-hover:text-primary-800 transition-colors"/>
                    <span className="mt-1">Delete</span>
                </>
            ) : (
                <span className="mx-auto"><SpinnerMini/></span>
            )}
        </button>
    );
};

export default DeleteReservation;