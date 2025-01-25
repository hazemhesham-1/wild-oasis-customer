import Link from "next/link";

const LoginMessage = () => {
    return (
        <div className="grid bg-primary-800">
            <p className="text-center text-xl py-12 self-center">
                Please{" "}
                <Link
                    href="/login"
                    className="text-accent-500 underline"
                >
                    login
                </Link>
                {" "}to reserve this cabin right now
            </p>
        </div>
    );
};

export default LoginMessage;