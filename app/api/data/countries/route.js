import countries from "@/data/countries.json"

async function GET(req, res) {
    return Response.json({ data: countries });
}

export { GET };