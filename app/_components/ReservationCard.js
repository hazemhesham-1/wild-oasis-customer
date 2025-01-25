import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
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
        <div className="flex border border-primary-800">
            <div className="relative h-32 aspect-square">
                <Image
                    src={image}
                    alt={`Cabin ${name}`}
                    fill
                    className="object-cover border-r border-primary-800"
                />
            </div>
            <div className="flex flex-col flex-grow px-6 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {numNights} nights in Cabin {name}
                    </h3>
                    {isPast(new Date(startDate)) ?
                        <span className="bg-yellow-800 text-yellow-200 rounded-sm flex items-center h-7 px-3 font-bold text-xs uppercase">
                            past
                        </span>
                        :
                        <span className="bg-green-800 text-green-200 rounded-sm flex items-center h-7 px-3 font-bold text-xs uppercase">
                            upcoming
                        </span>
                    }
                </div>
                <p className="text-primary-300 text-lg">
                    {format(new Date(startDate), "EEE, MMM dd yyyy")}{" "}
                    ({isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)})
                    &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
                </p>
                <div className="flex items-baseline gap-5 mt-auto">
                    <p className="text-accent-400 text-xl font-semibold">
                        ${totalPrice}
                    </p>
                    <p className="text-primary-300">&bull;</p>
                    <p className="text-primary-300 text-lg">
                        {numGuests} guest{numGuests > 1 && "s"}
                    </p>
                    <p className="text-primary-400 text-sm ml-auto">
                        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                    </p>
                </div>
            </div>
            <div className="flex flex-col border-l border-primary-800 w-[100px]">
                {!isPast(new Date(startDate)) &&
                    <>
                        <Link
                            href={`/account/reservations/edit/${id}`}
                            className="text-primary-300 flex items-center gap-2 flex-grow border-b border-primary-800 px-3 font-bold uppercase text-xs group hover:bg-accent-600 transition-colors hover:text-primary-900"
                        >
                            <PencilSquareIcon className="text-primary-600 h-5 w-5 group-hover:text-primary-800 transition-colors"/>
                            <span className="mt-1">Edit</span>
                        </Link>
                        <DeleteReservation bookingId={id} onDelete={onDelete}/>
                    </>
                }
            </div>
        </div>
    );
};

export default ReservationCard;