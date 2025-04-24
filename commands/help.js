const fs = require('fs');
const path = require('path');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'help',
  description: 'Show available commands',
  usage: 'help\nhelp [command name]',
  author: 'System',
  execute(senderId, args, pageAccessToken) {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const commandFile = commandFiles.find(file => {
        const command = require(path.join(commandsDir, file));
        return command.name.toLowerCase() === commandName;
      });

      if (commandFile) {
        const command = require(path.join(commandsDir, commandFile));
        const commandDetails = `
━━━━━━━━━━━━━━
𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${command.name}
𝙳𝚎𝚜𝚌𝚛𝚒𝚋𝚝𝚒𝚘𝚗: ${command.description}
𝚄𝚜𝚊𝚐𝚎: ${command.usage}
━━━━━━━━━━━━━━`;
        
        sendMessage(senderId, { text: commandDetails }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: `Command "${commandName}" not found.` }, pageAccessToken);
      }
      return;
    }

    const commands = commandFiles.map(file => {
      const command = require(path.join(commandsDir, file));
      return `│ - ${command.name}`;
    });

    const helpMessage = `
━━━━━━━━━━━━━━
𝐥𝐞𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐯𝐚𝐥𝐢𝐝𝐞𝐬 :
╭─╼~~(∩_∩)~~╾─╮
${commands.join('\n')}
╰─━━━🙃━━━━╾─╯
𝐎𝐖𝐍𝐄𝐑: 𝐓𝐇𝐄𝐀 𝐒𝐭𝐚𝐫𝐥𝐢𝐧𝐞𝐬𝐬 (𝐀𝐞𝐬𝐭𝐡𝐞𝐫)👑
𝐥𝐢𝐧𝐤: https://www.facebook.com/Thea.Starliness
🩸𝐔𝐬𝐫𝐞𝐫 𝐝𝐞 𝐡𝐞𝐥𝐩 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐞 𝐝𝐞 𝐦𝐞𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬🩸.
━━━━━━━━━━━━━━`;

    sendMessage(senderId, { text: helpMessage }, pageAccessToken);
  }
};
