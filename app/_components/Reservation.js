import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import SelectDate from "./SelectDate";

const Reservation = async ({ cabin }) => {
    const [bookedDates, settings] = await Promise.all([
        getBookedDatesByCabinId(cabin.id),
        getSettings()
    ]);
    const session = await auth();

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <SelectDate
                bookedDates={bookedDates}
                cabin={cabin}
                settings={settings}
            />
            {session?.user ?
                <ReservationForm cabin={cabin} user={session.user}/>
                : <LoginMessage/>
            }
        </div>
    );
};

export default Reservation;