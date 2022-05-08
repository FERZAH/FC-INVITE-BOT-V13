const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed, Interaction } = require('discord.js');
const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
      data: new SlashCommandBuilder()
            .setName('bonus')
            .setDescription('Girdiğin kullanıcıya bonus puan verme!')
            .addUserOption(target => {
                  return target.setName('member').setDescription(`Bonus puan vermek istediğin kullanıcı.`)
            })
            .addStringOption(cmd => {
                  return cmd.setName('cmd').setDescription(`Yapılacak işlem [ekle / sil].`)
            })
            .addNumberOption(value => {
                  return value.setName('value').setDescription(`Bonus puan değeri.`)
            }),
      /**
       * 
       * @param {Interaction} interaction 
       */
      async run(interaction) {
            let member;
            let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayar.bot.botStatus });
            if (interaction.options.getMember('member')) {
                  member = interaction.options.getMember('member');
            } else {
                  return interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen bir kullanıcı seçiniz!`)], ephemeral: true }).catch(e => { });
            }
            if (!interaction.options.getString('cmd')) return interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen bir işlem belirtiniz!`)], ephemeral: true }).catch(e => { });
            if (interaction.options.getString('cmd') === 'ekle') {
                  if (!interaction.options.getNumber('value')) return interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen eklenicek miktarı belirtiniz!`)], ephemeral: true }).catch(e => { });
                  let value = interaction.options.getNumber('value');
                  let data = await inviteSchema.findOne({ guildID: interaction.guild.id, userID: member.id })
                  if (!data) {
                        await new inviteSchema({ guildID: interaction.guild.id, userID: member.id, Regular: 0, Fake: 0, Left: 0, leftedMembers: [], Bonus: value }).save();
                        await interaction.reply({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)], ephemeral: true }).catch(e => { });
                  } else {
                        data.Bonus += value
                        await data.save();
                        await interaction.reply({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)], ephemeral: true }).catch(e => { });
                  }
            } else if (interaction.options.getString('cmd') === 'sil') {
                  if (!interaction.options.getNumber('value')) return interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen eklenicek miktarı belirtiniz!`)], ephemeral: true }).catch(e => { });
                  let value = interaction.options.getNumber('value');
                  let data = await inviteSchema.findOne({ guildID: interaction.guild.id, userID: member.id })
                  if (!data) return interaction.reply({ embeds: [guildEmbed.setDescription(`Bu kullanıcının davet verisi bulunamadı`)], ephemeral: true }).catch(e => { });
                  data.Bonus -= value;
                  await data.save();
                  await interaction.reply({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıdan **${value}** adet bonus davet silindi!`)], ephemeral: true }).catch(e => { });
            } else {
                  return interaction.reply({ embeds: [guildEmbed.setDescription(`Lütfen geçerli bir işlem belirtiniz!`)], ephemeral: true }).catch(e => { });
            }
      }
};