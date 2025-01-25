"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_contexts/ReservationContext";

function isAlreadyBooked(range, dateArr) {
    if(range?.from && range?.to) {
        return dateArr.some((date) =>
            isWithinInterval(date, { start: range.from, end: range.to })
        );
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

    const numNights = differenceInDays(displayRange?.to, displayRange?.from);
    const cabinPrice = numNights * (regularPrice - discount);

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 place-self-center"
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
            <div className="bg-accent-500 text-primary-800 flex items-center justify-between px-8 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <p className="flex items-baseline gap-2">
                        {discount > 0 ?
                            <>
                                <span className="text-2xl">${regularPrice - discount}</span>
                                <span className="text-primary-700 font-semibold line-through">${regularPrice}</span>
                            </>
                            : <span className="text-2xl">${regularPrice}</span>
                        }
                        <span>/night</span>
                    </p>
                    {numNights ?
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-2xl font-semibold">${cabinPrice}</span>
                            </p>
                        </>
                        : null
                    }
                </div>
                {range?.from || range?.to ?
                    <button
                        className="border border-primary-800 px-4 py-2 text-sm font-semibold"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                    : null
                }
            </div>
        </div>
    );
};

export default SelectDate;