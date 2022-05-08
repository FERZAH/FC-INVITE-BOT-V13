const ayar = require('../../config');
module.exports = {
    conf: {
        name: "yardım",
        aliases: ["help"],
        enabled: true,
        cooldown: 0,
    },
    run: async (client, message, args, authorEmbed, guildEmbed) => {
        await message.channel.send({
            embeds: [guildEmbed.setDescription(`
      \`${ayar.bot.botPrefix}yardım\` **Yardım komutu**
      \`${ayar.bot.botPrefix}bonus\` **Bonus ekleme silme komutu**
      \`${ayar.bot.botPrefix}invite\` **İnvite komutu**
      \`${ayar.bot.botPrefix}top\` **Top invite komutu**
      \`${ayar.bot.botPrefix}sıfırla\` **Veri sıfırlama komutu**
      `)]
        }).sil(30);
    }
}

