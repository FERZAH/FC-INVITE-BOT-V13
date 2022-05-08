const fs = require('fs');
const client = global.client;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, guild } = require('../config.js');
const rest = new REST({ version: '9' }).setToken(bot.botToken);
const commands = [];
const commandFiles = fs.readdirSync('./Commands');
commandFiles.filter(files => !files.endsWith('.js') && files.toString() == "SlashCmd").forEach(files => {
    fs.readdirSync(`./Commands/${files}`).forEach(file => {
        if (!file.endsWith('.js')) return;
        const command = require(`../Commands/${files}/` + file);
        commands.push(command.data.toJSON());
        client.slashCommands.set(command.data.name, command);
    })
})

rest.put(Routes.applicationGuildCommands(bot.botID, guild.id), { body: commands })
    .then(() => console.log(`[SlashCMD] ${commands.length} Komut çalıştırıldı!`))
    .catch(console.error);