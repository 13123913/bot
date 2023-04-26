import {Telegraf} from 'telegraf';
const bot = new Telegraf('TOKEN');
 
    bot.command('admins', ctx => ctx.reply("Developers: @Maxim680"));

    const sales = [
        "low level",
        "medium level",
        "high level",
    ];

    const items = [
        {
            id: 1,
            title: "Spyware",
            price: 599,
        },
        {
            id: 2,
            title: "Trojan programs",
            price: 299
        }
    ]

    bot.start((ctx) => ctx.reply("Hello, I'm bot", {
        reply_markup: {
            inline_keyboard: [
            [   
                {
                    text: 'Spyware',
                    callback_data: 'sales'
                },
                {
                    text: 'Trojan programs',
                    callback_data: 'make_order'
                },
            ]
        ]
    }
}));
bot.action("sales", (ctx) => {
    ctx.reply(sales.join('\n'));
});

bot.action("make_order", (ctx) => {
    ctx.reply("List products", {
        reply_markup: {
            inline_keybord: [
                ...items.map(item => [{
                    text: `${item.title} - ${item.price}$`,
                    callback_data: `order_item_${item.id}`
                }])
            ]
        }
    })
})

bot.action(/order_item_(.*)/, (ctx) => {

    const id = Number((ctx.callbackQuery.data).replace('order_item_', ''));

    console.log(ctx.callbackQuery.data);
    console.log('id:', id);

    ctx.reply(`You have selected a product: ${items.find(item => item.id === id)?.title ?? "not found"} `, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "amount(low level): 1",
                        callback_data: `order_count_${id}_1`
                    }
                ],
                [
                    {
                        text: "amount(medium level): 2",
                        callback_data: `order_count_${id}_2`
                    }
                ],
                [
                    {
                        text: "amount(high level): 3",
                        callback_data: `order_count_${id}_3`
                    }
                ]
            ]
        }
    });
});

const order = {};

bot.action(/order_count(.*)/, (ctx) => {

    const [id, count] = (ctx.callbackQuery.data)
        .replace('order_count', '')
        .split('_')
        .map(Number);

        const userId = ctx.from?.id ?? 0;

        (order[userId] = order[userId] || []).push({
            id,
            count,
        });


        ctx.reply("Product added!", {
            reply_markup: {
                inline_keyboard: [
                    [
                    {
                        text: "sales",
                        callback_data: "sales",
                    },
                    {
                        text: "make a purchase",
                        callback_data: "make_order",
                    },
                    {
                        text: "basket",
                        callback_data: "items",
                    }
                ]
            ]
        }
    });
});

bot.action('items', (ctx) => {
    const userId = ctx.from?.id ?? 0;


    ctx.reply(order[userId].map(item => {
        const found = items[item.id];
        const title = found.title;
        const count = item.count;

        return `${title} (${found.price * count}$) - in amount ${count}`
    }).join('\n'))
});
bot.command('add', (ctx) => {
   const [name, price] = ctx.message.text
       .replace('/add ', '')
       .split(' ');

   const castedPrice = Number(price) ?? 0;

   items.push({
       name,
       price: castedPrice,
   });

   ctx.reply(`Item added: ${name}`);
});

bot.command('list', (ctx) => {
    items.forEach((item, index) => {
        ctx.reply(`Item #${index + 1}: ${item.name} - ${item.price}`);
    });
});


bot.help((ctx) => ctx.reply('If you have any questions, please contact @Maxim680')) 
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('goodbye', (ctx) => ctx.reply('bye bye'))
bot.hears('How\'s life?', (ctx) => ctx.reply('I\'m fine'))
/*bot.hears('Promotional programs', (ctx) => ctx.reply('price: 1500$\nLink to seller: @lxbrize'))
bot.hears('Spyware', (ctx) => ctx.reply('price: 2000$\nLink to seller: @em0em0em04ka'))
bot.hears('Ransomware', (ctx) => ctx.reply('price: 100$\nLink to seller: @infeibal'))
bot.hears('Trojan programs', (ctx) => ctx.reply('price: 15000$\nLink to seller: @psnowik'))
bot.hears('Worms', (ctx) => ctx.reply('price: 150$\nLink to seller: @FantomDOOOM'))
bot.hears('Bots and botnets', (ctx) => ctx.reply('price: 55$\nLink to seller: @Hetrep'))
bot.hears('Logic Bombs', (ctx) => ctx.reply('price: 1861$\nLink to seller: @sanek_harisov'))
*/
bot.launch() 
