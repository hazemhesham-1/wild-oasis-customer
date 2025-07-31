import Link from "next/link";

const NotFound = () => {
    return (
        <main className="message-box--centered">
            <h1 className="message-box__title">
                This cabin could not be found 😞
            </h1>
            <Link href="/cabins" className="message-box__button">
                Go to cabins page &rarr;
            </Link>
        </main>
    );
};

export default NotFound;