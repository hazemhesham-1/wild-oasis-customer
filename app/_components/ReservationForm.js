"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "@/app/_contexts/ReservationContext";
import { createBooking } from "@/app/_lib/actions";
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
        <div className="lg:scale-105">
            <div className="reservation__user-info">
                <p>Logged in as</p>
                <div className="flex items-center gap-4">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="rounded-full h-8"
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
                className="reservation__form"
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">
                        How many guests?
                    </label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        className="reservation__form-input"
                        required
                    >
                        <option value="0">
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
                            <option value={num} key={`numGuests-${num}`}>
                                {num} {num > 1 ? "guests" : "guest"}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="observations"
                        className="reservation__form-input"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>
                <div className="flex items-center justify-end gap-6">
                    {!(startDate && endDate) ? (
                        <p className="text-primary-300 text-base">
                            Start by selecting dates
                        </p>
                    ) : (
                        <SubmitButton>Reserve now</SubmitButton>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;