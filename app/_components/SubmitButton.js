"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

const SubmitButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button className="submit-button" disabled={pending}>
            {pending ? <SpinnerMini/> : children}
        </button>
    );
};

export default SubmitButton;