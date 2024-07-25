import vbrequest from "vb-request";

export default async function POST(req, res) {
    try {
        const {id, idUser} = req.body;

        if (!id || !idUser) {
            return res.status(400).json({message: "Missing required fields"});
        }

        let resp = await vbrequest.post('players', '/create/' + id + '/' + idUser);
        resp.body.getReader().read().then(({value, done}) => {
            try {
                let result = new TextDecoder().decode(value);
                result = JSON.parse(result);

                if (result["message-error"]) {
                    return res.redirect('/tables/AnimeDefenders?error=' + result["message-error"]);
                }

                const messageSuccess = 'Created successful!';

                return res.redirect('/tables/AnimeDefenders?success=' + messageSuccess);
            } catch (error) {
                return res.redirect('/tables/AnimeDefenders?error=Please, try again later');
            }
        });

    } catch (error) {
        console.log(error);
        return res.redirect('/tables/AnimeDefenders');
    }
}