import Link from "next/link";

const Page = () => {
    return (
        <div className="message-box--centered">
            <h1 className="message-box__title">
                Thank you for your reservation!
            </h1>
            <Link
                href="/account/reservations"
                className="text-accent-500 inline-block text-xl underline"
            >
                Manage your reservations &rarr;
            </Link>
        </div>
    );
};

export default Page;