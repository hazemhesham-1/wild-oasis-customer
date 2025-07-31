import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/about-1.png";
import image2 from "@/public/about-2.png";
import { getCabins } from "@/app/_lib/data-service";

export const revalidate = 86400;

export const metadata = {
    title: "About",
};

const Page = async () => {
    const cabins = await getCabins();

    return (
        <div className="about-container">
            <div className="about-container__content">
                <h1 className="about-container__heading">
                    Welcome to The Wild Oasis
                </h1>
                <div className="space-y-4 lg:space-y-8">
                    <p>
                        Where nature's beauty and comfortable living blend
                        seamlessly. Hidden away in the heart of the Italian
                        Dolomites, this is your paradise away from home. But
                        it's not just about the luxury cabins. It's about the
                        experience of reconnecting with nature and enjoying
                        simple pleasures with family.
                    </p>
                    <p>
                        Our {cabins.length} luxury cabins provide a cozy base,
                        but the real freedom and peace you will find in the
                        surrounding mountains. Wander through lush forests,
                        breathe in the fresh air, and watch the stars twinkle
                        above from the warmth of a campfire or your hot tub.
                    </p>
                    <p>
                        This is where memorable moments are made, surrounded by
                        nature's splendor. It's a place to slow down, relax, and
                        feel the joy of being together in a beautiful setting.
                    </p>
                </div>
            </div>
            <div className="max-w-[525px] mx-auto mb-5 lg:col-span-2">
                <Image
                    src={image1}
                    alt="Family sitting around a fire pit in front of cabin"
                    placeholder="blur"
                    quality={80}
                />
            </div>
            <div className="relative aspect-square w-full max-w-[450px] mx-auto row-start-4 sm:row-[3/6] lg:col-span-2 lg:row-span-2">
                <Image
                    src={image2}
                    fill
                    className="object-cover"
                    alt="Family that manages The Wild Oasis"
                />
            </div>
            <div className="about-container__content">
                <h1 className="about-container__heading">
                    Managed by our family since 1962
                </h1>
                <div className="space-y-4 lg:space-y-8">
                    <p>
                        Since 1962, The Wild Oasis has been a cherished
                        family-run retreat. Started by our grandparents, this
                        haven has been nurtured with love and care, passing down
                        through our family as a testament to our dedication to
                        creating a warm, welcoming environment.
                    </p>
                    <p>
                        Over the years, we've maintained the essence of The Wild
                        Oasis, blending the timeless beauty of the mountains
                        with the personal touch only a family business can
                        offer. Here, you're not just a guest, you're part of our
                        extended family. So join us at The Wild Oasis soon,
                        where tradition meets tranquility, and every visit is
                        like coming home.
                    </p>
                </div>
            </div>
            <div className="mx-auto sm:m-0 lg:col-span-3 xl:-mt-32">
                <Link href="cabins" className="primary-button">
                    Explore our luxury cabins
                </Link>
            </div>
        </div>
    );
};

export default Page;