// ---------- Referências dos elementos ----------
const searchCard = document.getElementById('search-card');
const resultCard = document.getElementById('result-card');
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const errorMessage = document.getElementById('error-message');
const temperatureEl = document.getElementById('temperature');
const cityNameEl = document.getElementById('city-name');
const backBtn = document.getElementById('back-btn');

// ---------- Envio do formulário ----------
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  hideError();

  try {
    const location = await buscarCoordenadas(city);
    const clima = await buscarClima(location.latitude, location.longitude);

    exibirResultado(clima.temperature, location.name, location.country);
  } catch (erro) {
    exibirErro(erro.message);
  }
});

// ---------- Botão de voltar (nova busca) ----------
backBtn.addEventListener('click', () => {
  resultCard.classList.add('hidden');
  searchCard.classList.remove('hidden');
  cityInput.value = '';
  cityInput.focus();
});

// ---------- Busca a latitude/longitude da cidade ----------
async function buscarCoordenadas(cidade) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt`;

  const response = await fetch(url);
  const dados = await response.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada. Tente novamente.');
  }

  const { latitude, longitude, name, country } = dados.results[0];
  return { latitude, longitude, name, country };
}

// ---------- Busca os dados climáticos ----------
async function buscarClima(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Não foi possível obter os dados do clima.');
  }

  const dados = await response.json();
  return dados.current_weather;
}

// ---------- Exibe o resultado na tela ----------
function exibirResultado(temperatura, cidade, pais) {
  temperatureEl.textContent = `${Math.round(temperatura)}°`;
  cityNameEl.textContent = `${cidade}, ${pais}`;

  searchCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
}

// ---------- Exibe mensagem de erro ----------
function exibirErro(mensagem) {
  errorMessage.textContent = mensagem;
  errorMessage.classList.remove('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}