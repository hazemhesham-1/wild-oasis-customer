import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="logo group">
            <div className="logo__icon-wrapper">
                <Image
                    src="/logo.png"
                    fill
                    quality={100}
                    alt="The Wild Oasis logo"
                />
            </div>
            <span className="logo__name">
                The Wild Oasis
            </span>
        </Link>
    );
};

export default Logo;