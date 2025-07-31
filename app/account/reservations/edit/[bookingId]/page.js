import { auth } from "@/app/_lib/auth";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";
import SubmitButton from "@/app/_components/SubmitButton";

export const metadata = {
    title: "Edit Reservation"
};

const Page = async ({ params }) => {
    const session = await auth();
    const { bookingId } = await params;

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
            <h2 className="account-container__heading">
                Edit Reservation #{bookingId}
            </h2>
            <form action={updateBooking} className="form-wrapper">
                <input
                    type="hidden"
                    name="bookingId"
                    defaultValue={bookingId}
                />
                <div className="space-y-2">
                    <label htmlFor="numGuests">
                        How many guests?
                    </label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        defaultValue={numGuests}
                        className="reservation__form-input"
                        required
                    >
                        <option value="">Select number of guests...</option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
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
                        defaultValue={observations}
                        className="reservation__form-input"
                    />
                </div>
                <div className="flex items-center justify-end gap-6">
                    <SubmitButton>Update reservation</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default Page;