import SignInButton from "../_components/SignInButton";

const metadata = {
    title: "Login",
};

const Page = () => {
    return (
        <div className="flex flex-col gap-10 items-center mt-10">
            <h2 className="text-3xl font-semibold">
                Sign in to access your guest area
            </h2>
            <SignInButton/>
        </div>
    );
};

export { metadata };

export default Page;