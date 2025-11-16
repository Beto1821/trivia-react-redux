# 🎮 Trivia Game - React & Redux

<div align="center">

![React](https://img.shields.io/badge/React-16.12.0-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-4.0.5-purple?logo=redux)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Tests](https://img.shields.io/badge/Tests-Jest%20%26%20Cypress-green?logo=testing-library)

**Teste seus conhecimentos com perguntas de diversos temas!**

[🎯 Jogar Agora](https://trivia-react-redux-three.vercel.app) | [📋 Sobre](#sobre) | [🚀 Tecnologias](#tecnologias)

</div>

---

## 📖 Sobre

**Trivia Game** é um jogo de perguntas e respostas interativo onde os jogadores podem testar seus conhecimentos em diversas categorias. O jogo utiliza a API do [Open Trivia Database](https://opentdb.com/) para gerar perguntas aleatórias com diferentes níveis de dificuldade.

### ✨ Funcionalidades

- ✅ **Autenticação de Jogador** - Sistema de login com nome e email do jogador
- 🎲 **Perguntas Dinâmicas** - Integração com API externa para perguntas variadas
- ⏱️ **Sistema de Pontuação** - Pontos baseados na dificuldade e tempo de resposta
- 📊 **Feedback Personalizado** - Mensagens motivacionais baseadas no desempenho
- 🏆 **Ranking** - Visualize os melhores jogadores e suas pontuações
- 🎨 **Interface Responsiva** - Design adaptável para diferentes dispositivos
- ⚙️ **Configurações** - Personalize sua experiência de jogo

### 🎯 Como Funciona

1. **Login**: Insira seu nome e email para começar
2. **Jogo**: Responda 5 perguntas de múltipla escolha
3. **Pontuação**: Ganhe pontos baseados em acertos, dificuldade e velocidade
4. **Feedback**: Veja seu desempenho e estatísticas
5. **Ranking**: Compare sua pontuação com outros jogadores

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### Core
- **[React](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces
- **[Redux](https://redux.js.org/)** - Gerenciamento de estado global
- **[React Router DOM](https://reactrouter.com/)** - Navegação entre páginas
- **[Redux Thunk](https://github.com/reduxjs/redux-thunk)** - Middleware para ações assíncronas

### Testes
- **[Jest](https://jestjs.io/)** - Framework de testes JavaScript
- **[React Testing Library](https://testing-library.com/react)** - Testes de componentes React
- **[Cypress](https://www.cypress.io/)** - Testes end-to-end

### Outras Ferramentas
- **[CryptoJS](https://www.npmjs.com/package/crypto-js)** - Criptografia e hash
- **[ESLint](https://eslint.org/)** - Linter para manter qualidade do código
- **[Vercel](https://vercel.com/)** - Deploy e hospedagem

---

## 🎮 Demonstração

🔗 **[Acesse o jogo aqui](https://trivia-react-redux-three.vercel.app)**

### 📸 Screenshots

```
🏠 Tela de Login → 🎲 Tela de Jogo → 📊 Feedback → 🏆 Ranking
```

---

## 💻 Instalação e Execução

### Pré-requisitos

- Node.js 16.x ou superior
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/Beto1821/trivia-react-redux.git
cd trivia-react-redux
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm start
```

4. **Acesse no navegador**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm test           # Executa os testes em modo watch
npm run build      # Cria build de produção
npm run cy:open    # Abre o Cypress para testes E2E
npm run cy         # Executa os testes Cypress
npm run lint       # Verifica a qualidade do código
```

---

## 📁 Estrutura do Projeto

```
trivia-react-redux/
├── public/                 # Arquivos públicos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.jsx     # Cabeçalho com info do jogador
│   │   └── RankingCard.jsx # Card de exibição no ranking
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.jsx      # Tela de login
│   │   ├── Game.jsx       # Tela principal do jogo
│   │   ├── Feedback.jsx   # Tela de feedback
│   │   ├── Ranking.jsx    # Tela de ranking
│   │   └── Settings.jsx   # Tela de configurações
│   ├── redux/             # Gerenciamento de estado
│   │   ├── actions/       # Actions do Redux
│   │   └── reducers/      # Reducers do Redux
│   ├── tests/             # Testes unitários e de integração
│   ├── App.js             # Componente principal
│   └── index.js           # Ponto de entrada
├── cypress/               # Testes E2E
│   ├── integration/       # Specs de teste
│   ├── fixtures/          # Dados de teste
│   └── mocks/             # Mocks para API
└── package.json           # Dependências e scripts
```

---

## 🧪 Testes

O projeto possui cobertura de testes em múltiplas camadas:

### Testes Unitários (Jest + React Testing Library)
```bash
npm test                    # Modo watch
npm run test-coverage       # Com relatório de cobertura
```

### Testes E2E (Cypress)
```bash
npm run cy:open             # Interface visual
npm run cy                  # Modo headless
```

### Cobertura de Testes
- ✅ Tela de Login
- ✅ Tela de Jogo
- ✅ Tela de Feedback
- ✅ Tela de Ranking
- ✅ Componentes (Header, RankingCard)
- ✅ Redux (Actions e Reducers)

---

## 🎯 Funcionalidades Detalhadas

### Sistema de Pontuação
A pontuação é calculada com base em:
- **Acerto**: Resposta correta (+10 pontos base)
- **Dificuldade**: 
  - Easy: multiplicador 1
  - Medium: multiplicador 2
  - Hard: multiplicador 3
- **Tempo**: Quanto mais rápido, mais pontos (30 segundos por pergunta)

**Fórmula**: `10 + (timer * difficulty)`

### Persistência de Dados
- LocalStorage para salvar ranking
- Estado do jogador mantido durante a sessão
- Hash MD5 para Gravatar

---

## 📝 Licença

Este projeto foi desenvolvido como parte do curso da [Trybe](https://www.betrybe.com/).

---

## � Contribuidores

Este projeto foi desenvolvido em grupo com a colaboração de:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Beto1821">
        <img src="https://github.com/Beto1821.png" width="100px;" alt="Beto1821"/><br>
        <sub><b>Adalberto R. Ribeiro</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/henriqueambrosano">
        <img src="https://github.com/henriqueambrosano.png" width="100px;" alt="Henrique Ambrosano"/><br>
        <sub><b>Henrique Ambrosano</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ThiagoGasparini">
        <img src="https://github.com/ThiagoGasparini.png" width="100px;" alt="Thiago Gasparini"/><br>
        <sub><b>Thiago Gasparini</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/trybe-tech-ops">
        <img src="https://github.com/trybe-tech-ops.png" width="100px;" alt="Trybe Tech Ops"/><br>
        <sub><b>Trybe Tech Ops</b></sub>
      </a>
    </td>
  </tr>
</table>

---

<div align="center">

**Desenvolvido com ❤️ e muito ☕**

⭐ Se gostou do projeto, deixe uma estrela!

</div>
