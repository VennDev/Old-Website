import vbrequest from "vb-request";

export default async function GET(req, res) {
    try {
        let response = await vbrequest.get('accounts', '/get-total-online');
        response.body.getReader().read().then(({value, done}) => {
            let result = new TextDecoder().decode(value);
            return res.status(200).json((JSON.parse(result)).result[0]["COUNT(*)"]);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}