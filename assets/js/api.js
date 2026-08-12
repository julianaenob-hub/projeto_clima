// ---------- Referências dos elementos ----------
const searchCard = document.getElementById('search-card');
const resultCard = document.getElementById('result-card');
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const errorMessage = document.getElementById('error-message');
const temperatureEl = document.getElementById('temperature');
const cityNameEl = document.getElementById('city-name');
const backBtn = document.getElementById('back-btn');
const weatherDescriptionEl = document.getElementById('weather-description');
const weatherIconEl = document.getElementById('weather-icon');
const dateTimeEl = document.getElementById('date-time');

// ---------- Envio do formulário ----------
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    exibirErro('Digite o nome de uma cidade.');
    return;
  }

  hideError();

  try {
    // Busca latitude e longitude da cidade
    const location = await buscarCoordenadas(city);

    // Busca informações do clima
    const clima = await buscarClima(
      location.latitude,
      location.longitude
    );

    // Exibe os resultados
    exibirResultado(
      clima,
      location.name,
      location.country
    );
  } catch (erro) {
    exibirErro(erro.message);
  }
});

// ---------- Botão de voltar ----------
backBtn.addEventListener('click', () => {
  resultCard.classList.add('hidden');
  searchCard.classList.remove('hidden');

  cityInput.value = '';
  cityInput.focus();

  hideError();
});

/**
 * Busca as coordenadas geográficas de uma cidade utilizando
 * a API de geocodificação do Open-Meteo.
 *
 * @async
 * @param {string} cidade - Nome da cidade que será pesquisada.
 * @returns {Promise<Object>} Objeto contendo latitude, longitude, nome e país.
 * @throws {Error} Quando ocorre falha na API, cidade não encontrada
 * ou erro de conexão.
 *
 * @example
 * const local = await buscarCoordenadas('São Paulo');
 * console.log(local.latitude);
 */
async function buscarCoordenadas(cidade) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Falha ao consultar a API de localização.');
    }

    const dados = await response.json();

    if (!dados.results || dados.results.length === 0) {
      throw new Error(
        'Cidade não encontrada. Verifique o nome e tente novamente.'
      );
    }

    const {
      latitude,
      longitude,
      name,
      country
    } = dados.results[0];

    return {
      latitude,
      longitude,
      name,
      country
    };
  } catch (erro) {
    if (erro instanceof TypeError) {
      throw new Error(
        'Erro de conexão. Verifique sua internet e tente novamente.'
      );
    }

    throw erro;
  }
}

/**
 * Busca os dados climáticos atuais de uma localização.
 *
 * @async
 * @param {number} latitude - Latitude da localização.
 * @param {number} longitude - Longitude da localização.
 * @returns {Promise<Object>} Dados climáticos atuais da localização.
 * @throws {Error} Quando ocorre falha na API, os dados não estão disponíveis
 * ou ocorre erro de conexão.
 *
 * @example
 * const clima = await buscarClima(-23.55, -46.63);
 * console.log(clima.temperature_2m);
 */
async function buscarClima(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados do clima.');
    }

    const dados = await response.json();

    if (!dados.current) {
      throw new Error(
        'Os dados do clima não estão disponíveis no momento.'
      );
    }

    return dados.current;
  } catch (erro) {
    if (erro instanceof TypeError) {
      throw new Error(
        'Erro de conexão. Verifique sua internet e tente novamente.'
      );
    }

    throw erro;
  }
}

/**
 * Exibe os dados climáticos na tela de resultado.
 *
 * @param {Object} clima - Dados climáticos retornados pela API.
 * @param {string} cidade - Nome da cidade.
 * @param {string} pais - Nome do país.
 * @returns {void}
 *
 * @example
 * exibirResultado(clima, 'São Paulo', 'Brasil');
 */
function exibirResultado(clima, cidade, pais) {
  const temperatura = clima.temperature_2m;
  const codigoClima = clima.weather_code;
  const isDay = clima.is_day;

  const descricao = obterDescricaoClima(codigoClima);
  const icone = obterIconeClima(codigoClima, isDay);

  // Temperatura
  temperatureEl.textContent = `${Math.round(temperatura)}°C`;

  // Cidade e país
  cityNameEl.textContent = `${cidade}, ${pais}`;

  // Descrição do clima
  weatherDescriptionEl.textContent = descricao;

  // Ícone
  weatherIconEl.className = `wi ${icone}`;

  // Data e hora
  dateTimeEl.textContent = formatarDataHora(clima.time);

  // Muda o fundo conforme dia ou noite
  alterarTema(isDay);

  // Troca os cards
  searchCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
}

/**
 * Retorna a descrição textual correspondente ao código meteorológico.
 *
 * @param {number} codigo - Código meteorológico WMO.
 * @returns {string} Descrição da condição climática.
 *
 * @example
 * const descricao = obterDescricaoClima(0);
 * console.log(descricao);
 */
