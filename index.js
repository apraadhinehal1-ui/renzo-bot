const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = "MTQ5MDcxNDE0NDgzNDMyMjU1Mg.GPEnQn.jcQzZxleAXnaT5-2GzGJGpg6c-i0mE6lC2b5Ww";
const CHANNEL_ID = "1490715538337562735";

const app = express();
app.use(bodyParser.json());

// 📩 Minecraft se message receive
app.post('/chat', (req, res) => {
  const { player, message } = req.body;

  const channel = client.channels.cache.get(CHANNEL_ID);
  if (channel) {
    channel.send(`**${player}** » ${message}`);
  }

  res.sendStatus(200);
});

// 💻 Discord command → Minecraft
let lastCommand = "";

app.get('/command', (req, res) => {
  res.json({ command: lastCommand });
  lastCommand = "";
});

client.on('messageCreate', (msg) => {
  if (msg.content.startsWith("!cmd ")) {
    lastCommand = msg.content.replace("!cmd ", "");
    msg.reply("Command sent to server ✅");
  }
});

client.login(TOKEN);

// 🌐 server start
app.listen(3000, () => console.log("API running on port 3000"));
