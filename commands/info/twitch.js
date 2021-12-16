const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'twitch',
    category : 'info',
    description : "Raian's twitch, its very cool check it out.",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        message.channel.send('https://www.twitch.tv/raianmc');
    }
}
