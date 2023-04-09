const { Telegraf } = require('telegraf')
const bot = new Telegraf('6199223755:AAG8UQF9vPC48nKQZrL-B9P71ljHu1n1Jz8') 
bot.start((ctx) => ctx.reply('This is a malware store where you can buy all kinds of Malware.\ndeveloped:  Maxim ')) 
bot.command('admins', ctx => ctx.reply("Developers: @Maxim680"))
bot.command('types', ctx => ctx.reply("Now you can see types programms", {
    reply_markup: {
        keyboard: [['Promotional programs',  'Spyware'], ['Ransomware', 'Trojan programs'], ['Worms', 'Bots and botnets'], ['Logic Bombs']]
    }
}))

bot.help((ctx) => ctx.reply('If you have any questions, please contact @Maxim680')) 
bot.hears('hi', (ctx) => ctx.reply('Hey there')) 
bot.launch() 