import { auth } from "@/app/_lib/auth";
import { getCountry, getGuest } from "@/app/_lib/data-service";
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
    title: "Update profile",
};

const Page = async () => {
    const session = await auth();
    const guest = await getGuest(session.user.email);
    const guestCountry = await getCountry(guest?.country_code);
    const countryFlag = guestCountry?.flag ?? "";
    
    return (
        <div>
            <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
                Update your guest profile
            </h2>
            <p className="text-primary-200 mb-8 text-lg">
                Providing the following information will make your check-in
                process faster and smoother. See you soon!
            </p>
            <UpdateProfileForm guest={{ ...guest, countryFlag }}>
                <SelectCountry
                    key={countryFlag}
                    name="nationality"
                    id="nationality"
                    className="form-field"
                    defaultCountry={guest.nationality}
                />
            </UpdateProfileForm>
        </div>
    );
};

export default Page;