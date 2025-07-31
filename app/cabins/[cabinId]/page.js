import { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
    const { cabinId } = await params;
    const { name } = await getCabin(cabinId);
    
    return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    const cabinIds = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return cabinIds;
}

const Page = async ({ params }) => {
    const { cabinId } = await params;
    const cabin = await getCabin(cabinId);

    return (
        <div className="max-w-6xl mx-auto lg:mt-8">
            <Cabin cabin={cabin}/>
            <div>
                <h2 className="text-accent-400 mb-10 text-center text-2xl font-semibold sm:text-4xl lg:text-5xl">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner/>}>
                    <Reservation cabin={cabin}/>
                </Suspense>
            </div>
        </div>
    );
};

export default Page;