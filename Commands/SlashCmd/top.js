const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed } = require('discord.js');
const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Sunucu top 10 davet bilginizi gösteren komut!'),
    /**
     * 
     * @param {InteractionCollector} interaction 
     */
    async run(interaction) {
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
        let data = await inviteSchema.find({ guildID: interaction.guild.id });
        if (data.length < 1) return interaction.reply({ embeds: [guildEmbed.setDescription(`Sunucuya ait davet verisi bulunamadı!`)], ephemeral: true });
        let listed = data.filter(s => s.Regular > 0 && interaction.guild.members.cache.has(s.userID)).sort((a, b) => b.Regular - a.Regular).map((value, index) => `\`${index + 1}.\` <@!${value.userID}> Kullanıcısının (Gerçek: **${value.Regular || 0}** Sahte: **${value.Fake || 0}** Ayrılan: **${value.Left || 0}** Bonus: **${value.Bonus || 0}**)`).slice(0, 10).join('\n');
        interaction.reply({ embeds: [guildEmbed.setDescription(`**${interaction.guild.name}** Sunucusunun top 10 davet verileri; \n\n ${listed}`)], ephemeral: true });
    }
};