function obterDescricaoClima(codigo) {
  const descricoes = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina com geada',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa intensa',
    56: 'Garoa congelante leve',
    57: 'Garoa congelante intensa',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva intensa',
    66: 'Chuva congelante leve',
    67: 'Chuva congelante intensa',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve intensa',
    77: 'Granizo de neve',
    80: 'Pancadas de chuva leves',
    81: 'Pancadas de chuva moderadas',
    82: 'Pancadas de chuva intensas',
    85: 'Pancadas de neve leves',
    86: 'Pancadas de neve intensas',
    95: 'Trovoada',
    96: 'Trovoada com granizo leve',
    99: 'Trovoada com granizo intenso'
  };

  return descricoes[codigo] || 'Condição climática desconhecida';
}

/**
 * Retorna o ícone correspondente ao código meteorológico
 * e ao período do dia.
 *
 * @param {number} codigo - Código meteorológico WMO.
 * @param {number|boolean} isDay - Indica se é dia.
 * @returns {string} Classe CSS do ícone Weather Icons.
 *
 * @example
 * const icone = obterIconeClima(0, true);
 * console.log(icone);
 */
function obterIconeClima(codigo, isDay) {
  const periodo = isDay ? 'day' : 'night';

  const icones = {
    0: {
      day: 'wi-day-sunny',
      night: 'wi-night-clear'
    },
    1: {
      day: 'wi-day-sunny-overcast',
      night: 'wi-night-alt-partly-cloudy'
    },
    2: {
      day: 'wi-day-cloudy',
      night: 'wi-night-alt-cloudy'
    },
    3: {
      day: 'wi-cloudy',
      night: 'wi-cloudy'
    },
    45: {
      day: 'wi-day-fog',
      night: 'wi-night-fog'
    },
    48: {
      day: 'wi-day-fog',
      night: 'wi-night-fog'
    },
    51: {
      day: 'wi-day-sprinkle',
      night: 'wi-night-alt-sprinkle'
    },
    53: {
      day: 'wi-day-sprinkle',
      night: 'wi-night-alt-sprinkle'
    },
    55: {
      day: 'wi-day-sprinkle',
      night: 'wi-night-alt-sprinkle'
    },
    61: {
      day: 'wi-day-rain',
      night: 'wi-night-alt-rain'
    },
    63: {
      day: 'wi-day-rain',
      night: 'wi-night-alt-rain'
    },
    65: {
      day: 'wi-day-rain',
      night: 'wi-night-alt-rain'
    },
    71: {
      day: 'wi-day-snow',
      night: 'wi-night-alt-snow'
    },
    73: {
      day: 'wi-day-snow',
      night: 'wi-night-alt-snow'
    },
    75: {
      day: 'wi-day-snow',
      night: 'wi-night-alt-snow'
    },
    80: {
      day: 'wi-day-showers',
      night: 'wi-night-alt-showers'
    },
    81: {
      day: 'wi-day-showers',
      night: 'wi-night-alt-showers'
    },
    82: {
      day: 'wi-day-showers',
      night: 'wi-night-alt-showers'
    },
    95: {
      day: 'wi-day-thunderstorm',
      night: 'wi-night-alt-thunderstorm'
    },
    96: {
      day: 'wi-day-storm-showers',
      night: 'wi-night-alt-storm-showers'
    },
    99: {
      day: 'wi-day-storm-showers',
      night: 'wi-night-alt-storm-showers'
    }
  };

  if (!icones[codigo]) {
    return 'wi-na';
  }

  return icones[codigo][periodo];
}

/**
 * Formata uma data e hora para o padrão utilizado pela aplicação.
 *
 * @param {string} dataHora - Data e hora no formato aceito pelo objeto Date.
 * @returns {string} Data formatada em português do Brasil.
 *
 * @example
 * const data = formatarDataHora('2026-08-12T10:00');
 * console.log(data);
 */
function formatarDataHora(dataHora) {
  const data = new Date(dataHora);

  return data.toLocaleString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Altera o tema visual da aplicação conforme o período do dia.
 *
 * @param {number|boolean} isDay - Indica se é dia ou noite.
 * @returns {void}
 *
 * @example
 * alterarTema(1);
 */
function alterarTema(isDay) {
  if (isDay) {
    document.body.classList.remove('night-mode');
    document.body.classList.add('day-mode');
  } else {
    document.body.classList.remove('day-mode');
    document.body.classList.add('night-mode');
  }
}

/**
 * Exibe uma mensagem de erro na tela.
 *
 * @param {string} mensagem - Mensagem que será apresentada ao usuário.
 * @returns {void}
 *
 * @example
 * exibirErro('Cidade não encontrada.');
 */
function exibirErro(mensagem) {
  errorMessage.textContent = mensagem;
  errorMessage.classList.remove('hidden');
}

/**
 * Esconde a mensagem de erro exibida na tela.
 *
 * @returns {void}
 *
 * @example
 * hideError();
 */
function hideError() {
  errorMessage.classList.add('hidden');
}

// ---------- Exportação para os testes ----------
if (typeof module !== 'undefined') {
  module.exports = {
    buscarCoordenadas,
    buscarClima,
    obterDescricaoClima,
    obterIconeClima,
    formatarDataHora,
  };
}