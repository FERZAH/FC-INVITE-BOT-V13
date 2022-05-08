const inviteSchema = require('../../models/invite');
const ayar = require('../../config');
module.exports = {
    conf: {
        name: "invite",
        aliases: [],
        enabled: true,
        cooldown: 0,
    },
    run: async (client, message, args, authorEmbed, guildEmbed) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
        if (!data) return message.channel.send({ embeds: [guildEmbed.setDescription(`Veri tabanında davet bilginiz bulunamadı!`)] }).sil(7);
        message.channel.send({ embeds: [guildEmbed.setDescription(`${message.member} Kullanıcısının (Gerçek: **${data.Regular}** Sahte: **${data.Fake}** Ayrılan: **${data.Left}** Bonus: **${data.Bonus}**)!`)] }).sil(7);
    }
}

