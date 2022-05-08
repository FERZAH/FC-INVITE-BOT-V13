const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed, Interaction } = require('discord.js');
const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sıfırla')
        .setDescription('Girdiğin kullanıcının veya sunucunun tüm verisini sıfırlama!')
        .addUserOption(target => {
            return target.setName('member').setDescription(`Verisini sıfırlamak istediğin kullanıcı.`)
        })
        .addStringOption(cmd => {
            return cmd.setName('cmd').setDescription(`Yapılacak işlem (top).`)
        }),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async run(interaction) {
        let member;
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
        if (interaction.options.getString('cmd') === 'top') {
            let data = await inviteSchema.findOne({ guildID: interaction.guild.id });
            if (!data) return interaction.reply({ embeds: [guildEmbed.setDescription(`Veri tabanında davet bilgisi bulunamadı!`)], ephemeral: true }).catch(e => { });
            await inviteSchema.deleteMany({ guildID: interaction.guild.id }).then(async (a) => {
                await interaction.reply({ embeds: [guildEmbed.setDescription(`Sunucuya ait tüm davet verileri silindi!`)], ephemeral: true }).catch(e => { });
            }).catch(async (e) => {
                await interaction.reply({ embeds: [guildEmbed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)], ephemeral: true }).catch(e => { });
            })
        }
        if (interaction.options.getMember('member')) {
            member = interaction.options.getMember('member');
            let data = await inviteSchema.findOne({ guildID: interaction.guild.id, userID: member.id });
            if (!data) return interaction.reply({ embeds: [guildEmbed.setDescription(`Veri tabanında davet bilgisi bulunamadı!`)], ephemeral: true }).catch(e => { });
            await inviteSchema.deleteOne({ guildID: interaction.guild.id, userID: member.id }).then(async (a) => {
                await interaction.reply({ embeds: [guildEmbed.setDescription(`Kullanıcıya ait tüm davet verileri silindi!`)], ephemeral: true }).catch(e => { });
            }).catch(async (e) => {
                await interaction.reply({ embeds: [guildEmbed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)], ephemeral: true }).catch(e => { });
            })
        } else {
            await interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen bir kullanıcı seçiniz!`)], ephemeral: true }).catch(e => { });
        }
    }
};