import vbrequest from "vb-request";

export default async function POST(req, res) {
    try {
        if (
            !req.body.account_id && !req.body.player_id && !req.body.level &&
            !req.body.gold && !req.body.gems && !req.body.trait_crystal &&
            !req.body.star_rift_blue && !req.body.star_rift_rainbow && !req.body.star_rift_green &&
            !req.body.star_rift_red && !req.body.star_rift_yellow && !req.body.star_rift_purple &&
            !req.body.raid_sharp_yellow && !req.body.raid_sharpred && !req.body.risky_dice
        ) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const account_id = req.body.account_id;
        const player_id = req.body.player_id;
        const level = req.body.level;
        const gold = req.body.gold;
        const gems = req.body.gems;
        const trait_crystal = req.body.trait_crystal;
        const star_rift_blue = req.body.star_rift_blue;
        const star_rift_rainbow = req.body.star_rift_rainbow;
        const star_rift_green = req.body.star_rift_green;
        const star_rift_red = req.body.star_rift_red;
        const star_rift_yellow = req.body.star_rift_yellow;
        const star_rift_purple = req.body.star_rift_purple;
        const raid_sharp_yellow = req.body.raid_sharp_yellow;
        const raid_sharpred = req.body.raid_sharpred;
        const risky_dice = req.body.risky_dice;

        // "value" => "/update/{account_id}/{player_id}/{level}/{gold}/{gems}/{trait_crystal}/{star_rift_blue}/{star_rift_rainbow}/{star_rift_green}/{star_rift_red}/{star_rift_yellow}/{star_rift_purple}/{star_rift_purple}/{raid_sharp_yellow}/{raid_sharpred}/{risky_dice}",
        let response = await vbrequest.post('accounts', '/update/' + account_id + '/' + player_id + '/' + level + '/' + gold + '/' + gems + '/' + trait_crystal + '/' + star_rift_blue + '/' + star_rift_rainbow + '/' + star_rift_green + '/' + star_rift_red + '/' + star_rift_yellow + '/' + star_rift_purple + '/' + raid_sharp_yellow + '/' + raid_sharpred + '/' + risky_dice);
        response.body.getReader().read().then(({value, done}) => {
            let result = new TextDecoder().decode(value);
            return res.status(200).json(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}