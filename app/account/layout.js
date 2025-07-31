import SideNavigation from "@/app/_components/SideNavigation";

const Layout = ({ children }) => {
    return (
        <div className="account-container">
            <SideNavigation/>
            <div className="py-1">
                {children}
            </div>
        </div>
    );
};

export default Layout;