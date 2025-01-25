"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

const ReservationList = ({ bookings }) => {
    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBookings, bookingId) => {
        return currBookings.filter(booking => booking.id !== bookingId);
    });

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteBooking(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) =>
                <ReservationCard
                    booking={booking}
                    onDelete={handleDelete}
                    key={booking.id}
                />
            )}
        </ul>
    );
};

export default ReservationList;