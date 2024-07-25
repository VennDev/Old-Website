import vbrequest from "vb-request";

export default async function POST(req, res) {
    try {
        if (!req.query.id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const id = req.query.id;

        let response = await vbrequest.del('players', '/delete-by-id/' + id);
        response.body.getReader().read().then(({ value, done }) => {
            return res.status(200).json({message: "Deleted successful!"});
        });
    } catch (error) {
        console.log(error);
        return res.redirect('/tables/AnimeDefenders');
    }
}