const { Client, GuildMember, Invite } = require("discord.js");
const client = global.client;
const ayar = require('../config.js');
const inviteSchema = require('../models/invite');
/**
 * 
 * @param {Client} client 
 */
module.exports = async (member, inviter, invite) => {
    let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
    let inviteChannel = client.channels.cache.get(ayar.channels.inviteLog);
    let inviterData = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.user.id });
    if (inviterData) {
        if (isMemberFake) {
            if (invite.code !== member.guild.vanityURLCode) {
                if (inviterData.leftedMembers.includes(member.id)) { await inviterData.leftedMembers.pull(member.id); inviterData.Left-- }
                await inviterData.Fake++;
                await inviterData.save();
            }
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** toplam daveti (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'}**)` })
        } else {
            if (invite.code !== member.guild.vanityURLCode) {
                if (inviterData.leftedMembers.includes(member.id)) { await inviterData.leftedMembers.pull(member.id); await inviterData.Left--; }
                await inviterData.Regular++;
                await inviterData.save().then(async a => {
                });
            }
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** toplam daveti (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'}**)` })
        }
    } else {
        if (isMemberFake) {
            if (invite.code !== member.guild.vanityURLCode) await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 0, Fake: 1, Left: 0, Bonus: 0 }).save();
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** toplam daveti (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'}**)` })
        } else {
            if (invite.code !== member.guild.vanityURLCode) await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 1, Fake: 0, Left: 0, Bonus: 0 }).save();
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** toplam daveti (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'}**)` })
        }
    }
};

module.exports.event = {
    name: 'memberJoin'
}