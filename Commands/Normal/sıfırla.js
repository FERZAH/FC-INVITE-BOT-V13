const inviteSchema = require('../../models/invite');
const ayar = require('../../config');
module.exports = {
    conf: {
        name: "sıfırla",
        aliases: [],
        enabled: true,
        cooldown: 0,
    },
    run: async (client, message, args, authorEmbed, guildEmbed) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)] }).sil(7);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (args[0] == 'top') {
            await inviteSchema.deleteMany({ guildID: message.guild.id }).then(a => {
                return message.channel.send({ embeds: [guildEmbed.setDescription(`Sunucuya ait tüm davet verileri silindi!`)] }).sil(7);
            }).catch(e => {
                return message.channel.send({ embeds: [guildEmbed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)] }).sil(7);
            })
        }
        if (!member) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bir kullanıcı etiketleyerek kullanıcının verisini sil veya top yazarak tüm sunucunun verisini silebilirsin!`)] }).sil(7);
        if (member) {
            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
            if (!data) return message.channel.send({ embeds: [guildEmbed.setDescription(`Veri tabanında davet bilgisi bulunamadı!`)] }).sil(7);
            await inviteSchema.deleteOne({ guildID: message.guild.id, userID: member.id }).then(a => {
                return message.channel.send({ embeds: [guildEmbed.setDescription(`Kullanıcıya ait tüm davet verileri silindi!`)] }).sil(7);
            }).catch(e => {
                return message.channel.send({ embeds: [guildEmbed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)] }).sil(7);
            })
        } else {
            return message.channel.send({ embeds: [xguildEmbed.setDescription(`Silinecek veriyi belirtin. \`${ayar.bot.botPrefix}sıfırla [@Member/ID/top]\``)] })
        }
    }
}

