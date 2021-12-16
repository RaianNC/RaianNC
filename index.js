const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
        disableEveryone: true,
        partials : ["MESSAGE", "CHANNEL", "REACTION"]
});    
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
const { default: chalk } = require("chalk");
const { table } = require("table");
const client = require("../index");

client.on("ready", () => {
  const data = [
    ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "The bot that I am logged in as."],
    ["SERVERS", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "The amount of servers that I am in."],
    ["USERS", `${chalk.green.bold(client.users.cache.size.toLocaleString())}`, "The amount of users using my commands."],
    ["PREFIX", `${chalk.cyan.bold(client.config.prefix)}`, "The prefix to use to run my commands"],
    ["COMMANDS", `${chalk.blue.bold(client.commands.size.toLocaleString())}`, "Commands Loaded"]
  ]
  client.user.setActivity({ name: `${client.config.prefix}`, type: "PLAYING" })
  
  const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,
  
      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,
  
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
  
      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }, 
    header: {
      alignment: 'center',
      content: "CLIENT DATA"
    }
  };
  console.log(table(data, config))
});

client.on('guildMemberAdd', member =>{
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');
    console.log(welcomeRole);
    member.roles.add(welcomeRole);
    //member.guild.channels.cache.get('879516105721385032').send(`Welcome <@${member.user.id}> to our server! Make sure to check out the rules!`)
});

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})
client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '897242136712454144'){
        if(reaction.emoji.name === '📰') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('879521561353269280')
            user.send('You will now be notified of news and updates.')
        }
    }
    if(reaction.message.id === '897242136712454144'){
        if(reaction.emoji.name === '🗓️') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('879522200707809390')
            user.send('You will now be notified when Raian goes live.')
        }
    }
})
client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '897242136712454144'){
        if(reaction.emoji.name === '📰') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('879521561353269280')
            user.send('You will no longer be notified of news and updates.')
        }
    }
    if(reaction.message.id === '897242136712454144'){
        if(reaction.emoji.name === '🗓️') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('879522200707809390')
            user.send('You will no longer be notified when Raian goes live.')
        }
    }
})
// you may want to change this to "client.login(token)"
client.login(process.env.RAIANBOT_TOKEN)
