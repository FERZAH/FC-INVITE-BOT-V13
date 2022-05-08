const ayar = require("../config");
const { connect, connection } = require("mongoose");

connect(ayar.bot.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log("[MongoDB] bağlantısı başarılı!");
});
