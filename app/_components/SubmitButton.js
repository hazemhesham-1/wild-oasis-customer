"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

const SubmitButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            className="bg-accent-500 text-primary-800 px-8 py-4 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            disabled={pending}
        >
            {pending ? <SpinnerMini/> : children}
        </button>
    );
};

export default SubmitButton;