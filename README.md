# Medicamentos API

API REST para gerenciamento de medicamentos, desenvolvida com Node.js, Express e PostgreSQL.

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
# produção
npm start

# desenvolvimento
npm run dev
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
| `GET` | `/` | Documentação HTML |
| `GET` | `/api-docs` | Swagger UI |
| `GET` | `/medicamentos` | Lista todos os medicamentos |
| `GET` | `/medicamentos/:id` | Busca medicamento por ID |
| `POST` | `/medicamentos` | Cria um medicamento |
| `PUT` | `/medicamentos/:id` | Atualiza um medicamento |
| `DELETE` | `/medicamentos/:id` | Remove um medicamento |

### Campos do medicamento

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `nome` | string (2–100) | Sim | Nome do medicamento |
| `descricao` | string (max 500) | Não | Descrição detalhada |
| `preco` | number (≥ 0) | Sim | Preço em reais |
| `quantidade_estoque` | integer (≥ 0) | Não | Unidades em estoque (padrão: 0) |
| `fabricante` | string (max 100) | Não | Nome do fabricante |

### Exemplos

**POST /medicamentos**
```json
{
  "nome": "Dipirona 500mg",
  "descricao": "Analgésico e antipirético",
  "preco": 12.50,
  "quantidade_estoque": 100,
  "fabricante": "Medley"
}
```

**PUT /medicamentos/1**
```json
{
  "preco": 15.00,
  "quantidade_estoque": 80
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
