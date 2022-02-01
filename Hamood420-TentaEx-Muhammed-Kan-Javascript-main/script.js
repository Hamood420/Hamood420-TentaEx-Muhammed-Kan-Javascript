//Skriv all kod här
const btn = document.querySelector('button');
//loggar button knappen
console.log(btn);

btn.addEventListener('click', function(fetchCallback){
    //anropar html elementet error-message
    let errorMessage = document.getElementById('error-message')
    errorMessage.innerText = ``;
    const input = document.querySelector('input');
    //loggar vad användaren har sökt
    console.log(input.value);

    const url = `https://api.weatherbit.io/v2.0/current/daily?lang=sv&city=${input.value}%C3%B6&key=9cbd170022684f33b78e965d99097f4e`

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300)  {
                return response.json();
            }
            else{
                throw 'Please try again';
            }
        }
    ).then(
        function (data) {
            //anropar current-description html elementet och ger den ett värde
            let weatherDescription = document.getElementById('current-description');
            weatherDescription.innerText = data.data[0].weather.description;

            //anropar current-current html elementet och ger den ett värde
            let temperature = document.getElementById('current-temp');
            //loggar temperaturen i konsol-loggen
            console.log(temperature);
            temperature.innerText = data.data[0].temp;
            console.log(data.data[0].temp);

            //anropar current-wind html elementet och ger den ett värde
            let windSpeed = document.getElementById('current-wind');
            //loggar winden
            console.log(windSpeed);
            windSpeed.innerText = Math.round(data.data[0].wind_spd);
            console.log(data.data[0].wind_spd);

            //anropar current-humidity html elementet och ger den ett värde
            let humidity = document.getElementById('current-humidity');
            //loggar luftfuktigheten
            console.log(humidity);
            humidity.innerText = Math.round(data.data[0].rh);
            console.log(data.data[0].rh);

            // let currentIconImg = document.getElementById('current-weather-icon');
            let currentIconImg = document.querySelector('#current-weather-icon');   
            console.log(currentIconImg);
            console.log(data.data[0].weather.icon);
            currentIconImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;    
        }
    ).catch(
        function (e) {
            //vad användaren skriver i sökfältet kommer dyckas på websidan med ett felmeddelande
            errorMessage.innerText = `${input.value} The search was invalid, please try again!`
        }
    )
})

function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function showImgcallback(data){
    const img = document.createElement('img');
    img.src = data.message;
    document.body.append(img);
}