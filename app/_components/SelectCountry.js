import { getCountries } from "@/app/_lib/data-service";

const SelectCountry = async ({ defaultCountry, name, id, className }) => {
    const countries = await getCountries();
    const code = countries.find((country) => country.name === defaultCountry)?.code ?? "";
    
    return (
        <select
            name={name}
            id={id}
            className={className}
            defaultValue={`${defaultCountry}%${code}`}
        >
            <option value="">Select country...</option>
            {countries.map((country) => (
                <option
                    key={country.name}
                    value={`${country.name}%${country.code}`}
                >
                    {country.name}
                </option>
            ))}
        </select>
    );
};

export default SelectCountry;