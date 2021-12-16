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
const chalk = require('chalk') //Chalk Package
client.on("ready", async () => {
  console.clear();
  console.log(chalk.green.bold("Success!"))
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  )
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`)
  );
  console.log("")
  console.log(chalk.red.bold("——————————[Statistics]——————————"))
  console.log(chalk.gray(`Running on Node ${process.version} on ${process.platform} ${process.arch}`))
  console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))
})

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
