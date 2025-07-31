import countries from "@/data/countries.json";

async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if(code) {
        const country = countries.find((country) => country.code === code.toUpperCase());
        if(country) {
            const result = {
                data: country,
                message: `Country data found for code '${code.toUpperCase()}'`,
                success: true
            };

            return Response.json(result);
        }

        const result = {
            message: `No country found with code '${code.toUpperCase()}'`,
            success: false
        };

        return Response.json(result, { status: 404 });
    }

    const result = {
        data: countries,
        success: true
    };

    return Response.json(result);
}

export { GET };