import { auth } from "@/app/_lib/auth";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = async () => {
    const session = await auth();
    
    return (
        <header className="header">
            <div className="header__container">
                <Logo/>
                <Navigation user={session?.user}/>
            </div>
        </header>
    );
};

export default Header;