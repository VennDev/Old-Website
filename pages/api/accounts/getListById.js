import vbrequest from "vb-request";

export default async function GET(req, res) {
    try {
        if (!req.query.id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        var id = req.query.id;

        let response = await vbrequest.get('accounts', '/get-list-by-id/' + id);
        response.body.getReader().read().then(({value, done}) => {
            try {
                let result = new TextDecoder().decode(value);
                result = (JSON.parse(result)).result;

                //remove account_id field
                result = result.map((item) => {
                    delete item.account_id;
                    return item;
                });

                // replace index with string input
                result = result.map((item) => {
                    let data = {};
                    data["Player Name"] = '<div class="text-center font-bold text-underline"><p class="details-player text-blue-200">' + item.player_id + '</p></div>';
                    data["Level"] = '<div class="border border-primary text-center text-blue-400 font-bold">' + item.level.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>';
                    data["Gold"] = '<div class="border border-warning text-center text-yellow-600 font-bold">' + item.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>';
                    data["Gems"] = '<div class="purple-border text-center text-purple-600 font-bold">' + item.gems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>';
                    data["Trait Crystal"] = item.trait_crystal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Blue"] = item.star_rift_blue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Rainbow"] = item.star_rift_rainbow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Green"] = item.star_rift_green.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Red"] = item.star_rift_red.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Yellow"] = item.star_rift_yellow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Star Rift Purple"] = item.star_rift_purple.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Raid Sharp Yellow"] = item.raid_sharp_yellow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Raid Sharpred"] = item.raid_sharpred.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Risky Dice"] = item.risky_dice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    data["Options"] = '<button type="button" class="delete-btn btn btn-danger" data-id="' + item.player_id + '">X</button>';
                    return data;
                });

                return res.status(200).json(result);
            } catch (err) {
                return res.status(200).json([]);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}