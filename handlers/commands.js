const fs = require('fs');
const client = global.client;
const commandFiles = fs.readdirSync('./Commands');
commandFiles.filter(files => !files.endsWith('.js') && files.toString() != "SlashCmd").forEach(files => {
    fs.readdirSync(`./Commands/${files}`).forEach(file => {
        if (!file.endsWith('.js')) return;
        const command = require(`../Commands/${files}/` + file);
        client.commands.set(command.conf.name, command);
        command.conf.aliases.forEach(alias => {
            client.aliases.set(alias, command.conf.name);
        });
    })
});

console.log(`[Commands] ${client.commands.size} Komut çalıştırıldı!`);