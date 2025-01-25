import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;

const metadata = {
    title: "Cabins",
};

const Page = ({ searchParams }) => {
    const filter = searchParams?.capacity || "all";

    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
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

export { metadata };

export default Page;