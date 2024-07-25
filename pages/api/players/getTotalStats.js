import vbrequest from "vb-request";

export default async function GET(req, res) {
    try {
        if (!req.query.id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const id = req.query.id;

        let response = await vbrequest.get('players', '/get-total-stats-by-id-user/' + id);
        response.body.getReader().read().then(({value, done}) => {
            try {
                let result = new TextDecoder().decode(value);
                result = (JSON.parse(result)).result;
                result.map((items) => {
                    for (let key in items) {
                        items[key] = items[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                    return items;
                });
                return res.status(200).json(result);
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: "Internal server error"});
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}