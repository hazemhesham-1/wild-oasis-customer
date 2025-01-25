import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { eachDayOfInterval } from "date-fns";

async function getCabin(id) {
    const { data, error } = await supabase.from("cabins").select("*").eq("id", id).single();
    if(error) {
        console.error(error);
        notFound();
    }

    return data;
}

async function getCabinPrice(id) {
    const { data, error } = await supabase.from("cabins").select("regular_price, discount").eq("id", id).single();
    if(error) {
        console.error(error);
    }

    return data;
}

async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("id, name, max_capacity, regular_price, discount, image").order("name");
    if(error) {
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

async function getGuest(email) {
    const { data } = await supabase.from("guests").select("*").eq("email", email).single();
    return data;
}

async function getBooking(id) {
    const { data, error } = await supabase.from("bookings").select("*").eq("id", id).single();
    if(error) {
        console.error(error);
        throw new Error("Booking could not get loaded");
    }

    return data;
}

async function getBookings(guestId) {
    const { data, error } = await supabase.from("bookings").select("id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)").eq("guest_id", guestId).order("start_date");
    if(error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

async function getBookedDatesByCabinId(cabinId) {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    const { data, error } = await supabase.from("bookings").select("*").eq("cabin_id", cabinId).or(`start_date.gte.${today},status.eq.checked-in`);
    if(error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    const bookedDates = data.map((booking) =>
        eachDayOfInterval({
            start: new Date(booking.start_date),
            end: new Date(booking.end_date)
        })
    ).flat();

    return bookedDates;
}

async function getSettings() {
    const { data, error } = await supabase.from("settings").select("*").single();
    if(error) {
        console.error(error);
        throw new Error("Settings could not be loaded");
    }

    return data;
}

async function getCountries() {
    const BASE_URL = process.env.NEXTAUTH_URL;
    try {
        const res = await fetch(`${BASE_URL}/api/data/countries`);
        const { data: countries } = await res.json();
        return countries;
    }
    catch(error) {
        console.error(error);
        throw new Error("Could not fetch countries");
    }
}

async function createGuest(newGuest) {
    const { data, error } = await supabase.from("guests").insert([newGuest]);
    if(error) {
        console.error(error);
        throw new Error("Guest could not be created");
    }

    return data;
}

async function updateGuest(id, updateFields) {
    const { data, error } = await supabase.from("guests").update(updateFields).eq("id", id).select().single();
    if(error) {
        console.error(error);
        throw new Error("Guest could not be updated");
    }

    return data;
}

async function createBooking(newBooking) {
    const { data, error } = await supabase.from("bookings").insert([newBooking]).select().single();
    if(error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    return data;
}

async function updateBooking(id, updateFields) {
    const { data, error } = await supabase.from("bookings").update(updateFields).eq("id", id).select().single();
    if(error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }

    return data;
}

async function deleteBooking(id) {
    const { data, error } = await supabase.from("bookings").delete().eq("id", id);
    if(error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    return data;
}

export { getBooking, getBookings, getBookedDatesByCabinId, getCabin, getCabinPrice, getCabins, getCountries, getGuest, getSettings, createGuest, updateGuest, createBooking, updateBooking, deleteBooking };