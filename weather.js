require('isomorphic-fetch');

class Weather {
    constructor(AppId){
        this.AppId = AppId;
        this.weathers = {};
        this.Url = "http://api.openweathermap.org/data/2.5/weather?";
    };

    async getTemp(city){
        await this.checkUpdate(city);
        return this.weathers[city].weather.main.temp;
    }

    async getIcon(city){
        await this.checkUpdate(city);
        return icons["i"+this.weathers[city].weather.weather[0].icon];
    }
   
    getIconCoor(icon){
        return icons["i"+icon];
    }

    async updateWeather(city){//702550
        city = this.cityToCityId(city);
        let res = await fetch(`${this.Url}id=${city}&appid=${this.AppId}&units=metric`);
        res = await res.json();
        let name = res.name;
        this.weathers[name] = {weather: res, time: new Date().getTime()};
        return res;
    }

    async getWeatherwithCoor(lat, lon){
        let res = await fetch(`${this.Url}lat=${parseInt(lat)}&lon=${parseInt(lon)}&appid=${this.AppId}&units=metric`);
        res = await res.json();
        return res;
    }

    async checkUpdate(city){
        if (this.weathers[city] == undefined){
            await this.updateWeather(city);        
            console.log("Update undefined");
            return;
        }
        if ((new Date().getTime() - this.weathers[city].time) > 300*1000){
            await this.updateWeather(city);        
            console.log("Update time")
        }
    }

    getAll(){    
        return this.weathers;
    }

    cityToCityId(city){
        return cityList.filter(c => c.name == city)[0].id;
    }

    getCityCountry(country){
        return cityList.filter(c => c.country == country).map(c => c.name);
    }
};

module.exports = Weather;

const icons = { 
    i01d: "☀", i02d: "⛅", i03d: "☁", i04d: "☁", i09d: "🌧", i10d: "🌦", i11d: "🌩", i13d: "❄", i50d: "🌫",
    i01n: "🌙", i02n: "☁", i03n: "☁", i04n: "☁", i09n: "🌧", i10n: "🌧", i11n: "🌩", i13n: "❄", i50n: "🌫"}

const cityList = [
