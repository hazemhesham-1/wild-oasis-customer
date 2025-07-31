import { auth } from "@/app/_lib/auth";

export const metadata = {
    title: "Guest Profile",
};

const Page = async () => {
    const session = await auth();
    const firstName = session?.user?.name.split(" ")[0];

    return (
        <h2 className="account-container__heading">
            Welcome, {firstName}
        </h2>
    );
};

export default Page;