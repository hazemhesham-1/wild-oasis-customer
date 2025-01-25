import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";

const Cabin = ({ cabin }) => {
    const {
        id,
        name,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount,
        image,
        description
    } = cabin;

    return (
        <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3 mb-24">
            <div className="relative scale-[1.15] -translate-x-3">
                <Image
                    src={image}
                    fill
                    className="object-cover"
                    alt={`Cabin ${name}`}
                />
            </div>
            <div>
                <h3 className="bg-primary-950 text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] p-6 pb-1 w-[150%]">
                    Cabin {name}
                </h3>
                <p className="text-lg text-primary-300 mb-10">
                    {description && <TextExpander>{description}</TextExpander>}
                </p>
                <ul className="flex flex-col gap-4 mb-7">
                    <li className="flex items-center gap-3">
                        <UserIcon className="h-5 w-5 text-primary-600"/>
                        <span className="text-lg">
                            For up to <span className="font-bold">{maxCapacity}</span>
                            {" "} guests
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 text-primary-600"/>
                        <span className="text-lg">
                            Located in the heart of the <span className="font-bold">Dolomites</span>
                            {" "} (Italy)
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <EyeSlashIcon className="h-5 w-5 text-primary-600"/>
                        <span className="text-lg">
                            Privacy <span className="font-bold">100%</span>
                            {" "} guaranteed
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Cabin;