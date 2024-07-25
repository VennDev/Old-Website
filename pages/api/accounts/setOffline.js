import vbrequest from "vb-request";

export default async function GET(req, res) {
    try {
        if (!req.query.id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const id = req.query.id;

        let response = await vbrequest.post('accounts', '/set-offline/' + id);
        response.body.getReader().read().then(({value, done}) => {
            let result = new TextDecoder().decode(value);
            return res.status(200).json(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}