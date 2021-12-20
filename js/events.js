//Add event listeners
let rowNumber = 1;
for (i = 0; i < 250; i++) {
  let name = "name" + rowNumber
  let population = "pop" + rowNumber
  let currency = "cur" + rowNumber
  //Adds click event listener to data cells that returns the ID of clicked element as parameter
  document.getElementById(name).addEventListener("click", function () {
    details(this.id)
  })
  document.getElementById(population).addEventListener("click", function () {
    details(this.id)
  })
  document.getElementById(currency).addEventListener("click", function () {
    details(this.id)
  })
  rowNumber++
}
document.getElementById('settingsButton').addEventListener("click", function () {
    settings()})

document.getElementById('countrySearch').addEventListener("keyup", function () {
    search();closeDetails()})

document.getElementById('closeDetails').addEventListener("click", function () {
    closeDetails()})