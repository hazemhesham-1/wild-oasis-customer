import Link from "next/link";

const LoginMessage = () => {
    return (
        <div className="bg-primary-800 grid">
            <p className="self-center p-4 text-center text-xl md:py-12">
                Please{" "}
                <Link href="/login" className="text-accent-500 underline">
                    login
                </Link>
                {" "}to reserve this cabin right now
            </p>
        </div>
    );
};

export default LoginMessage;