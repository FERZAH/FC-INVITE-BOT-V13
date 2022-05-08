const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed } = require('discord.js');
const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Davet bilginizi gösteren komut!')
        .addUserOption(target => {
            return target.setName('member').setDescription(`Davet bilgisini görmek istediğin kullanıcı.`)
        }),
    /**
     * 
     * @param {InteractionCollector} interaction 
     */
    async run(interaction) {
        let member;
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
        if (interaction.options.getMember('member')) {
            member = interaction.options.getMember('member');
        } else {
            member = interaction.member;
        }
        let data = await inviteSchema.findOne({ guildID: interaction.guild.id, userID: member.id });
        if (!data) return interaction.reply({ embeds: [guildEmbed.setDescription(`Veri tabanında davet bilginiz bulunamadı!`)], ephemeral: true });
        interaction.reply({ embeds: [guildEmbed.setDescription(`${interaction.member} Kullanıcısının (Gerçek: **${data.Regular || 0}** Sahte: **${data.Fake || 0}** Ayrılan: **${data.Left || 0}** Bonus: **${data.Bonus || 0}**)!`)], ephemeral: true });
    }
};