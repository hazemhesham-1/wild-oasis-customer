import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import ReservationList from "@/app/_components/ReservationList";

export const metadata = {
    title: "Reservations",
};

const Page = async () => {
    const session = await auth();
    const bookings = await getBookings(session.user.guestId);

    return (
        <div>
            <h2 className="account-container__heading">
                Your reservations
            </h2>
            {bookings.length === 0 ? (
                <p className="flex flex-col gap-1.5 text-lg lg:flex-row">
                    <span>You have no reservations yet.</span>
                    <span>
                        Check out our{" "}
                        <a href="/cabins" className="text-accent-500 underline hover:text-accent-400 transition">
                            luxury cabins &rarr;
                        </a>
                    </span>
                </p>
            ) : (
                <ReservationList bookings={bookings}/>
            )}
        </div>
    );
};

export default Page;