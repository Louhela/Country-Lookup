//Add event listeners
let rowNumber = 1;
for (i = 0; i < 250; i++) {
  let name = "name" + rowNumber
  let population = "pop" + rowNumber
  let currency = "cur" + rowNumber
  //Adds click event listener to data cells that returns the ID of clicked element as parameter
  document.getElementById(name).addEventListener("click", function () {
    countryInfo(this.id)
  })
  document.getElementById(population).addEventListener("click", function () {
    countryInfo(this.id)
  })
  document.getElementById(currency).addEventListener("click", function () {
    countryInfo(this.id)
  })
  rowNumber++
}


//Fills the country table, called when site is loaded
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
      document.getElementById("countriesTable").style.display = "flex"
      document.getElementById("loading").style.display = "none"
    }
  };
  xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
  xhttp.send();
}


//Gets details about selected country
function countryInfo(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      //Regular expression removes all non digit characters from the ID of selected country
      let country = id.replace(/\D/g, '') - 1;
      let allCountries = JSON.parse(this.responseText);

      //Makes detail view visible and hides the country table
      document.getElementById("detailed").style.display = "flex";
      document.getElementById("countriesTable").style.display = "none";
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
          document.getElementById("timezone").textContent += allCountries[country].timezones[i] + " ｜ "
        }
      } else {
        document.getElementById("timezone").textContent += allCountries[country].timezones[0]
      }
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

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {

    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
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
  document.getElementById("countriesTable").style.display = "flex";
  document.getElementById("detailed").style.display = "none";
}