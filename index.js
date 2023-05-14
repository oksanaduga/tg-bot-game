const TelegramApi = require('node-telegram-bot-api');

const { gameOptions, againOptions } = require('./options.js')

const token = '6190469222:AAHd5ReQMlxQAoDKFAMCygDh-Fkwio-Mk5w';

const bot = new TelegramApi(token, { polling: true });

const chats = {};

bot.setMyCommands([
  { command: '/start', description: 'Welcome message'},
  { command: '/info', description: 'Get user information'},
  { command: '/game', description: 'Game guess a number'},
]);

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Now I will think of a number from 0 to 9, and you have to guess it')

  const randomNumber = Math.floor(Math.random() * 10);

  chats[chatId] = randomNumber.toString();

  await bot.sendMessage(chatId,  'So, guess', gameOptions);
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
  
    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
      return bot.sendMessage(chatId, 'Welcome buddy')
    }
  
    if (text === '/info') {
      return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }

    if (text === '/game') {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, 'Don`t understand you, try again ')
  
  })

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId);
    }

    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, `Congratulations, you guessed the number ${chats[chatId]}`, againOptions);
    } else {
      return await bot.sendMessage(chatId, `Unfortunately you did not guess, the bot guessed the number ${chats[chatId]}`, againOptions)
    }
  })
};

start();