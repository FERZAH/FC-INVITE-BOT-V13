const { Client } = require("discord.js");
const { bot } = require('../config.js');
/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    console.log(`[BOT] ` + client.user.tag + ' ismiyle giriş yapıldı!');
    client.user.setPresence({ activities: [{ name: bot.botStatus, type: "WATCHING" }], status: "dnd" });
};

module.exports.event = {
    name: 'ready'
}