import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";

const Cabin = ({ cabin }) => {
    const {
        name,
        max_capacity: maxCapacity,
        image,
        description
    } = cabin;

    return (
        <div className="cabin-details">
            <div className="cabin-details__image-wrapper">
                <Image
                    src={image}
                    fill
                    className="object-cover"
                    alt={`Cabin ${name}`}
                />
            </div>
            <div className="p-4 lg:p-0">
                <h3 className="cabin-details__title">
                    Cabin {name}
                </h3>
                <p className="cabin-details__description">
                    {description && <TextExpander>{description}</TextExpander>}
                </p>
                <ul className="cabin-details__list">
                    <li className="cabin-info">
                        <UsersIcon className="icon"/>
                        <span className="text-sm sm:text-lg">
                            For up to <span className="font-bold">{maxCapacity}</span>
                            {" "}guests
                        </span>
                    </li>
                    <li className="cabin-info">
                        <MapPinIcon className="icon"/>
                        <span className="text-sm sm:text-lg">
                            Located in the heart of the <span className="font-bold">Dolomites</span>
                            {" "}(Italy)
                        </span>
                    </li>
                    <li className="cabin-info">
                        <EyeSlashIcon className="icon"/>
                        <span className="text-sm sm:text-lg">
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