import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

const metadata = {
    title: "Edit Reservation"
};

const Page = async ({ params }) => {
    const session = await auth();
    const { bookingId } = params;

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    if(!guestBookingIds.includes(Number(bookingId))) {
        throw new Error("You are not allowed to edit this booking");
    }

    const {
        num_guests: numGuests,
        observations,
        cabin_id: cabinId
    } = await getBooking(bookingId);

    const { max_capacity: maxCapacity } = await getCabin(cabinId);

    return (
        <div>
            <h2 className="text-accent-400 font-semibold text-2xl mb-7">
                Edit Reservation #{bookingId}
            </h2>
            <form
                className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
                action={updateBooking}
            >
                <input
                    type="hidden"
                    name="bookingId"
                    defaultValue={bookingId}
                />
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        defaultValue={numGuests}
                        className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm"
                        required
                    >
                        <option value="">Select number of guests...</option>
                        {Array.from({ length: maxCapacity }, (a, i) => i + 1).map((num) =>
                            <option key={num} value={num}>
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
                        defaultValue={observations}
                        className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm"
                    />
                </div>
                <div className="flex items-center justify-end gap-6">
                    <SubmitButton>Update reservation</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export { metadata };

export default Page;