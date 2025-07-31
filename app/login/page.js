import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
    title: "Login",
};

const Page = () => {
    return (
        <div className="flex flex-col items-center gap-10 mt-10">
            <h2 className="text-xl font-semibold sm:text-3xl">
                Sign in to access your guest area
            </h2>
            <SignInButton provider="google"/>
            <SignInButton provider="github"/>
        </div>
    );
};

export default Page;