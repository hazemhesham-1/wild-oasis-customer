import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export const revalidate = 3600;

async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);
    return { title: `Cabin ${name}` };
}

async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return ids;
}

const Page = async ({ params }) => {
    const cabin = await getCabin(params.cabinId);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin}/>
            <div>
                <h2 className="text-accent-400 text-5xl font-semibold text-center mb-10">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner/>}>
                    <Reservation cabin={cabin}/>
                </Suspense>
            </div>
        </div>
    );
};

export { generateMetadata, generateStaticParams };

export default Page;