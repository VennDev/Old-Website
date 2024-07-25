import fs from 'fs/promises';

export default async function GET(req, res) {
    try {
        if (!req.query.id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const filePath = './lua_code/AccountUpdate.lua';
        let data;
        try {
            data = await fs.readFile(filePath, 'utf8');
            // replace {accountId} with the id from the request
            data = data.replace(/{accountId}/g, req.query.id);
        } catch (err) {
            return res.status(400).json({message: "Error reading file"});
        }
        //
        // const id = req.query.id;
        //
        // const newScriptResponse = await fetch('https://api.luaobfuscator.com/v1/obfuscator/newscript', {
        //     method: 'POST',
        //     headers: {
        //         'apikey': '5e632745-d898-d3b7-8c1e-40832ca05a7b87ae',
        //         'content-type': 'text'
        //     },
        //     body: data
        // });
        //
        // if (!newScriptResponse.ok) {
        //     return res.status(newScriptResponse.status).json({message: "Error creating new script session"});
        // }
        //
        // const newScriptResult = await newScriptResponse.json();
        // const sessionId = newScriptResult.sessionId;
        //
        // const obfuscateResponse = await fetch('https://api.luaobfuscator.com/v1/obfuscator/obfuscate', {
        //     method: 'POST',
        //     headers: {
        //         'apikey': '5e632745-d898-d3b7-8c1e-40832ca05a7b87ae',
        //         'sessionId': sessionId,
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "MinifyAll": true,
        //         "Virtualize": true
        //     })
        // });
        //
        // if (!obfuscateResponse.ok) {
        //     return res.status(obfuscateResponse.status).json({message: "Error obfuscating script"});
        // }
        //
        // const obfuscateResult = await obfuscateResponse.json();
        return res.status(200).json({code: data});

    } catch (error) {
        console.log(error);
        return res.redirect('/tables/AnimeDefenders');
    }
}