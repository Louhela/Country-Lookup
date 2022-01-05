//Dark mode setting is stored in local storage and can be changed in settings menu
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.textContent = "Light"

const enableDarkMode = () => {
  document.body.classList.add('darkMode');
  localStorage.setItem('darkMode', 'enabled');
  darkModeToggle.textContent = "Dark";

};

const disableDarkMode = () => {
  document.body.classList.remove('darkMode');
  localStorage.setItem('darkMode', null);
  darkModeToggle.textContent = "Light";
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

//Users preferred unit is stored in local storage, preferred unit can be changed in settings menu
let userPreferredUnit = localStorage.getItem('userPreferredUnit');
const unitToggle = document.getElementById('unitSwitch');


const unitMetric = () => {
  localStorage.setItem('userPreferredUnit', 'metric');
  unitToggle.textContent = "Imperial"
  unit = "metric"
  symbol = "°C "
};

const unitImperial = () => {
  localStorage.setItem('userPreferredUnit', 'imperial');
       unitToggle.textContent = "Metric"
        unit = "imperial"
        symbol = "°F "
};

if (userPreferredUnit === 'metric' || userPreferredUnit == null) {
  unitMetric();
} else {
  unitImperial();
}

unitToggle.addEventListener("click", () => {
  unit = localStorage.getItem('userPreferredUnit');
  if (unit !== 'metric') {
    unitMetric();
  } else {
    unitImperial();
  }
});
