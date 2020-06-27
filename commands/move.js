const Discord = require('discord.js');
const botconfig = require("../botsettings.json");

module.exports.run = async (bot,message,args) => {
    if(message.member.hasPermission('MANAGE_GUILD')){
        let toChannel;
        let control = false;
        if(args.length == 2){
            if(args[0] == "all"){
                message.guild.channels.cache.map((channel) => {
                    if(channel.name.toUpperCase().trim().includes(args[1].toUpperCase().trim())){
                        toChannel = channel.id;
                    }
                })
                message.guild.channels.cache.map((channel) => {
                    if(channel.type == 'voice'){
                        channel.members.map((user) => {
                            user.voice.setChannel(toChannel);
                        })
                    }
                })
            } else{
                message.guild.channels.cache.map((channel) => {
                    let dcchannel = channel.name.toUpperCase().trim().replace(' ', '');
                    let parachannel = args[1].toUpperCase().trim().replace(' ','');
                    if(dcchannel.includes(parachannel)){
                        toChannel = channel.id;
                    }
                })
                message.guild.channels.cache.map((channel) => {
                    if(channel.type == 'voice'){
                        let dcchannel = channel.name.toUpperCase().trim().replace(' ', '');
                        if(dcchannel.includes(args[0].toUpperCase().replace(' ',''))){
                            channel.members.map((user) => {
                                user.voice.setChannel(toChannel);
                            })
                            if(toChannel){
                                control = true;
                            }
                        }
                    } 
                })
            }
            console.log(control);
            if(control){
                message.channel.send("Başarıyla Gerçekleştirildi.");
            } else {
                message.channel.send("Oda bulunamadı.");
            }
        } else{
            message.channel.send("Eksik veya hatalı giriş yaptınız. Tekrar deneyiniz.");
        }
    } else{
        message.channel.send("Yetkiniz bulunmamaktadır.")
    }
}

module.exports.config = {
    name: "move",
    description: "Moving members",
    usage: "*move",
    accesableby: "Members",
    aliases:[]
}