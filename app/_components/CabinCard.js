import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

const CabinCard = ({ cabin }) => {
    const {
        id,
        name,
        image,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount
    } = cabin;

    return (
        <div className="cabin-card">
            <div className="relative">
                <Image
                    src={image}
                    fill
                    alt={`Cabin ${name}`}
                    className="cabin-card__image"
                />
            </div>
            <div className="cabin-card__details">
                <div className="px-7 pt-5 pb-4">
                    <h3 className="cabin-card__title">
                        Cabin {name}
                    </h3>
                    <div className="cabin-info mb-5">
                        <UsersIcon className="icon"/>
                        <p className="text-primary-200 text-lg">
                            For up to <strong>{maxCapacity}</strong> guests
                        </p>
                    </div>
                    <p className="flex items-baseline justify-end gap-3">
                        {discount > 0 ? (
                            <>
                                <span className="text-3xl font-normal">
                                    {regularPrice - discount} EGP
                                </span>
                                <span className="text-primary-600 font-semibold line-through">
                                    {regularPrice} EGP
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-normal">
                                {regularPrice} EGP
                            </span>
                        )}
                        <span className="text-primary-200">/ night</span>
                    </p>
                </div>
                <div className="border-t border-t-primary-800 text-end">
                    <Link href={`/cabins/${id}`} className="cabin-card__button">
                        Details & reservation &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CabinCard;