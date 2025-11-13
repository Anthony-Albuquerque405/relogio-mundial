const cities = [
  { name: "Nova York", timezone: "America/New_York" },
  { name: "Londres", timezone: "Europe/London" },
  { name: "Tóquio", timezone: "Asia/Tokyo" },
  { name: "São Paulo", timezone: "America/Sao_Paulo" },
  { name: "Paris", timezone: "Europe/Paris" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Dubai", timezone: "Asia/Dubai" },
  { name: "Cidade do Cabo", timezone: "Africa/Johannesburg" },
  { name: "Moscou", timezone: "Europe/Moscow" },
  { name: "Los Angeles", timezone: "America/Los_Angeles" },
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "Berlim", timezone: "Europe/Berlin" },
  { name: "Pequim", timezone: "Asia/Shanghai" },
  { name: "Seul", timezone: "Asia/Seoul" },
  { name: "Bangkok", timezone: "Asia/Bangkok" },
  { name: "Cairo", timezone: "Africa/Cairo" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Cidade do México", timezone: "America/Mexico_City" },
  { name: "Chicago", timezone: "America/Chicago" },
  { name: "Auckland", timezone: "Pacific/Auckland" },
  { name: "Jerusalém", timezone: "Asia/Jerusalem" },
  { name: "Istambul", timezone: "Europe/Istanbul" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { name: "Vancouver", timezone: "America/Vancouver" },
];

let is24Hour = true; // formato padrão

document.getElementById("toggle-format").addEventListener("click", () => {
  is24Hour = !is24Hour;
});

function updateClocks() {
  const container = document.getElementById("clocks-container");
  container.innerHTML = "";

  cities.forEach((city) => {
    const time = new Date().toLocaleTimeString("pt-BR", {
      timeZone: city.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24Hour,
    });

    const clock = document.createElement("div");
    clock.className = "clock";
    clock.innerHTML = `<h3>${city.name}</h3><p>${time}</p>`;
    container.appendChild(clock);
  });
}

setInterval(updateClocks, 1000);

// Tema padrão
document.body.classList.add("light");

const toggleButton = document.getElementById("toggle-theme");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  // Muda o ícone do botão
  if (document.body.classList.contains("dark")) {
    toggleButton.textContent = "☀️ Alternar Tema"; // Ícone para modo claro
  } else {
    toggleButton.textContent = "🌙 Alternar Tema"; // Ícone para modo escuro
  }
});
