const Discord = require('discord.js');
const mysql = require('mysql');
const fs = require("fs");
const botsettings = require("./botsettings.json");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const client = new Discord.Client();
bot.db = require("quick.db");
bot.request = new (require("rss-parser"))();
bot.config = require("./config.js");

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

bot.on("ready", () => {
    handleUploads();
});


bot.login(process.env.token);
//bot.login(bot.config.token)

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

function handleUploads() {
    console.log("deniyorum!!");
    if (bot.db.fetch(`postedVideos`) === null) bot.db.set(`postedVideos`, []);
    setInterval(() => {
        bot.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${bot.config.channel_id}`)
        .then(data => {
            if (bot.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                bot.db.set(`videoData`, data.items[0]);
                bot.db.push("postedVideos", data.items[0].link);
                let parsed = bot.db.fetch(`videoData`);
                let channel = bot.channels.cache.get(bot.config.channel);
                if (!channel) return;
                let message = bot.config.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, bot.config.watchInterval);
}
