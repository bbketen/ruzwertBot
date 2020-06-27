const Discord = require('discord.js');
const botconfig = require("../botsettings.json");

module.exports.run = async (bot,message,args) => {
    message.channel.send('Burdayım!!!');
}

module.exports.config = {
    name: "status",
    description: "If online or not",
    usage: "*status",
    accesableby: "Members",
    aliases:[]
}