import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

const metadata = {
    title: "Reservations",
};

const Page = async () => {
    const session = await auth();
    const bookings = await getBookings(session.user.guestId);

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Your reservations
            </h2>
            {bookings.length === 0 ?
                <p className="text-lg">
                    You have no reservations yet.
                    Check out our {" "}
                    <a
                        href="/cabins"
                        className="underline text-accent-500"
                    >
                        luxury cabins &rarr;
                    </a>
                </p>
                : <ReservationList bookings={bookings}/>
            }
        </div>
    );
};

export { metadata };

export default Page;