const Discord = require('discord.js');
const botconfig = require("../botsettings.json");

module.exports.run = async (bot,message,args) => {
    message.channel.send(
        "-*msg   --Örnek:msg Officer Yazılacak mesaj veya *msg-Guild Member-Yazılacak mesaj\n"+
        "-*status --botun online durumunu kontrol eder\n"+
        "-*move  --Örnek:move-oda1-oda7 veya *move-all-oda5\n"+
        "-*duyuru --Örnek:duyuru-mesaj\n"
    );
}

module.exports.config = {
    name: "help",
    description: "Help",
    usage: "*help",
    accesableby: "Members",
    aliases:[]
}