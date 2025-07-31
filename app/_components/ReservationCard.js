import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

function formatDistanceFromNow(dateString) {
    return formatDistance(parseISO(dateString), new Date(), {
        addSuffix: true,
    }).replace("about ", "");
}

const ReservationCard = ({ booking, onDelete }) => {
    const {
        id,
        created_at,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        num_guests: numGuests,
        num_nights: numNights,
        cabins: { name, image },
    } = booking;

    return (
        <div className="reservation-card">
            <div className="reservation-card__image">
                <Image
                    src={image}
                    alt={`Cabin ${name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="reservation-card__details">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {numNights} nights in Cabin {name}
                    </h3>
                    {isPast(new Date(startDate)) ?
                        <span className="reservation-card__status reservation-card__status--past">
                            past
                        </span>
                        :
                        <span className="reservation-card__status reservation-card__status--upcoming">
                            upcoming
                        </span>
                    }
                </div>
                <p className="text-primary-300 text-base md:text-lg">
                    {format(new Date(startDate), "EEE, MMM dd yyyy")}{" "}
                    ({isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)})
                    &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
                </p>
                <div className="reservation-card__booking-info">
                    <p className="text-accent-400 text-xl font-semibold">
                        {totalPrice} EGP
                    </p>
                    <p>&bull;</p>
                    <p className="text-lg">
                        {numGuests} guest{numGuests > 1 && "s"}
                    </p>
                    <p className="text-primary-400 ms-auto text-sm">
                        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                    </p>
                </div>
            </div>
            <div className="reservation-card__actions">
                {!isPast(new Date(startDate)) && (
                    <>
                        <Link
                            href={`/account/reservations/edit/${id}`}
                            className="reservation-card__button border-e group xl:border-0 xl:border-b"
                        >
                            <PencilSquareIcon className="icon group-hover:text-primary-800 transition-colors"/>
                            <span className="mt-1">Edit</span>
                        </Link>
                        <DeleteReservation bookingId={id} onDelete={onDelete}/>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReservationCard;