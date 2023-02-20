const api_key = "5503b6ad66175ff3c379ff1375931668";
let lattitude;
let longitude;
const apiKeyCrypto =
  "accd86eb4c544d6d30de1128957fc2022fb7fdcebea075d2779ae57c4ee35a9d";
const apiNews = "a2921594287747eda978a8ef2da1092f";
const apiMovie = "119928adde41754a86b02e50f9dcdf22";
/*----------------------------------------------*/
const city_meteo = document.getElementById("city_weather");
const meteo_descript = document.getElementById("meteo_descript");
const image_meteo = document.getElementById("image_meteo");
const temp = document.getElementById("temp");
const temp_max = document.getElementById("temp_max");
const temp_min = document.getElementById("temp_min");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const date = document.getElementById("date");
/*--------------------------------------------------------------*/
const cours_crypto_BTC = document.getElementById("cours_crypto_BTC");
const cours_crypto_ETH = document.getElementById("cours_crypto_ETH");
const cours_crypto_CRO = document.getElementById("cours_crypto_CRO");
const cours_crypto_USDT = document.getElementById("cours_crypto_USDT");
const percent_BTC = document.getElementById("percent_BTC");
const percent_ETH = document.getElementById("percent_ETH");
const percent_CRO = document.getElementById("percent_CRO");
const percent_USDT = document.getElementById("percent_USDT");
/*--------------------------------------------------------------------*/
const container_two = document.getElementById("container_two");
/*--------------------------------------------------------------------*/
const title_movie = document.getElementById("title_movie");
const img_movie = document.getElementById("img_movie");
const description = document.getElementById("description");
const note = document.getElementById("note");
const bouton_movie = document.getElementById("bouton_movie");

function latt_long(city) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=5&appid=" +
      api_key
  )
    .then((response) => response.json())
    .then((data) => {
      lattitude = JSON.stringify(data[0].lat);
      longitude = JSON.stringify(data[0].lon);
      current_wheater();
      weather5days();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return lattitude, longitude;
}

function current_wheater() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lattitude +
      "&lon=" +
      longitude +
      "&appid=" +
      api_key +
      "&units=metric&lang=fr"
  )
    .then((response) => response.json())
    .then((data) => {
      date.innerText = dateDt(data.dt);
      city_meteo.innerText = data.name;
      meteo_descript.innerText = data.weather[0].description;
      image_meteo.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      temp.innerText = data.main.temp + " °C";
      temp_max.innerText = "High : " + data.main.temp_max + " °C";
      temp_min.innerText = "Low : " + data.main.temp_min + " °C";
      humidity.innerText = "Humidity : " + data.main.humidity + " %";
      wind.innerText = "Wind Speed : " + data.wind.speed + " m/s";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function dateDt(dt) {
  // Définir la variable "dt" (timestamp Unix)
  var dt = dt;

  // Convertir la variable "dt" en date et heure
  var date = new Date(dt * 1000);

  // Extraire les informations de date et d'heure locales formatées
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    /* hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",*/
  };

  var formattedDate = date.toLocaleString("fr-FR", options);

  // Afficher la date et l'heure locales formatées
  return formattedDate;
}

function weather5days() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lattitude +
      "&lon=" +
      longitude +
      "&appid=" +
      api_key +
      "&units=metric&lang=fr&cnt=24"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cryptoCours() {
  fetch(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,CRO,USDT&tsyms=USD,EUR&api_key=" +
      apiKeyCrypto
  )
    .then((response) => response.json())
    .then((data) => {
      cours_crypto_BTC.innerText = data.BTC.EUR + " EUR";
      cours_crypto_ETH.innerText = data.ETH.EUR + " EUR";
      cours_crypto_CRO.innerText = data.CRO.EUR + " EUR";
      cours_crypto_USDT.innerText = data.USDT.EUR + " EUR";
    })
    .catch((error) => {
      console.error("Une erreur est survenue :", error);
    });
}
function percentageUpDown(crypto, id) {
  fetch(
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
      crypto +
      "&tsym=USD&limit=2&api_key=" +
      apiKeyCrypto
  )
    .then((response) => response.json())
    .then((data) => {
      let percent =
        ((data.Data.Data[2].close - data.Data.Data[1].close) /
          data.Data.Data[1].close) *
        100;
      const percentFinal = percent.toFixed(2);
      id.innerText = percentFinal + " %";
    })
    .catch((error) => {
      console.error("Une erreur est survenue :", error);
    });
}

function news() {
  fetch(
    "https://newsapi.org/v2/top-headlines?sources=google-news-fr&apiKey=" +
      apiNews
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.articles);
      for (let i = 0; i < data.articles.length; i++) {
        const article = document.createElement("div");
        const content = document.createElement("p");
        const title = document.createElement("h2");
        const url = document.createElement("a");
        article.className = "container_article";
        title.className = "title";
        content.className = "content";
        title.innerText = data.articles[i].title;
        content.innerText = data.articles[i].description;
        url.href = data.articles[i].url;
        url.innerText = data.articles[i].source.name;
        article.addEventListener("click", () => {
          console.log("ok");
          window.open(data.articles[i].url);
          article.style.backgroundColor = "#AAB0B3";
        });
        article.appendChild(title);
        article.appendChild(content);
        article.appendChild(url);
        container_two.appendChild(article);
      }
    });
}

function movie() {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      apiMovie +
      "&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6.5"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const randomNumber = Math.floor(Math.random() * 21);
      title_movie.innerText = data.results[randomNumber].title;
      img_movie.src =
        "https://image.tmdb.org/t/p/w500" +
        data.results[randomNumber].poster_path;
      description.innerText = data.results[randomNumber].overview;
      note.innerText = data.results[randomNumber].vote_average;
      bouton_movie.addEventListener("click", () => {
        const randomNumber = Math.floor(Math.random() * 21);
        title_movie.innerText = data.results[randomNumber].title;
        img_movie.src =
          "https://image.tmdb.org/t/p/w500" +
          data.results[randomNumber].poster_path;
        description.innerText = data.results[randomNumber].overview;
        note.innerText = data.results[randomNumber].vote_average;
      });
    });
}

function magic() {
  fetch("https://api.magicthegathering.io/v1/cards")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

percentageUpDown("BTC", percent_BTC);
percentageUpDown("ETH", percent_ETH);
percentageUpDown("CRO", percent_CRO);
percentageUpDown("USDT", percent_USDT);
cryptoCours();
latt_long("chinon");
news();
movie();
magic();
