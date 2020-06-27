const Discord = require('discord.js');
const botconfig = require("../botsettings.json");

module.exports.run = async (bot,message,args) => {
    if(message.member.hasPermission('MANAGE_GUILD')){
        let perm = args[0];
        let isPerm = message.guild.roles.cache.find(r => r.name.toUpperCase().includes(perm.toUpperCase()));
        if(isPerm){
            args.splice(0,1);
            let msg = '';
            for(let i=0;i<args.length;i++){
                msg += args[i] + ' ';
            }
            let role = message.guild.roles.cache.find(r => r.name.toUpperCase().includes(perm.toUpperCase()));
            role.guild.members.cache.map((user)=>{
                for(let i = 0; i<user._roles.length; i++){
                    if(user._roles[i] == role.id){
                        user.send(msg);
                    }
                }
            }) 
            message.channel.send("Başarıyla Gönderildi.")
        } else{
            message.channel.send(args[0] + " adında bir rol bulunmamaktadır.");
        }
    } else{
        message.channel.send("Yetkiniz bulunmamaktadır.")
    }
}

module.exports.config = {
    name: "msg",
    description: "Message to mentioned rolls",
    usage: "*msg",
    accesableby: "Members",
    aliases:[]
}

