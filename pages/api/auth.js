import vbrequest from "vb-request";

export default async function POST(req, res) {
    try {
        const {username, password} = await req.body;
        const url_origin = req.headers.origin;

        if (!username || !password) {
            return res.status(400).json({message: "Missing required fields"});
        }

        let id;

        await fetch(
            url_origin + "/api/accounts/getId?username=" + username + "&password=" + password,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        id = data.result[0].account_id;
                        vbrequest.post('accounts', '/set-online/' + id).then((response) => {
                            response.body.getReader().read().then(({value, done}) => {
                                let result = new TextDecoder().decode(value);
                                return res.status(200).json({id: id});
                            });
                        }).then(r => r);
                        return res.status(200).json({id: id});
                    });
                }
            })
            .catch((error) => {
                console.error("Error logging in ", error);
                return res.status(500).json({message: "Internal server error"});
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}