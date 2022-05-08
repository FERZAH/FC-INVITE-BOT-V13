const fs = require('fs');
const client = global.client;

const event = fs.readdirSync('./Events');

event.filter(file => file.endsWith('.js')).forEach(file => {
    const prop = require(`../Events/${file}`);
    if (!prop.event) return;
    client.on(prop.event.name, prop);
});

console.log(`[Events] ${event.length} Event çalıştırıldı.`);