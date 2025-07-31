import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import SelectDate from "./SelectDate";

const Reservation = async ({ cabin }) => {
    const session = await auth();
    const [bookedDates, settings] = await Promise.all([
        getBookedDatesByCabinId(cabin.id),
        getSettings()
    ]);

    return (
        <div className="reservation">
            <SelectDate
                bookedDates={bookedDates}
                cabin={cabin}
                settings={settings}
            />
            {session?.user ? (
                <ReservationForm cabin={cabin} user={session.user}/>
            ) : (
                <LoginMessage/>
            )}
        </div>
    );
};

export default Reservation;