const ayar = require('../../config');
const inviteSchema = require('../../models/invite');
module.exports = {
    conf: {
        name: "bonus",
        aliases: [],
        enabled: true,
        cooldown: 0,
    },
    run: async (client, message, args, authorEmbed, guildEmbed) => {
        let cmd = args[0];
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        let value = Number(args[2]);
        if (cmd == 'ekle') {
            if (!member) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bir kullanıcı belirtmelisin.`)] }).sil(7);
            if (!value) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bir değer belirtmelisin.`)] }).sil(7);

            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id })
            if (!data) {
                await new inviteSchema({ guildID: message.guild.id, userID: member.id, Regular: 0, Fake: 0, Left: 0, leftedMembers: [], Bonus: value }).save();
                await message.channel.send({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)] }).sil(10);
            } else {
                data.Bonus += value
                await data.save();
                await message.channel.send({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)] }).sil(10);

            }
        } else if (cmd == 'sil') {
            if (!member) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bir kullanıcı belirtmelisin.`)] }).sil(7);
            if (!value) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bir değer belirtmelisin.`)] }).sil(7);
            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
            if (!data) return message.channel.send({ embeds: [guildEmbed.setDescription(`Bu kullanıcının davet verisi bulunamadı`)] }).sil(7);
            data.Bonus -= value;
            await data.save();
            await message.channel.send({ embeds: [guildEmbed.setDescription(`${member} Adlı kullanıcıdan **${value}** adet bonus davet silindi!`)] }).sil(10);
        } else {
            message.channel.send({ embeds: [guildEmbed.setDescription(`Lütfen argümanları eksiksiz giriniz. \`${ayar.bot.botPrefix}bonus [ekle/sil] [@Member/ID] [10]\``)] })
        }
    }
}

