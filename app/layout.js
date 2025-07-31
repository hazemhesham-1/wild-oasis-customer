import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_contexts/ReservationContext";
import Header from "./_components/Header";

const josefinFont = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-josefin",
});

export const metadata = {
    title: {
        template: "%s | Wild Oasis",
        default: "Welcome | Wild Oasis",
    },
    description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${josefinFont.className} bg-primary-950 text-primary-100 flex flex-col min-h-screen antialiased`}>
                <Header/>
                <div className="flex-1 grid px-4 py-8 md:px-8 md:py-12">
                    <main className="w-full max-w-7xl mx-auto">
                        <ReservationProvider>
                            {children}
                        </ReservationProvider>
                    </main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;