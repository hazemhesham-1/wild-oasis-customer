import Link from "next/link";

const NotFound = () => {
    return (
        <main className="message-box--centered">
            <h1 className="message-box__title">
                This page could not be found 😞
            </h1>
            <Link href="/" className="message-box__button">
                Go back home
            </Link>
        </main>
    );
};

export default NotFound;