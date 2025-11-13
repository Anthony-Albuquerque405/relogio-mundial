const translations = {
  "pt-BR": {
    title: "Relógios Mundiais",
    themeLight: "☀️ Tema Claro",
    themeDark: "🌙 Tema Escuro",
    formatToggle: "🕒 Alternar Formato",
    cities: {
      "New York": "Nova York",
      London: "Londres",
      Tokyo: "Tóquio",
      "São Paulo": "São Paulo",
      Paris: "Paris",
      Sydney: "Sydney",
      Dubai: "Dubai",
      "Cape Town": "Cidade do Cabo",
      Moscow: "Moscou",
      "Los Angeles": "Los Angeles",
      Toronto: "Toronto",
      Berlin: "Berlim",
      Beijing: "Pequim",
      Seoul: "Seul",
      Bangkok: "Bangkok",
      Cairo: "Cairo",
      "Buenos Aires": "Buenos Aires",
      "Mexico City": "Cidade do México",
      Chicago: "Chicago",
      Auckland: "Auckland",
      Jerusalem: "Jerusalém",
      Istanbul: "Istambul",
      "Hong Kong": "Hong Kong",
      Vancouver: "Vancouver",
    },
  },
  "en-US": {
    title: "World Clocks",
    themeLight: "☀️ Light Theme",
    themeDark: "🌙 Dark Theme",
    formatToggle: "🕒 Toggle Format",
    cities: {
      "New York": "New York",
      London: "London",
      Tokyo: "Tokyo",
      "São Paulo": "São Paulo",
      Paris: "Paris",
      Sydney: "Sydney",
      Dubai: "Dubai",
      "Cape Town": "Cape Town",
      Moscow: "Moscow",
      "Los Angeles": "Los Angeles",
      Toronto: "Toronto",
      Berlin: "Berlin",
      Beijing: "Beijing",
      Seoul: "Seoul",
      Bangkok: "Bangkok",
      Cairo: "Cairo",
      "Buenos Aires": "Buenos Aires",
      "Mexico City": "Mexico City",
      Chicago: "Chicago",
      Auckland: "Auckland",
      Jerusalem: "Jerusalem",
      Istanbul: "Istanbul",
      "Hong Kong": "Hong Kong",
      Vancouver: "Vancouver",
    },
  },
  "es-ES": {
    title: "Relojes Mundiales",
    themeLight: "☀️ Tema Claro",
    themeDark: "🌙 Tema Oscuro",
    formatToggle: "🕒 Cambiar Formato",
    cities: {
      "New York": "Nueva York",
      London: "Londres",
      Tokyo: "Tokio",
      "São Paulo": "São Paulo",
      Paris: "París",
      Sydney: "Sídney",
      Dubai: "Dubái",
      "Cape Town": "Ciudad del Cabo",
      Moscow: "Moscú",
      "Los Angeles": "Los Ángeles",
      Toronto: "Toronto",
      Berlin: "Berlín",
      Beijing: "Pekín",
      Seoul: "Seúl",
      Bangkok: "Bangkok",
      Cairo: "El Cairo",
      "Buenos Aires": "Buenos Aires",
      "Mexico City": "Ciudad de México",
      Chicago: "Chicago",
      Auckland: "Auckland",
      Jerusalem: "Jerusalén",
      Istanbul: "Estambul",
      "Hong Kong": "Hong Kong",
      Vancouver: "Vancouver",
    },
  },
};

const cities = [
  { key: "New York", timezone: "America/New_York" },
  { key: "London", timezone: "Europe/London" },
  { key: "Tokyo", timezone: "Asia/Tokyo" },
  { key: "São Paulo", timezone: "America/Sao_Paulo" },
  { key: "Paris", timezone: "Europe/Paris" },
  { key: "Sydney", timezone: "Australia/Sydney" },
  { key: "Dubai", timezone: "Asia/Dubai" },
  { key: "Cape Town", timezone: "Africa/Johannesburg" },
  { key: "Moscow", timezone: "Europe/Moscow" },
  { key: "Los Angeles", timezone: "America/Los_Angeles" },
  { key: "Toronto", timezone: "America/Toronto" },
  { key: "Berlin", timezone: "Europe/Berlin" },
  { key: "Beijing", timezone: "Asia/Shanghai" },
  { key: "Seoul", timezone: "Asia/Seoul" },
  { key: "Bangkok", timezone: "Asia/Bangkok" },
  { key: "Cairo", timezone: "Africa/Cairo" },
  { key: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { key: "Mexico City", timezone: "America/Mexico_City" },
  { key: "Chicago", timezone: "America/Chicago" },
  { key: "Auckland", timezone: "Pacific/Auckland" },
  { key: "Jerusalem", timezone: "Asia/Jerusalem" },
  { key: "Istanbul", timezone: "Europe/Istanbul" },
  { key: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { key: "Vancouver", timezone: "America/Vancouver" },
];

// Restore settings
const savedTheme = localStorage.getItem("theme");
const savedFormat = localStorage.getItem("is24Hour");
const savedLanguage = localStorage.getItem("language");

let is24Hour = savedFormat === null ? true : savedFormat === "true";
let currentLanguage = savedLanguage || "pt-BR";

document.body.classList.add(savedTheme || "light");
document.getElementById("language-selector").value = currentLanguage;

function updateTexts() {
  const t = translations[currentLanguage];
  document.title = t.title;
  document.getElementById("toggle-theme").textContent =
    document.body.classList.contains("dark") ? t.themeLight : t.themeDark;
  document.getElementById("toggle-format").textContent = t.formatToggle;
}

function updateClocks() {
  const container = document.getElementById("clocks-container");
  container.innerHTML = "";

  const t = translations[currentLanguage];

  cities.forEach((city) => {
    const time = new Date().toLocaleTimeString(currentLanguage, {
      timeZone: city.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24Hour,
    });

    const clock = document.createElement("div");
    clock.className = "clock";
    clock.innerHTML = `<h3>${t.cities[city.key]}</h3><p>${time}</p>`;
    container.appendChild(clock);
  });
}

document.getElementById("toggle-format").addEventListener("click", () => {
  is24Hour = !is24Hour;
  localStorage.setItem("is24Hour", is24Hour);
});

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const currentTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", currentTheme);
  updateTexts();
});

document.getElementById("language-selector").addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  localStorage.setItem("language", currentLanguage);
  updateTexts();
});

updateTexts();
setInterval(updateClocks, 1000);
