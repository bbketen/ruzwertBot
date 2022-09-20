const Discord = require('discord.js');
const botconfig = require("../botsettings.json");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.config = require("../config.js");


module.exports.run = async (bot,message,args) => {
    if(message.member.hasPermission('MANAGE_GUILD')){
        const channel = await bot.channels.fetch("721842307795779705");
        let hata = 0;
        //const channel = await bot.channels.fetch(bot.config.channel);
        if(args.length == 2){
            if(args[0] == "twitch"){
                //channel = await bot.channels.fetch(bot.config.tw_channel);
                channel.send("@everyone "+args[1]+" https://www.twitch.tv/ruzwert");
            } else if(args[0] == "youtube"){
                channel.send("@everyone "+args[1]);
            } else {
                hata=1;
            }
        } else if(args.length == 1){
            channel.send("@everyone "+args[0]);
        } else{
            hata=1;
        }
        if(hata==1){
            message.channel.send("Hatalı komut girdiniz örnek komut: duyuru-youtube/twitch-mesaj(mesaj yoksa sadece - yazınız)");
        }
    } else{
        message.channel.send("Yetkiniz bulunmamaktadır.");
    }
}

module.exports.config = {
    name: "duyuru",
    description: "Duyuru",
    usage: "*duyuru",
    accesableby: "Members",
    aliases:[]
}