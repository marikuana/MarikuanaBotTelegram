const Weather = require("./weather");//af701a670830680176419dae464e4c84  |Lviv  702550
const Telegram = require("node-telegram-bot-api");

var weather = new Weather("af701a670830680176419dae464e4c84");

const token = "856425587:AAFGgwx141n-ohvOS4hZ8VuVdYj_e0MEk2A";
const bot = new Telegram(token, {polling: true});

//st();

async function st() {
    await weather.updateWeather("Lviv");
    await weather.updateWeather("Kiev");
    weather.checkUpdate("Lviv");
    setTimeout(()=>{weather.checkUpdate("Lviv")},1000);
}
//weather.updateWeather(702550);
// weather.updateWeather(702550);

var usersWeathers = {};

bot.onText(/\/weather/,async (msg) => {
    if (!usersWeathers[msg.from.id]){
        let cities = weather.getCityCountry("uk").map(c => [{text: c, callback_data: "weatherCity_"+c}]);
        bot.sendMessage(msg.chat.id, "Виберіть місто:", {reply_markup: {inline_keyboard: cities }});
        return;
    }
    let userCity = usersWeathers[msg.from.id].city;
    bot.sendMessage(msg.chat.id, `${await weather.getIcon(userCity)}  *Погода* *${await weather.getTemp(userCity)}*°C`, {parse_mode: "Markdown"});
    //bot.sendMessage(msg.chat.id, icon)
});

bot.onText(/\/test/, (msg, arr) => {

});


  bot.on("callback_query", msg => {
    const data = msg.data.split("_");
    if (data[0] == "weatherCity"){
        usersWeathers[msg.from.id] = {city: data[1]};
        bot.sendMessage(msg.message.chat.id, `Ви вибрали місто ${data[1]}`);
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











