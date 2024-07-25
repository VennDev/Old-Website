import vbrequest from "vb-request";

export default async function GET(req, res) {
    try {
        if (!req.query.username || !req.query.password) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const username = req.query.username;
        const password = req.query.password;

        let response = await vbrequest.get('accounts', '/get-id-by-username-and-password/' + username + '/' + password);
        response.body.getReader().read().then(({value, done}) => {
            let result = new TextDecoder().decode(value);
            return res.status(200).json(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}