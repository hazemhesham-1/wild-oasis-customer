"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "@/app/_contexts/ReservationContext";

function isAlreadyBooked(range, dateArr) {
    const start = range?.from;
    const end = range?.to;
    const isInRange = (date) => isWithinInterval(date, { start, end });

    if(start && end) {
        return dateArr.some((date) => isInRange(date));
    }
    return false;
}

const SelectDate = ({ bookedDates, cabin, settings }) => {
    const { range, setRange, resetRange } = useReservation();
    const { regular_price: regularPrice, discount } = cabin;

    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

    const {
        max_booking_length: maxBookingLength,
        min_booking_length: minBookingLength
    } = settings;

    const numNights = differenceInDays(displayRange?.to, displayRange?.from) || null;
    const cabinPrice = numNights * (regularPrice - discount);

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="place-self-center py-6 xl:pt-12"
                mode="range"
                selected={displayRange}
                onSelect={setRange}
                min={minBookingLength + 1}
                max={maxBookingLength}
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 5, 0)}
                captionLayout="dropdown"
                numberOfMonths={2}
                disabled={(currDate) => isPast(currDate) || bookedDates.some((date) => isSameDay(date, currDate))}
                excludeDisabled
            />
            <div className="select-date__summary">
                <div className="select-date__summary-details">
                    <p className="flex items-baseline gap-2 whitespace-nowrap">
                        {discount > 0 ? (
                            <>
                                <span className="text-lg sm:text-2xl">{regularPrice - discount} EGP</span>
                                <span className="text-primary-700 font-semibold line-through">{regularPrice} EGP</span>
                            </>
                        ) : (
                            <span className="text-lg sm:text-2xl">{regularPrice} EGP</span>
                        )}
                        <span>/night</span>
                    </p>
                    {numNights && (
                        <>
                            <p className="bg-accent-600 px-3 py-0.5 text-lg sm:text-2xl">
                                <span>&times;</span>{" "}<span>{numNights}</span>
                            </p>
                            <p className="whitespace-nowrap">
                                <span className="font-bold uppercase sm:text-lg">Total</span>{" "}
                                <span className="text-lg font-semibold sm:text-2xl">{cabinPrice} EGP</span>
                            </p>
                        </>
                    )}
                </div>
                {(range?.from || range?.to) && (
                    <button className="select-date__clear-button" onClick={resetRange}>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default SelectDate;