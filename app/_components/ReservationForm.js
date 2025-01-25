"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

const ReservationForm = ({ cabin, user }) => {
    const { range, resetRange } = useReservation();

    const {
        id,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount
    } = cabin;

    const startDate = range?.from;
    const endDate = range?.to;
    const numNights = differenceInDays(endDate, startDate);
    const cabinPrice = numNights * (regularPrice - discount);

    const bookingData = {
        start_date: startDate,
        end_date: endDate,
        num_nights: numNights,
        cabin_price: cabinPrice,
        cabin_id: id,
    };

    const createBookingWithData = createBooking.bind(null, bookingData);

    return (
        <div className="scale-[1.01]">
            <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
                <p>Logged in as</p>
                <div className="flex items-center gap-4">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="h-8 rounded-full"
                        referrerPolicy="no-referrer"
                    />
                    <p>{user.name}</p>
                </div>
            </div>
            <form
                action={async (formData) => {
                    resetRange();
                    await createBookingWithData(formData);
                }}
                className="bg-primary-900 flex flex-col gap-5 px-16 py-10 text-lg"
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm"
                        required
                    >
                        <option value="" key="">Select number of guests...</option>
                        {Array.from({ length: maxCapacity }, (a, i) => i + 1).map((num) =>
                            <option value={num} key={num}>
                                {num} {num > 1 ? "guests" : "guest"}
                            </option>
                        )}
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="observations"
                        className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>
                <div className="flex items-center justify-end gap-6">
                    {!(startDate && endDate) ?
                    <p className="text-primary-300 text-base">
                        Start by selecting dates
                    </p> : <SubmitButton>Reserve now</SubmitButton>
                    }
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;