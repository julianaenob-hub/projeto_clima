const { buscarCoordenadas, buscarClima } = require('../assets/js/api');

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testes da API de clima', () => {

  test('1. Nome de cidade válido retorna dados meteorológicos', async () => {

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          {
            latitude: -23.55,
            longitude: -46.63,
            name: 'São Paulo',
            country: 'Brasil'
          }
        ]
      })
    });

    const resultado = await buscarCoordenadas('São Paulo');

    expect(resultado).toEqual({
      latitude: -23.55,
      longitude: -46.63,
      name: 'São Paulo',
      country: 'Brasil'
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });


  test('2. Nome de cidade inexistente lança exceção tratada', async () => {

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        results: []
      })
    });

    await expect(
      buscarCoordenadas('CidadeQueNaoExiste123')
    ).rejects.toThrow('Cidade não encontrada');

  });


  test('3. Entrada vazia retorna erro de validação', async () => {

    await expect(
      buscarCoordenadas('')
    ).rejects.toThrow();

  });


  test('4. Falha da API gera erro adequado', async () => {

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({})
    });

    await expect(
      buscarClima(-23.55, -46.63)
    ).rejects.toThrow(
      'Não foi possível obter os dados do clima.'
    );

  });


  test('5. Limite de requisições da API excedido', async () => {

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({})
    });

    await expect(
      buscarClima(-23.55, -46.63)
    ).rejects.toThrow();

  });


  test('6. Erro de conexão de rede', async () => {

    fetch.mockRejectedValueOnce(
      new TypeError('Failed to fetch')
    );

    await expect(
      buscarClima(-23.55, -46.63)
    ).rejects.toThrow(
      'Erro de conexão'
    );

  });


  test('7. Formato inesperado da resposta JSON', async () => {

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        resultado_invalido: true
      })
    });

    await expect(
      buscarClima(-23.55, -46.63)
    ).rejects.toThrow(
      'Os dados do clima não estão disponíveis no momento.'
    );

  });

});