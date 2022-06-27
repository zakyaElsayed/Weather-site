let searchCountry = document.getElementById("searchCountry");
let searchbtn = document.getElementById("searchbtn");
searchCountry.addEventListener("keyup", search)
searchbtn.addEventListener("click", search);
let codes = []
let weekDays = [`sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
let mounth = [`jan`, `feb`, `march`, `april`, `may`, `jun`, `july`, `aug`, `sep`, `oct`, `nov`, `dec`]
let d = new Date();
let day = d.getDate();
console.log(weekDays[d.getDay()] + day + " " + mounth[d.getMonth()]);


async function getCodes() {
    let respons = await fetch(`https://www.weatherapi.com/docs/weather_conditions.json`)
    codes = await respons.json();



}
getCodes()


async function setWeather(url) {
    let respons = await fetch(url)
    const data = await respons.json();
    console.log(data)
    let nextDayDate = data.forecast.forecastday[1].date
    let nextForcastDate = data.forecast.forecastday[2].date
    document.querySelector("#day").innerHTML = weekDays[d.getDay()];
    document.querySelector("#dayDate").innerHTML = day + " " + mounth[d.getMonth()]
    document.querySelector("#day1day").innerHTML = weekDays[d.getDay() + 1];
    document.querySelector("#day1Month").innerHTML = nextDayDate.split("-")[2] + " " + mounth[d.getMonth()]
    document.querySelector("#day2day").innerHTML = weekDays[d.getDay() + 2];
    document.querySelector("#day2Month").innerHTML = nextForcastDate.split("-")[2] + " " + mounth[d.getMonth()]


    console.log(nextDayDate.split("-"))
    console.log(weekDays[d.getDay() + 1] + " " + nextDayDate.split("-")[2] + "" + mounth[d.getMonth()])
    console.log(weekDays[d.getDay() + 2] + " " + nextForcastDate.split("-")[2] + " " + mounth[d.getMonth()])

    for (let i = 0; i < codes.length; i++) {
        const element = codes[i];
        if (element.code == data.current.condition.code) {
            document.getElementById("country").innerHTML = data.location.name;
            document.getElementById("tempretur").innerHTML = data.current.temp_c + "&#8451";
            if (data.current.is_day == 1) {
                document.getElementById("tempIcon").src = `./weather/64x64/day/${element.icon}.png`;
                console.log(data.current.is_day + `./weather/64x64/day/${element.icon}.png`);
            }
            else {
                document.getElementById("tempIcon").src = `./weather/64x64/night/${element.icon}.png`;
                console.log(data.current.is_day + `./weather/64x64/day/${element.icon}.png`);


            }
            document.getElementById("dayForcast").innerHTML = data.current.condition.text;
            document.getElementById("cloudy").innerHTML = data.current.humidity + "%";
            document.getElementById("windStatus").innerHTML = data.current.wind_kph + "Km/h";
            document.getElementById("windDirectionStatus").innerHTML = data.current.wind_dir;
        }
        if (element.code == data.forecast.forecastday[1].day.condition.code) {
            console.log(`./weather/64x64/night/${element.icon}.png`)
            document.querySelector(`#day1  #tempretur`).innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "&#8451";
            document.querySelector(`#day1 #tempIcon`).src = `./weather/64x64/day/${element.icon}.png`;
            document.querySelector(`#day1 #dayForcast`).innerHTML = element.day;


        }
        if (element.code == data.forecast.forecastday[2].day.condition.code) {
            document.querySelector(`#day2 #tempretur`).innerHTML = data.forecast.forecastday[2].day.avgtemp_c + "&#8451";
            document.querySelector(`#day2 #tempIcon`).src = `./weather/64x64/day/${element.icon}.png`;
            document.querySelector(`#day2 #dayForcast`).innerHTML = element.day;


        }


        //console.log(` http://api.weatherapi.com/v1/search.json?key=f8323a6337d943b58d4114322220506&q=${searchCountry.value}&days=3`)
        // setForcastDays(1,element,data);
        // setForcastDays(2,element,data)




    }




}
setWeather(`http://api.weatherapi.com/v1/forecast.json?key=f8323a6337d943b58d4114322220506&q=egypt&days=3`);

async function search() {
    setWeather(`http://api.weatherapi.com/v1/forecast.json?key=f8323a6337d943b58d4114322220506&q=${searchCountry.value}&days=3`);

}
//-----------subscribe--------------------------
let userMail = document.querySelector(".subscribeForm input");
console.log(userMail.value)

//userMail.addEventListener(validateUserMail)
document.querySelector(".subscribeBtn").addEventListener("click", validateUserMail)
function validateUserMail() {
    let reg = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]{3}+)*$/
    if (reg.test(userMail.value)) {
        document.querySelector("#validationMessage").classList.add("text-info")
        document.querySelector("#validationMessage").innerHTML = "thank you "
    }
    else {
        document.querySelector("#validationMessage").classList.add("text-danger")
        document.querySelector("#validationMessage").innerHTML = " <br><br>plz enter valid email 'ex@gmail.com'"

    }
}