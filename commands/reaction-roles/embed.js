const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'reactionrole',
    run : async(client, message) => {
        const embed = new MessageEmbed()
        .setColor('#70dcdf')
        .setTitle('Reaction Roles')
        .setDescription('\n\n'
            + `React with 📰 to get notified of news and updates\n`
            + `\n`
            + `React with 🗓️ to get notified when I go live.`);

        const msg = await message.channel.send(embed)
        await msg.react('📰')
        await msg.react('🗓️')
        
    }
}