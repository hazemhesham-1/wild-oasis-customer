"use client";

import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

const UpdateProfileForm = ({ children, guest }) => {
    const {
        full_name: fullName,
        email,
        nationality,
        national_id: nationalID,
        country_flag: countryFlag
    } = guest;

    return (
        <form
            className="bg-primary-900 px-12 py-8 text-lg flex flex-col gap-6"
            action={updateGuest}
        >
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    name="full_name"
                    disabled
                    defaultValue={fullName}
                />
            </div>
            <div className="space-y-2">
                <label>Email address</label>
                <input
                    className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    name="email"
                    disabled
                    defaultValue={email}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <img
                        src={countryFlag}
                        alt={`${nationality}-flag`}
                        className="h-5 rounded-sm"
                    />
                </div>
                {children}
            </div>
            <div className="space-y-2">
                <label htmlFor="national_id">National ID number</label>
                <input
                    name="national_id"
                    id="national_id"
                    className="bg-primary-200 text-primary-800 rounded-sm px-5 py-3 w-full shadow-sm"
                    defaultValue={nationalID}
                />
            </div>
            <div className="flex justify-end items-center gap-6">
                <SubmitButton>Update profile</SubmitButton>
            </div>
        </form>
    );
};

export default UpdateProfileForm;