"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
    createBooking as createBookingAPI,
    deleteBooking as deleteBookingAPI,
    updateBooking as updateBookingAPI,
    updateGuest as updateGuestAPI,
    getBookings
} from "./data-service";

async function updateGuest(formData) {
    const session = await auth();
    if(!session) {
        throw new Error("You must be logged in");
    }

    const national_id = formData.get("national_id");
    const [nationality, country_flag] = formData.get("nationality").split("%");

    const regex = /^[a-zA-Z0-9]{6,12}$/;
    if(!regex.test(national_id)) {
        throw new Error("Please provide a valid national ID");
    }

    const updateData = { national_id, nationality, country_flag };
    const data = await updateGuestAPI(session.user.guestId, updateData);
    revalidatePath("/account/profile");
}

async function createBooking(bookingData, formData) {
    const session = await auth();
    if(!session) {
        throw new Error("You must be logged in");
    }

    const newBooking = {
        id: new Date().getTime(),
        ...bookingData,
        guest_id: session.user.guestId,
        num_guests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 500),
        extra_price: 0,
        total_price: bookingData.cabin_price,
        is_paid: false,
        has_breakfast: false,
        status: "unconfirmed"
    };
    
    const data = await createBookingAPI(newBooking);
    revalidatePath(`/cabins/${bookingData.cabin_id}`);
    redirect("/cabins/success");
}

async function updateBooking(formData) {
    const session = await auth();
    if(!session) {
        throw new Error("You must be logged in");
    }

    const bookingId = Number(formData.get("bookingId"));
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    if(!guestBookingIds.includes(bookingId)) {
        throw new Error("You are not allowed to edit this booking");
    }

    const updateData = {
        num_guests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 500)
    };
    const data = await updateBookingAPI(bookingId, updateData);

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/accout/reservations");

    redirect("/account/reservations");
}

async function deleteBooking(bookingId) {
    const session = await auth();
    if(!session) {
        throw new Error("You must be logged in");
    }

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    if(!guestBookingIds.includes(Number(bookingId))) {
        throw new Error("You are not allowed to delete this booking");
    }
    
    const data = await deleteBookingAPI(bookingId);
    revalidatePath("/account/reservations");
}

async function signInAction() {
    await signIn("github", { redirectTo: "/account" });
}

async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export { signInAction, signOutAction, updateGuest, createBooking, updateBooking, deleteBooking };