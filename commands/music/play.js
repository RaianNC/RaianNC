const {Client, Message, MessageEmbed}= require('discord.js');

module.exports = {
    name : "play",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async (client, message, args) => {
        if(!message.memeber.voice.channel)
            return message.reply("Please join a voice channel.");

        const query = args.join(" ");
        if (!query) return message.reply("Please enter a song name.");

        await client.player.play(message, query);
    },
};