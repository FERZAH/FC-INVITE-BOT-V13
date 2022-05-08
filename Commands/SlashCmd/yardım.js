const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed } = require('discord.js');
const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Bot komutlarını gösteren yardım komutu!'),
    /**
     * 
     * @param {InteractionCollector} interaction 
     */
    async run(interaction) {
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
        interaction.reply({
            embeds: [guildEmbed.setDescription(`
    \`/yardım\` **Yardım komutu**
    \`/bonus\` **Bonus ekleme silme komutu**
    \`/invite\` **İnvite komutu**
    \`/top\` **Top invite komutu**
    \`/sıfırla\` **Veri sıfırlama komutu**
        `)], ephemeral: true
        });
    }
};