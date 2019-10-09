const Weather = require("./weather");//af701a670830680176419dae464e4c84  |Lviv  702550
const Telegram = require("node-telegram-bot-api");

var weather = new Weather(process.env.WeatherToken);

const token = process.env.BotToken;
const bot = new Telegram(token, {polling: true});


var usersWeathers = {};

bot.onText(/\/weather/, async (msg) => {
    if (!usersWeathers[msg.from.id]) {
        bot.sendMessage(msg.chat.id, "Мені потрібні ваші координати.\nНажміть на кнопку ⬇", {reply_markup: {keyboard: [[{text: "Координати", request_location: true}]], one_time_keyboard: true, resize_keyboard: true}});
        return;
    }
    let weatherCoor = await weather.getWeatherwithCoor(usersWeathers[msg.from.id].latitude, usersWeathers[msg.from.id].longitude);
    bot.sendMessage(msg.chat.id, `${weather.getIconCoor(weatherCoor.weather[0].icon)}  *Погода* *${weatherCoor.main.temp}*°C`, { parse_mode: "Markdown" });
});

bot.onText(/\/test/, (msg, arr) => {

});


bot.on("message",async msg => {
    const chatid = msg.chat.id;
    
    if (msg.location){
        usersWeathers[msg.from.id] = { latitude: msg.location.latitude, longitude: msg.location.longitude };
        let weatherCoor = await weather.getWeatherwithCoor(usersWeathers[msg.from.id].latitude, usersWeathers[msg.from.id].longitude);
        bot.sendMessage(msg.chat.id, `${weather.getIconCoor(weatherCoor.weather[0].icon)}  *Погода* *${weatherCoor.main.temp}*°C`, { parse_mode: "Markdown" });
        return;
    }
    
    if (msg.text.endsWith("?")) {
        if (msg.text.length < 6) return;
        let question = ["Дуже сумнівно", "Надіюсь, ні", "Надіюсь, так", "Так", "Ні",
            "Неможливо передбачити зараз", "Без сумніву", "Можливо", "Ніколи", "Безумовно",
            "Мої джерела кажуть - ні", "Через мій труп!", "Може бути", 
            "Не розраховуйте на це", "Це точно", "Зуб даю", "Всьо быть может но быть может только то не может быть щто быть может быть неможить остальное может быть"];
        let rand = Math.floor(Math.random() * question.length);
        bot.sendMessage(chatid, question[rand]);
    }
});

bot.on("channel_post", async msg => {
    const chatid = msg.chat.id;
if (msg.text.endsWith("?")) {
        if (msg.text.length < 6) return;
        let question = ["Дуже сумнівно", "Надіюсь, ні", "Надіюсь, так", "Так", "Ні",
            "Неможливо передбачити зараз", "Без сумніву", "Можливо", "Ніколи", "Безумовно",
            "Мої джерела кажуть - ні", "Через мій труп!", "Може бути", 
            "Не розраховуйте на це", "Це точно", "Зуб даю", "Всьо быть может но быть может только то не может быть щто быть может быть неможить остальное может быть"];
        let rand = Math.floor(Math.random() * question.length);
        bot.sendMessage(chatid, question[rand]);
    }

});

  bot.on("callback_query",async msg => {
    const data = msg.data.split("_");
    if (data[0] == "weatherCity"){
        usersWeathers[msg.from.id] = {city: data[1]};
       bot.editMessageText(`${await weather.getIcon(data[1])}  *Погода* *${await weather.getTemp(data[1])}*°C`,
        {chat_id: msg.message.chat.id, message_id: msg.message.message_id, parse_mode: "Markdown"})
    
    }
  });
/*

//bot.sendMessage(504544053, );

bot.onText(/\/start/, (msg  ) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id, `Hello, ${msg.from.username}`, {reply_markup: {keyboard: [] }});
});




bot.on("message", message =>{

    const chatid = message.chat.id;
    if (message.text == "qq"){
        //bot.sendMessage(chatid, "qq", {reply_markup: {inline_keyboard:  }});
        
    }
    console.log();
});

bot.on("error", err => {
    console.log(err);
});
//*/











