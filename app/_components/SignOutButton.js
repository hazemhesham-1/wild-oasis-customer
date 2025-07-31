import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

const SignOutButton = () => {
    return (
        <form action={signOutAction}>
            <button className="account-sidenav__button w-full">
                <ArrowRightStartOnRectangleIcon className="icon"/>
                <span>Sign out</span>
            </button>
        </form>
    );
};

export default SignOutButton;