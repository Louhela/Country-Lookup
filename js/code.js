//Fills the country table, called when site is loaded
fillTable()

function settings() {
  let settingsInterface = document.getElementById("settingsInterface")
  if (settingsInterface.style.display == "block") {
    settingsInterface.style.display = "none"
  } else {
    settingsInterface.style.display = "block"
  }

}

function fillTable() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let allCountries = JSON.parse(this.responseText);
      let rowNumber2 = 1;
      //Loop for setting the text content to data cells
      for (i = 0; i < allCountries.length; i++) {
        let name = "name" + rowNumber2
        let population = "pop" + rowNumber2
        let currency = "cur" + rowNumber2
        document.getElementById(name).textContent = allCountries[i].name.common
        document.getElementById(population).textContent = allCountries[i].population.toLocaleString("fi-FI")
        /* Checks if the country being looped has currencies property, sets text content as the currency name. If country being looped doesn't have 
        currencies property text content is set to "Has No official currency" and color is set to red*/
        if (allCountries[i].hasOwnProperty('currencies')) {
          document.getElementById(currency).textContent = Object.values(allCountries[i].currencies)[0].name
        } else {
          document.getElementById(currency).textContent = "Has No official currency"
          document.getElementById(currency).style.color = "rgb(195 64 76)"
        }
        rowNumber2++
      }
      //When the table has been filled the table becomes visible
      document.getElementById("tableSection").style.display = "block"

      // document.getElementById("countriesTable").style.display = "table"
      document.getElementById("loading").style.display = "none"
    }
  };
  xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
  xhttp.send();
}


//Gets details about selected country
function details(id) {
  //Hides contry table and shows the loading spinner
  document.getElementById("tableSection").style.display = "none";
  document.getElementById("loading").style.display = "block"
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      //Regular expression removes all non digit characters from the ID of selected country
      let country = id.replace(/\D/g, '') - 1;
      let allCountries = JSON.parse(this.responseText);

      //Makes detail view visible and hides the loading spinner
      document.getElementById("loading").style.display = "none"
      document.getElementById("detailed").style.display = "block";
      document.getElementById("countrySearch").value = "";

      //Sets text content for detailed view
      document.getElementById("name").textContent = allCountries[country].name.common
      document.getElementById("officialName").textContent = allCountries[country].name.official
      document.getElementById("domain").textContent = allCountries[country].tld[0]
      document.getElementById("population").textContent = allCountries[country].population.toLocaleString("fi-FI")
      document.getElementById("capital").textContent = allCountries[country].capital[0]
      document.getElementById("continent").textContent = allCountries[country].continents[0]
      document.getElementById("language").textContent = Object.values(allCountries[country].languages).join(", ")
      document.getElementById("maps").href = allCountries[country].maps.googleMaps

      //Loops through selected countrys currecny list and sets them as text content
      for (i = 0; i < Object.values(allCountries[country].currencies).length; i++) {
        document.getElementById("currency").textContent += Object.values(allCountries[country].currencies)[i].name + "(" +
          Object.values(allCountries[country].currencies)[i].symbol + ") "
      }
      //If selected country has multiple timezones loops through them all and sets them as text content, if only one timezone sets it as text content
      if (allCountries[country].timezones.length > 1) {
        for (i = 0; i < allCountries[country].timezones.length; i++) {
          document.getElementById("timezone").textContent += allCountries[country].timezones[i] + " ??? "
        }
      } else {
        document.getElementById("timezone").textContent += allCountries[country].timezones[0]
      }
      weather(allCountries[country].capital[0])
    }
  };
  xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
  xhttp.send();
}


//Functionality for search bar
function search() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("countrySearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("countriesTable");
  tr = table.getElementsByTagName("tr");


  // Loop through all table rows, and hide those which don't match the search
  for (i = 0; i < tr.length; i++) {

    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//When details are closed, clears timezone and currency details.
function closeDetails() {
  search()
  document.getElementById("timezone").textContent = ""
  document.getElementById("currency").textContent = ""
  document.getElementById("tableSection").style.display = "block"
  document.getElementById("detailed").style.display = "none";
}

//Gets weather info of selected countrys capital unit preference is stored locally and can be changed in settings menu
function weather(city) {
  var xhttp = new XMLHttpRequest();
  let capital = city

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let weatherInformation = JSON.parse(this.responseText);

      document.getElementById("weather").textContent = weatherInformation.main.temp + symbol + weatherInformation.weather[0].description


    }
  };
  xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=" + unit + "&appid=650327377c1cb3ced39df3808d48076c", true);
  xhttp.send();
}