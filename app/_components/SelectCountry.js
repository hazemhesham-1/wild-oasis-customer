import { getCountries } from "@/app/_lib/data-service";

const SelectCountry = async ({ defaultCountry, name, id, className }) => {
    const countries = await getCountries();
    const flag = countries.find((country) => country.name === defaultCountry)?.flags.svg ?? "";
    
    return (
        <select
            name={name}
            id={id}
            defaultValue={`${defaultCountry}%${flag}`}
            className={className}
        >
            <option value="" key="">Select country...</option>
            {countries.map((country) =>
                <option
                    key={country.name}
                    value={`${country.name}%${country.flags.svg}`}
                >
                    {country.name}
                </option>
            )}
        </select>
    );
};

export default SelectCountry;