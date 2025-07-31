import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
    title: "Cabins",
};

const Page = async ({ searchParams }) => {
    const query = await searchParams;
    const filter = query?.capacity || "all";

    return (
        <div>
            <h1 className="text-accent-400 mb-5 text-4xl font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 mb-10 text-lg">
                Luxurious cozy cabins set in a stunning natural landscape, surrounded by majestic mountains, towering palms, and a lush forest.
                Through high-quality images and interactive tours, guests can experience the tranquil beauty and rustic charm of the property, offering a peaceful retreat in the heart of nature.
                Enjoy nature's beauty in your own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to paradise.
            </p>
            <div className="flex justify-end mb-8">
                <Filter/>
            </div>
            <Suspense fallback={<Spinner/>} key={filter}>
                <CabinList filter={filter}/>
                <ReservationReminder/>
            </Suspense>
        </div>
    );
};

export default Page;