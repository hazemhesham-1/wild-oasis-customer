"use client";

import { updateGuest } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

const UpdateProfileForm = ({ children, guest }) => {
    const {
        full_name: fullName,
        email,
        nationality,
        countryFlag,
        national_id: nationalID
    } = guest;

    return (
        <form action={updateGuest} className="form-wrapper">
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    name="full_name"
                    defaultValue={fullName}
                    disabled
                    className="form-field"
                />
            </div>
            <div className="space-y-2">
                <label>Email address</label>
                <input
                    name="email"
                    defaultValue={email}
                    disabled
                    className="form-field"
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    {nationality && (
                        <img
                            src={countryFlag}
                            alt={`${nationality} flag`}
                            className="rounded-sm h-5"
                        />
                    )}
                </div>
                {children}
            </div>
            <div className="space-y-2">
                <label htmlFor="national_id">National ID number</label>
                <input
                    name="national_id"
                    id="national_id"
                    defaultValue={nationalID}
                    className="form-field"
                />
            </div>
            <div className="flex items-center justify-end gap-6">
                <SubmitButton>Update profile</SubmitButton>
            </div>
        </form>
    );
};

export default UpdateProfileForm;