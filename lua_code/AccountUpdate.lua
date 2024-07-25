local urlAPI = "{urlAPI}" -- replace with your API URL
local accountId = "{accountId}" -- don't change this

local HttpService = game:GetService("HttpService")
local httpRequest = (syn and syn.request) or http_request or request or (http and http.request) or nil
local playerName = game.Players.LocalPlayer.Name
local inventory = game:GetService("ReplicatedStorage").Remotes.GetInventory:InvokeServer()
local traitCrystal = inventory.Items["Trait Crystal"]
local riskyDice = inventory.Items["Risky Dice"]
local raidSharpyellow = inventory.Items["Raid Shards (Yellow)"]
local raidSharpred = inventory.Items["Raid Shards (Red)"]
local level = inventory.Level
local gems = inventory.Currencies.Gems
local gold = inventory.Currencies.Gold

function nilcheck(Instant)
    if Instant == nil then
        return "0"
    else
        return Instant
    end
end

local Stars ={["Star Rift (Blue)"] =  nilcheck(inventory.Items["Star Rift (Blue)"]) ,
["Star Rift (Dark)"] =  nilcheck(inventory.Items["Star Rift (Dark)"]) ,
["Star Rift (Rainbow)"] =  nilcheck(inventory.Items["Star Rift (Rainbow)"]) ,
["Star Rift (Green)"] =  nilcheck(inventory.Items["Star Rift (Green)"]) ,
["Star Rift (Red)"] =  nilcheck(inventory.Items["Star Rift (Red)"]) ,
["Star Rift (Yellow)"] =  nilcheck(inventory.Items["Star Rift (Yellow)"]) ,
["Star Rift (Purple)"] =  nilcheck(inventory.Items["Star Rift (Purple)"]) ,}

local data = {
    account_id = accountId,
    player_id = nilcheck(playerName),
    level = nilcheck(level),
    gold = nilcheck(gold),
    gems = nilcheck(gems),
    trait_crystal = nilcheck(traitCrystal),
    star_rift_blue = nilcheck(Stars["Star Rift (Blue)"]),
    star_rift_dark = nilcheck(Stars["Star Rift (Dark)"]),
    star_rift_rainbow = nilcheck(Stars["Star Rift (Rainbow)"]),
    star_rift_green = nilcheck(Stars["Star Rift (Green)"]),
    star_rift_red = nilcheck(Stars["Star Rift (Red)"]),
    star_rift_yellow = nilcheck(Stars["Star Rift (Yellow)"]),
    star_rift_purple = nilcheck(Stars["Star Rift (Purple)"]),
    risky_dice = nilcheck(riskyDice),
    raid_shards_yellow = nilcheck(raidSharpyellow),
    raid_shardpred = nilcheck(raidSharpred),
    Device = getgenv().Device
}

local jsonData = HttpService:JSONEncode(data)

local request = httpRequest{
    Url = urlAPI, -- replace with your API URL
    Method = "POST",
    Headers = {
        ["Content-Type"] = "application/json"
    },
    Body = jsonData
}