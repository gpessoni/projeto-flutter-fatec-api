# Controle de Medicamentos API

API REST para controle de ingestão de medicamentos — registre se o remédio foi tomado, o horário, dosagem e observações.

**Autores:** Gabriel da Silveira Pessoni · Lívia Portela Ferreira  
**Curso:** DSM — FATEC · 5º Semestre

---

## Tecnologias

| Lib | Uso |
|-----|-----|
| [Express](https://expressjs.com/) | Framework web |
| [pg](https://node-postgres.com/) | Cliente PostgreSQL (sem ORM) |
| [Joi](https://joi.dev/) | Validação de dados |
| [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) | Documentação Swagger |
| [dotenv](https://github.com/motdotla/dotenv) | Variáveis de ambiente |
| [cors](https://github.com/expressjs/cors) | Habilitar CORS |
| [Jest](https://jestjs.io/) | Testes automatizados |
| [Supertest](https://github.com/ladjs/supertest) | Testes de endpoints HTTP |

---

## Pré-requisitos

- Node.js 18+
- PostgreSQL (local ou remoto, ex: [Render](https://render.com))

---

## Configuração

**1. Clone o repositório e instale as dependências:**

```bash
git clone https://github.com/gpessoni/projeto-flutter-fatec-api
cd projeto-flutter-fatec-api
npm install
```

**2. Crie o arquivo `.env` a partir do exemplo:**

```bash
cp .env.example .env
```

**3. Preencha as variáveis no `.env`:**

```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_do_banco
NODE_ENV=development
```

---

## Banco de dados

Execute a migration para criar a tabela `medicamentos`:

```bash
node -e "
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const sql = fs.readFileSync('./migrations/001_create_medicamentos.sql', 'utf8');
pool.query(sql).then(() => { console.log('Migration OK'); process.exit(0); }).catch(e => { console.error(e.message); process.exit(1); });
"
```

---

## Rodando o servidor

```bash
npm start
```

O servidor inicia em `http://localhost:3000`.

---

## Testes

```bash
npm test
```

Os testes usam Jest + Supertest com o banco mockado — não precisam de conexão real.

---

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Documentação HTML com testador integrado |
| `GET` | `/api-docs` | Swagger UI |
| `GET` | `/medicamentos` | Lista todos os registros |
| `GET` | `/medicamentos/:id` | Busca registro por ID |
| `POST` | `/medicamentos` | Cria um registro |
| `PUT` | `/medicamentos/:id` | Atualiza um registro |
| `DELETE` | `/medicamentos/:id` | Remove um registro |

### Campos do registro

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `nome` | string (2–100) | Sim | Nome do medicamento |
| `dosagem` | string (max 100) | Sim | Dosagem ex: "1 comprimido", "500mg" |
| `horario` | string (max 50) | Sim | Horário previsto ex: "08:00", "após almoço" |
| `tomado` | boolean | Não | Se o remédio foi tomado (padrão: `false`) |
| `observacoes` | string (max 1000) | Não | Anotações livres |

### Exemplos

**POST /medicamentos** — registrar um medicamento
```json
{
  "nome": "Dipirona 500mg",
  "dosagem": "1 comprimido",
  "horario": "08:00",
  "tomado": false,
  "observacoes": "Tomar após o café"
}
```

**PUT /medicamentos/1** — marcar como tomado
```json
{
  "tomado": true,
  "observacoes": "Tomado às 08:15"
}
```

---

## Estrutura do projeto

```
bank_api/
├── src/
│   ├── app.js                          # Express app
│   ├── config/
│   │   └── database.js                 # Conexão com PostgreSQL
│   ├── controllers/
│   │   └── medicamentosController.js   # Lógica das rotas
│   ├── docs/
│   │   └── swagger.js                  # Spec OpenAPI 3.0
│   ├── routes/
│   │   └── medicamentos.js             # Definição das rotas
│   └── validations/
│       └── medicamentosValidation.js   # Schemas Joi
├── tests/
│   └── medicamentos.test.js            # Testes automatizados
├── migrations/
│   └── 001_create_medicamentos.sql     # SQL de criação da tabela
├── server.js                           # Entry point
├── .env.example                        # Modelo de variáveis de ambiente
└── package.json
```
