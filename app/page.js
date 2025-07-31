import Image from "next/image";
import Link from "next/link";
import background from "@/public/background.png";

const Homepage = () => {
    return (
        <main className="flex items-center justify-center size-full">
            <Image
                src={background}
                fill
                placeholder="blur"
                quality={80}
                className="object-cover object-top"
                alt="Modern cabin surrounded by a foggy forest in the mountains beside a calm river, with warm interior lighting and a deck overlooking the water."
            />
            <div className="homepage">
                <h1 className="homepage__title">
                    Welcome to paradise
                </h1>
                <Link href="/cabins" className="primary-button mx-auto">
                    Explore luxury cabins
                </Link>
            </div>
        </main>
    );
};

export default Homepage;