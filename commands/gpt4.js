const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4o',
  usage: 'gpt4 [your message]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: gpt4 <question>" }, pageAccessToken);

    try {
      const { data: { response } } = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(prompt)}&uid=${senderId}&webSearch=off`);
      const parts = [];

      for (let i = 0; i < response.length; i += 1800) {
        parts.push(response.substring(i, i + 1800));
                                               }
      // send all msg parts
      for (const part of parts) {
        await sendMessage(senderId, { text: part }, pageAccessToken);
      }
    } catch {
      sendMessage(senderId, { text: '🚨 Oups une erreur s\'est produite. Veuillez utiliser d\'autre moyen pour poser vos questions\n\n Exenmple \ngpt3 <question>\n ronald <question>\n ai <question>\n bert <question>' }, pageAccessToken);
    }
  }
};
