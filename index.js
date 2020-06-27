const Discord = require('discord.js');
const mysql = require('mysql');
const fs = require("fs");
const botsettings = require("./botsettings.json");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {
    if(err){
        console.log(err);
    }
    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if(jsFile.length <= 0){
        return console.log("[LOGS] Komutlar Bulunamadı.");
    }

    jsFile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

/*const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testHatred"
})*/

bot.login(process.env.token);
//bot.login(botsettings.token);

bot.on('message', async msg => {
    let prefix = botsettings.prefix;
    let messageArray;
    if(msg.content.includes('-')){
        messageArray = msg.content.split("-");
    } else{
        messageArray = msg.content.split(" ");
    }
    
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!msg.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot,msg,args);

})
