"use client";

const Error = ({ error, reset }) => {
    return (
        <main className="message-box">
            <h1 className="message-box__title">
                Something went wrong!
            </h1>
            <p className="text-lg">{error.message}</p>
            <button onClick={reset} className="message-box__button">
                Try again
            </button>
        </main>
    );
};

export default Error;