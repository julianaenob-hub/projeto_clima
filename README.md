🌦️ Projeto Clima

Aplicação web desenvolvida em JavaScript puro para consulta de condições climáticas atuais de uma cidade.

O projeto utiliza as APIs gratuitas do Open-Meteo para localizar uma cidade e obter seus dados climáticos atuais. As informações são apresentadas de forma simples e visual, incluindo temperatura, cidade, país, descrição do clima, ícone correspondente e indicação visual de dia ou noite.

✨ Funcionalidades

* 🔎 Busca de uma cidade pelo nome.
* 📍 Consulta de latitude e longitude por meio da API de geocodificação do Open-Meteo.
* 🌡️ Consulta da temperatura atual.
* 🌤️ Identificação da condição climática.
* 🌙 Diferenciação entre período diurno e noturno.
* 🎨 Alteração do tema visual de acordo com o período do dia.
* ☁️ Exibição de ícones correspondentes às condições climáticas.
* 📅 Exibição da data da consulta.
* ⚠️ Tratamento de erros de conexão e de consulta.
* 🔙 Botão para retornar à tela inicial.
* 🧪 Testes automatizados utilizando Jest.
* 📚 Documentação das funções utilizando comentários no padrão JSDoc.

🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Jest
* Open-Meteo API
* Weather Icons

🌐 APIs utilizadas

Geocodificação

A aplicação utiliza a API de geocodificação do Open-Meteo para transformar o nome da cidade em coordenadas geográficas.

https://geocoding-api.open-meteo.com/v1/search

Previsão do tempo

Depois de obter latitude e longitude, a aplicação consulta a API de previsão do Open-Meteo para obter os dados climáticos atuais.

https://api.open-meteo.com/v1/forecast

📁 Estrutura do projeto

projeto_clima/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── api.js
│
├── tests/
│   └── api.test.js
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md

🚀 Instalação

Para executar o projeto localmente, primeiro clone o repositório e acesse a pasta do projeto.

Depois, instale as dependências:

npm install

▶️ Como executar

Abra o arquivo index.html no navegador ou utilize uma extensão como o Live Server no Visual Studio Code.

Digite o nome de uma cidade no campo de pesquisa e clique no botão de busca para consultar as condições climáticas atuais.

🧪 Testes

Os testes automatizados foram desenvolvidos utilizando o Jest.

Para executar os testes, utilize:

npm test

Os testes verificam diferentes comportamentos da aplicação, incluindo:

* Busca de coordenadas.
* Busca de dados climáticos.
* Tratamento de erros da API.
* Descrições das condições climáticas.
* Seleção dos ícones meteorológicos.
* Formatação de data e hora.

📚 Documentação do código

As principais funções do arquivo api.js foram documentadas utilizando o padrão JSDoc.

A documentação apresenta informações sobre:

* Parâmetros de entrada (@param).
* Valores retornados (@returns).
* Exceções (@throws).
* Funções assíncronas (@async).
* Exemplos de utilização (@example).

Essa documentação facilita a compreensão, manutenção e reutilização do código.

🛡️ Tratamento de erros

A aplicação possui tratamento para diferentes situações, como:

* Cidade não encontrada.
* Falha na consulta da API.
* Dados climáticos indisponíveis.
* Erros de conexão com a internet.

As mensagens de erro são apresentadas diretamente na interface para orientar o usuário.

📌 Status do projeto

Projeto acadêmico em desenvolvimento durante o curso de formação em desenvolvimento Full Stack.

A aplicação está sendo evoluída por etapas, incluindo desenvolvimento, testes automatizados, revisão de código e documentação.

📄 Licença

Projeto desenvolvido para fins acadêmicos e educacionais.