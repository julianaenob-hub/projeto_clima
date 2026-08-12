🌦️ The Weather Girl

☁️ Projeto Clima — sua previsão do tempo de forma simples, visual e intuitiva.

Aplicação web desenvolvida em HTML, CSS e JavaScript para consulta de condições climáticas atuais de uma cidade.

O projeto utiliza as APIs públicas do Open-Meteo para localizar uma cidade e obter seus dados climáticos atuais. As informações são apresentadas de forma simples e visual, incluindo temperatura, cidade, país, descrição do clima, ícone correspondente e indicação visual de dia ou noite.

O projeto também contempla práticas de testes automatizados, documentação, segurança, privacidade e conformidade de licenciamento.

⸻

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
* 🔐 Avisos de privacidade e licenciamento apresentados na interface.
* 📄 Documentação de segurança e privacidade.
* ⚖️ Registro das atribuições e créditos de componentes de terceiros.

⸻

🛠️ Tecnologias utilizadas

* 🌐 HTML5
* 🎨 CSS3
* ⚡ JavaScript
* 🟢 Node.js
* 🧪 Jest
* 🌦️ Open-Meteo API
* ☁️ Weather Icons

⸻

🌐 APIs utilizadas

📍 Geocodificação

A aplicação utiliza a API de geocodificação do Open-Meteo para transformar o nome da cidade em coordenadas geográficas.

🌦️ Previsão do tempo

Depois de obter latitude e longitude, a aplicação consulta a API de previsão do Open-Meteo para obter os dados climáticos atuais.

Os dados meteorológicos são fornecidos pelo Open-Meteo e utilizados de acordo com os termos e condições de sua licença.

⸻

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
├── LICENSE
├── NOTICE.md
├── SECURITY.md
└── README.md

⸻

🚀 Instalação

Para executar o projeto localmente, primeiro clone o repositório e acesse a pasta do projeto.

Depois, instale as dependências:

npm install

⸻

▶️ Como executar

Abra o arquivo index.html no navegador ou utilize uma extensão como o Live Server no Visual Studio Code.

Digite o nome de uma cidade no campo de pesquisa e clique no botão de busca para consultar as condições climáticas atuais.

⸻

🧪 Testes

Os testes automatizados foram desenvolvidos utilizando o Jest.

Para executar os testes:

npm test

Os testes verificam diferentes comportamentos da aplicação, incluindo:

* Busca de coordenadas.
* Busca de dados climáticos.
* Tratamento de erros da API.
* Descrições das condições climáticas.
* Seleção dos ícones meteorológicos.
* Formatação de data e hora.

⸻

📚 Documentação do código

As principais funções do arquivo api.js foram documentadas utilizando o padrão JSDoc.

A documentação apresenta informações sobre:

* Parâmetros de entrada (@param).
* Valores retornados (@returns).
* Exceções (@throws).
* Funções assíncronas (@async).
* Exemplos de utilização (@example).

Essa documentação facilita a compreensão, manutenção e reutilização do código.

⸻

🛡️ Tratamento de erros

A aplicação possui tratamento para diferentes situações, como:

* Cidade não encontrada.
* Falha na consulta da API.
* Dados climáticos indisponíveis.
* Erros de conexão com a internet.

As mensagens de erro são apresentadas diretamente na interface para orientar o usuário.

⸻

🔐 Segurança e privacidade

A aplicação foi analisada considerando boas práticas de segurança e privacidade.

👤 Dados do usuário

A aplicação:

* Não solicita nome, e-mail, senha ou outras informações pessoais.
* Não armazena as cidades pesquisadas.
* Não utiliza banco de dados para armazenar informações do usuário.
* Não utiliza cookies para registrar pesquisas.
* Não possui sistema de autenticação.
* Utiliza o nome da cidade informado apenas para realizar a consulta meteorológica.

As consultas são realizadas em tempo real por meio da API Open-Meteo.

🔒 Comunicação segura

Em ambiente de produção, recomenda-se utilizar exclusivamente HTTPS para a comunicação da aplicação.

A aplicação não deve armazenar ou expor chaves, tokens, senhas ou outras credenciais diretamente no código-fonte.

📦 Dependências

As dependências utilizadas no projeto devem ser mantidas atualizadas e verificadas periodicamente quanto a possíveis vulnerabilidades.

Para mais informações sobre a auditoria realizada, consulte o arquivo SECURITY.md.

⸻

🔒 Aviso de privacidade

Esta aplicação não armazena nem compartilha as pesquisas realizadas.

As informações digitadas são utilizadas para consultar a previsão do tempo em tempo real. As requisições são enviadas ao serviço Open-Meteo, que possui suas próprias políticas de privacidade.

⸻

⚖️ Licenciamento e conformidade

Este projeto utiliza componentes e serviços de terceiros e mantém seus respectivos créditos e informações de licenciamento.

🌦️ Projeto Clima

O código desenvolvido especificamente para este projeto está disponibilizado sob a Licença MIT, conforme descrito no arquivo LICENSE.

🌍 Open-Meteo

Os dados meteorológicos são fornecidos pelo Open-Meteo e estão sujeitos à licença Creative Commons Attribution 4.0 International (CC BY 4.0).

☁️ Weather Icons

Os ícones meteorológicos utilizados na aplicação são fornecidos pelo projeto Weather Icons e estão licenciados sob a SIL Open Font License 1.1 (OFL-1.1).

As atribuições e créditos dos componentes de terceiros também estão registrados no arquivo NOTICE.md.

⸻

🤖 Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento do projeto, principalmente para:

* Auxiliar na identificação e correção de erros.
* Apoiar a elaboração e revisão da documentação.
* Sugerir melhorias de organização e boas práticas.
* Apoiar a análise de segurança, privacidade e licenciamento.
* Auxiliar na criação e revisão de testes.

Todo código e conteúdo sugerido por ferramentas de IA deve ser revisado e validado manualmente antes de sua utilização.

A utilização de IA não substitui a responsabilidade da pessoa desenvolvedora pela análise, funcionamento, segurança e conformidade do projeto.

⸻

📄 Documentação adicional

O projeto possui documentos específicos relacionados à Etapa 06 — Ética e Segurança:

* 🔐 SECURITY.md — relatório de Segurança e Privacidade.
* 📜 LICENSE — licença do projeto em português e inglês.
* 📋 NOTICE.md — atribuições e créditos de componentes e serviços de terceiros.

⸻

📌 Status do projeto

🚧 Projeto acadêmico em desenvolvimento

Projeto desenvolvido durante o curso de formação em Desenvolvimento Full Stack.

A aplicação está sendo evoluída por etapas, incluindo desenvolvimento, testes automatizados, revisão de código, documentação, segurança, privacidade e conformidade de licenciamento.

⸻

Desenvolvido por

👩🏻‍💻 Juliana Vitoria

Projeto desenvolvido com dedicação e aprendizado contínuo em desenvolvimento Full Stack.

⸻
