const { bot } = require('./config.js');
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const client = global.client = new Client({ intents: [32767] });
const { InviteManager } = require('fc_invite');
InviteManager({ client: client, mongoURL: bot.mongoURL });
client.slashCommands = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
require("./handlers/slashCommands");
require("./handlers/commands");
require("./handlers/events");
require("./handlers/mongoConnect");

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.run(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Hatalı komut!', ephemeral: true }).catch(e => { });
    }
});
client.login(bot.botToken);