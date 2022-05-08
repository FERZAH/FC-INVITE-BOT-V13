const { bot } = require('../config.js');
const { MessageEmbed } = require('discord.js');
const ayar = require('../config.js');
const durkardesim = new Map();
require('../helpers/functions');
module.exports = message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(bot.botPrefix)) return;
    let args = message.content.substring(bot.botPrefix.length).split(" ");
    let command = args[0];
    args = args.splice(1);
    let params = message.content.split(' ').slice(1);
    let cmd = client.commands.has(command) ? client.commands.get(command) : client.commands.get(client.aliases.get(command));
    let authorEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
    let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
    if (cmd) {
        if (cmd.conf.enabled === false) {
            if (!bot.botOwner.includes(message.author.id)) {
                guildEmbed.setDescription(`:x: **${cmd.conf.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`).setColor("RED")
                message.channel.send({ embeds: [guildEmbed] });
                return
            }
        }

        if (bot.botOwner.some(id => message.author.id !== id)) {
            if (durkardesim.has(message.author.id) && durkardesim.get(message.author.id).komut == cmd.conf.name && durkardesim.get(message.author.id).zaman > Date.now()) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, \`${cmd.conf.name}\` komutu kullanabilmek için **${Math.floor((durkardesim.get(message.author.id).zaman - Date.now()) / 1000)}** saniye beklemelisin.`).setColor('RANDOM')).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }));
            durkardesim.set(message.author.id, { komut: cmd.conf.name, zaman: Date.now() + cmd.conf.cooldown });
        }
        cmd.run(client, message, args, authorEmbed, guildEmbed);
    };
};

module.exports.event = {
    name: 'messageCreate'
}