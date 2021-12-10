let rowNumber = 1;
for (i = 0; i < 250; i++) {
  let name = "name" + rowNumber
  let population = "pop" + rowNumber
  let currency = "cur" + rowNumber
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

function countryInfo(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Access the result here
      // let country = id.slice(id.length-1) -1;

      let country = id.replace(/\D/g, '') - 1;


      let allCountries = JSON.parse(this.responseText);
      //console.log(allCountries[country].name.common)

      document.getElementById("detailed").style.display = "flex";
      document.getElementById("countriesTable").style.display = "none";
      document.getElementById("countrySearch").value = "";

      document.getElementById("name").textContent = allCountries[country].name.common
      document.getElementById("officialName").textContent = allCountries[country].name.official
      document.getElementById("domain").textContent = allCountries[country].tld[0]
      document.getElementById("population").textContent = allCountries[country].population.toLocaleString("fi-FI")





      document.getElementById("capital").textContent = allCountries[country].capital[0]
      document.getElementById("continent").textContent = allCountries[country].continents[0]
      document.getElementById("language").textContent = Object.values(allCountries[country].languages).join(", ")
      for (i = 0; i < Object.values(allCountries[country].currencies).length; i++) {
        document.getElementById("currency").textContent += Object.values(allCountries[country].currencies)[i].name + "(" +
          Object.values(allCountries[country].currencies)[i].symbol + ") "
      }

      if(allCountries[country].timezones.length > 1){

        for(i=0; i <allCountries[country].timezones.length; i++){
            document.getElementById("timezone").textContent += allCountries[country].timezones[i] + " ｜ "
          } }
          else{
            document.getElementById("timezone").textContent += allCountries[country].timezones[0]
          }

          document.getElementById("maps").href = allCountries[country].maps.googleMaps
      
      








    }
  };
  xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
  xhttp.send();
}


// function getCall(id) {
//   console.log(id)
//   let asd = id.charAt(-1)
//   console.log(asd)
// }

// let countryId = asd.charAt(-1)
//countryInfo()








// const userAction = async () => {
//     const response = await fetch('https://restcountries.com/v3.1/all');
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson


//     //document.getElementById("name").textContent = myJson[0].name.common





//         document.getElementById("name").textContent = myJson[0].name.common

//         //document.getElementById("name").textContent = id

//         document.getElementById("countriesTable").style.display ="none";








// document.getElementById("name").textContent = myJson[0].name.common

// let testi = Object.entries(myJson[0].currencies);
// console.log(testi[0][1].name)

// let countryNum = 1;
// let currencyName = Object.entries(myJson[0].currencies);

// for(i=0; i<250; i++){
//     if(i==18 || i==47 || i==38){
//         currencyName++
//         countryNum++
//     }else{
//         currencyName = Object.entries(myJson[i].currencies);
//         document.getElementById("cur"+countryNum).textContent = currencyName[0][1].name
//             countryNum++

//     }



// }


// document.getElementById("name"+2).textContent = myJson[159].name.common
// document.getElementById("pop"+2).textContent = myJson[159].population
// document.getElementById("cur"+2).textContent = myJson[159].currencies.EUR.name

// let asd = 1;
//     for(i=0; i<250; i++){
//         let testi = Object.keys(myJson[i].currencies);

//console.log(testi[i].hasOwnProperty('KES')) 

// document.getElementById("name"+i).textContent = myJson[i].name.common
// document.getElementById("pop"+i).textContent = myJson[i].population
// document.getElementById("cur"+i).textContent = myJson[i].currencies.EUR.name

//     if(!testi[i].hasOwnProperty('')){
//         document.getElementById("cur"+asd).textContent = testi[0]

//     }else{
//         document.getElementById("cur"+asd).textContent = "voivoi"
//     }

//     asd++
//     console.log(testi[0])


// }

// for (let i in myJson) {
//     if (myJson[i].currencies.length == 0) {
//         console.log(myJson[96].currencies.name) 
//     }

//  }


// myJson[120].hasOwnProperty('EUR')

//console.log(testi[0])


// let asd = 0;
// let e = 2;
// for(i=1; i<251; i++){


//     document.getElementById("name"+i).textContent = myJson[asd].name.common + myJson[asd].flags.png
//     document.getElementById("pop"+i).textContent = myJson[asd].population.toLocaleString("fi-FI")

//     if(myJson[i].currencies !== undefined){
//         document.getElementById("cur"+i).textContent = myJson[i].currencies.name
//     }else{
//         document.getElementById("cur"+i).textContent = "Has no currency!"
//     }

//     console.log(myJson[120].hasOwnProperty('EUR'))

//     asd++
//     e++


// }









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

function closeDetails() {
  search()
  document.getElementById("timezone").textContent = ""

  document.getElementById("currency").textContent = ""
  document.getElementById("countriesTable").style.display = "flex";
  document.getElementById("detailed").style.display = "none";
}