import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

const CabinList = async ({ filter }) => {
    const cabins = await getCabins();
    
    if(!cabins.length) return null;

    let displayedCabins = cabins;
    if(filter === "small") {
        displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
    }
    else if(filter === "medium") {
        displayedCabins = cabins.filter((cabin) => cabin.max_capacity > 3 && cabin.max_capacity < 8);
    }
    else if(filter === "large") {
        displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
    }

    return (
        <div className="cabin-list">
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id}/>
            ))}
        </div>
    );
};

export default CabinList;