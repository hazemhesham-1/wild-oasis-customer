import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

const SignOutButton = () => {
    return (
        <form action={signOutAction}>
            <button className="text-primary-200 flex items-center gap-4 px-5 py-3 hover:bg-primary-900 hover:text-primary-100 transition-colors font-semibold w-full">
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600"/>
                <span>Sign out</span>
            </button>
        </form>
    );
};

export default SignOutButton;