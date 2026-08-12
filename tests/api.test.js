/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
  <div id="search-card">
    <form id="search-form">
      <input id="city-input" />
    </form>
    <p id="error-message" class="hidden"></p>
  </div>
  <div id="result-card" class="hidden">
    <span id="temperature"></span>
    <span id="city-name"></span>
    <button id="back-btn"></button>
    <span id="weather-description"></span>
    <i id="weather-icon"></i>
    <span id="date-time"></span>
  </div>
`;

const {
  buscarCoordenadas,
  buscarClima,
  obterDescricaoClima,
  obterIconeClima,
  formatarDataHora,
} = require('../assets/js/api');

// ---------- Helpers ----------
function mockFetchResponse(ok, jsonData) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(jsonData),
  });
}

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ==========================================================
// buscarCoordenadas
// ==========================================================
describe('buscarCoordenadas', () => {
  test('retorna latitude, longitude, nome e país quando a cidade é encontrada', async () => {
    global.fetch.mockReturnValueOnce(
      mockFetchResponse(true, {
        results: [
          {
            latitude: -23.5505,
            longitude: -46.6333,
            name: 'São Paulo',
            country: 'Brasil',
          },
        ],
      })
    );

    const resultado = await buscarCoordenadas('São Paulo');

    expect(resultado).toEqual({
      latitude: -23.5505,
      longitude: -46.6333,
      name: 'São Paulo',
      country: 'Brasil',
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('geocoding-api.open-meteo.com')
    );
  });

  test('lança erro quando nenhuma cidade é encontrada', async () => {
    global.fetch.mockReturnValueOnce(mockFetchResponse(true, { results: [] }));

    await expect(buscarCoordenadas('CidadeInexistente')).rejects.toThrow(
      'Cidade não encontrada. Verifique o nome e tente novamente.'
    );
  });

  test('lança erro quando o campo "results" não existe na resposta', async () => {
    global.fetch.mockReturnValueOnce(mockFetchResponse(true, {}));

    await expect(buscarCoordenadas('Cidade')).rejects.toThrow(
      'Cidade não encontrada. Verifique o nome e tente novamente.'
    );
  });

  test('lança erro quando a resposta HTTP não é "ok"', async () => {
    global.fetch.mockReturnValueOnce(mockFetchResponse(false, {}));

    await expect(buscarCoordenadas('Cidade')).rejects.toThrow(
      'Falha ao consultar a API de localização.'
    );
  });

  test('lança erro de conexão quando o fetch falha (TypeError)', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new TypeError('Failed to fetch'))
    );

    await expect(buscarCoordenadas('Cidade')).rejects.toThrow(
      'Erro de conexão. Verifique sua internet e tente novamente.'
    );
  });
});

// ==========================================================
// buscarClima
// ==========================================================
describe('buscarClima', () => {
  test('retorna os dados climáticos atuais e as variáveis adicionais', async () => {
    const currentMock = {
      temperature_2m: 25.3,
      weather_code: 0,
      is_day: 1,
      relative_humidity_2m: 65,
      wind_speed_10m: 12.5,
      precipitation: 0,
      time: '2026-08-12T10:00',
    };

    global.fetch.mockReturnValueOnce(
      mockFetchResponse(true, { current: currentMock })
    );

    const resultado = await buscarClima(-23.5505, -46.6333);

    expect(resultado).toEqual(currentMock);

    // Verifica as novas variáveis meteorológicas
    expect(resultado.relative_humidity_2m).toBe(65);
    expect(resultado.wind_speed_10m).toBe(12.5);
    expect(resultado.precipitation).toBe(0);

    // Verifica se a API de previsão foi chamada
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.open-meteo.com/v1/forecast')
    );
  });

  test('lança erro quando o campo "current" não existe na resposta', async () => {
    global.fetch.mockReturnValueOnce(mockFetchResponse(true, {}));

    await expect(buscarClima(0, 0)).rejects.toThrow(
      'Os dados do clima não estão disponíveis no momento.'
    );
  });

  test('lança erro quando a resposta HTTP não é "ok"', async () => {
    global.fetch.mockReturnValueOnce(mockFetchResponse(false, {}));

    await expect(buscarClima(0, 0)).rejects.toThrow(
      'Não foi possível obter os dados do clima.'
    );
  });

  test('lança erro de conexão quando o fetch falha (TypeError)', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new TypeError('Failed to fetch'))
    );

    await expect(buscarClima(0, 0)).rejects.toThrow(
      'Erro de conexão. Verifique sua internet e tente novamente.'
    );
  });
});

// ==========================================================
// obterDescricaoClima
// ==========================================================
describe('obterDescricaoClima', () => {
  test.each([
    [0, 'Céu limpo'],
    [2, 'Parcialmente nublado'],
    [45, 'Neblina'],
    [61, 'Chuva leve'],
    [71, 'Neve leve'],
    [95, 'Trovoada'],
  ])('retorna a descrição correta para o código %i', (codigo, esperado) => {
    expect(obterDescricaoClima(codigo)).toBe(esperado);
  });

  test('retorna mensagem padrão para código desconhecido', () => {
    expect(obterDescricaoClima(9999)).toBe('Condição climática desconhecida');
  });
});

// ==========================================================
// obterIconeClima
// ==========================================================
describe('obterIconeClima', () => {
  test('retorna o ícone diurno correto para céu limpo', () => {
    expect(obterIconeClima(0, 1)).toBe('wi-day-sunny');
  });

  test('retorna o ícone noturno correto para céu limpo', () => {
    expect(obterIconeClima(0, 0)).toBe('wi-night-clear');
  });

  test('retorna o ícone diurno correto para chuva moderada', () => {
    expect(obterIconeClima(63, 1)).toBe('wi-day-rain');
  });

  test('retorna o ícone noturno correto para trovoada', () => {
    expect(obterIconeClima(95, 0)).toBe('wi-night-alt-thunderstorm');
  });

  test('retorna "wi-na" para código de clima desconhecido', () => {
    expect(obterIconeClima(9999, 1)).toBe('wi-na');
  });
});

// ==========================================================
// formatarDataHora
// ==========================================================
describe('formatarDataHora', () => {
  test('formata a data corretamente em pt-BR', () => {
    const resultado = formatarDataHora('2026-08-12T10:00');

    // Verifica se contém o ano e não lança erro
    expect(resultado).toContain('2026');
    expect(typeof resultado).toBe('string');
    expect(resultado.length).toBeGreaterThan(0);
  });

  test('retorna uma string diferente para datas diferentes', () => {
    const data1 = formatarDataHora('2026-01-01T00:00');
    const data2 = formatarDataHora('2026-08-12T00:00');

    expect(data1).not.toBe(data2);
  });
});