const express = require('express');
const cors = require('cors');
const { swaggerUi, spec } = require('./docs/swagger');
const medicamentosRoutes = require('./routes/medicamentos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
app.use('/medicamentos', medicamentosRoutes);

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Medicamentos API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #f0f4f8; color: #1a202c; }
    header { background: #2b6cb0; color: #fff; padding: 2rem; text-align: center; }
    header h1 { font-size: 2rem; margin-bottom: .5rem; }
    header p { opacity: .85; }
    main { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    .card { background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.1); padding: 1.5rem; margin-bottom: 1.5rem; }
    .card h2 { font-size: 1.1rem; color: #2b6cb0; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: .5rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: .6rem .8rem; font-size: .9rem; }
    th { background: #ebf4ff; color: #2b6cb0; }
    tr:not(:last-child) td { border-bottom: 1px solid #f0f4f8; }
    .badge { display: inline-block; padding: .25rem .6rem; border-radius: 4px; font-size: .75rem; font-weight: 700; color: #fff; cursor:pointer; }
    .GET    { background: #38a169; }
    .POST   { background: #2b6cb0; }
    .PUT    { background: #d69e2e; }
    .DELETE { background: #e53e3e; }
    .swagger-link { display: inline-block; margin-top: 1rem; background: #2b6cb0; color: #fff; padding: .6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; }
    .swagger-link:hover { background: #2c5282; }

    /* tester */
    .tester-row { display: grid; grid-template-columns: 130px 1fr auto; gap: .5rem; align-items: center; margin-bottom: .75rem; }
    select, input[type="text"] { width: 100%; padding: .5rem .75rem; border: 1px solid #cbd5e0; border-radius: 6px; font-size: .9rem; background: #fff; }
    select:focus, input:focus { outline: none; border-color: #2b6cb0; box-shadow: 0 0 0 2px #bee3f8; }
    .btn-send { padding: .5rem 1.2rem; background: #2b6cb0; color: #fff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; white-space: nowrap; }
    .btn-send:hover { background: #2c5282; }
    .body-area { width: 100%; min-height: 90px; padding: .6rem .75rem; border: 1px solid #cbd5e0; border-radius: 6px; font-family: 'Courier New', monospace; font-size: .85rem; resize: vertical; }
    .body-area:focus { outline: none; border-color: #2b6cb0; box-shadow: 0 0 0 2px #bee3f8; }
    .body-wrap { margin-bottom: .75rem; }
    .body-wrap label { display: block; font-size: .8rem; color: #718096; margin-bottom: .3rem; }
    .presets { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .75rem; }
    .preset-btn { padding: .3rem .7rem; border: 1px solid #cbd5e0; border-radius: 5px; background: #f7fafc; font-size: .78rem; cursor: pointer; color: #2d3748; }
    .preset-btn:hover { background: #ebf4ff; border-color: #2b6cb0; color: #2b6cb0; }
    #response-box { background: #1a202c; color: #f7fafc; border-radius: 6px; padding: 1rem; font-family: 'Courier New', monospace; font-size: .85rem; min-height: 60px; white-space: pre-wrap; word-break: break-all; }
    .status-badge { display: inline-block; padding: .2rem .6rem; border-radius: 4px; font-size: .8rem; font-weight: 700; margin-bottom: .5rem; }
    .s2 { background: #c6f6d5; color: #276749; }
    .s4 { background: #fed7d7; color: #9b2c2c; }
    .s5 { background: #feebc8; color: #7b341e; }
    footer { text-align: center; padding: 1.5rem; color: #718096; font-size: .8rem; }
  </style>
</head>
<body>
  <header>
    <h1>Medicamentos API</h1>
    <p>API REST para gerenciamento de medicamentos — v1.0.0</p>
  </header>
  <main>

    <div class="card">
      <h2>Rotas disponíveis</h2>
      <table>
        <thead><tr><th>Método</th><th>Rota</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><span class="badge GET">GET</span></td><td>/medicamentos</td><td>Lista todos os medicamentos</td></tr>
          <tr><td><span class="badge GET">GET</span></td><td>/medicamentos/:id</td><td>Busca um medicamento por ID</td></tr>
          <tr><td><span class="badge POST">POST</span></td><td>/medicamentos</td><td>Cria um novo medicamento</td></tr>
          <tr><td><span class="badge PUT">PUT</span></td><td>/medicamentos/:id</td><td>Atualiza um medicamento</td></tr>
          <tr><td><span class="badge DELETE">DELETE</span></td><td>/medicamentos/:id</td><td>Remove um medicamento</td></tr>
        </tbody>
      </table>
      <a class="swagger-link" href="/api-docs">Abrir documentação Swagger</a>
    </div>

    <div class="card">
      <h2>Testar rotas</h2>

      <div class="presets">
        <button class="preset-btn" onclick="preset('GET','/medicamentos','')">GET todos</button>
        <button class="preset-btn" onclick="preset('GET','/medicamentos/1','')">GET por ID</button>
        <button class="preset-btn" onclick='preset("POST","/medicamentos",JSON.stringify({nome:"Dipirona 500mg",descricao:"Analgésico",preco:12.50,quantidade_estoque:100,fabricante:"Medley"},null,2))'>POST criar</button>
        <button class="preset-btn" onclick='preset("PUT","/medicamentos/1",JSON.stringify({preco:15.00,quantidade_estoque:80},null,2))'>PUT atualizar</button>
        <button class="preset-btn" onclick="preset('DELETE','/medicamentos/1','')">DELETE</button>
      </div>

      <div class="tester-row">
        <select id="method">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input type="text" id="path" value="/medicamentos" placeholder="/medicamentos ou /medicamentos/1" />
        <button class="btn-send" onclick="enviar()">Enviar</button>
      </div>

      <div class="body-wrap">
        <label>Body (JSON) — deixe vazio para GET/DELETE</label>
        <textarea class="body-area" id="body" placeholder='{ "nome": "Dipirona", "preco": 12.5 }'></textarea>
      </div>

      <div>
        <div id="status-line"></div>
        <pre id="response-box">A resposta aparecerá aqui...</pre>
      </div>
    </div>

    <div class="card">
      <h2>Campos do medicamento</h2>
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>nome</td><td>string</td><td>Sim</td><td>Nome do medicamento (2–100 chars)</td></tr>
          <tr><td>descricao</td><td>string</td><td>Não</td><td>Descrição detalhada (até 500 chars)</td></tr>
          <tr><td>preco</td><td>number</td><td>Sim</td><td>Preço em reais (≥ 0)</td></tr>
          <tr><td>quantidade_estoque</td><td>integer</td><td>Não</td><td>Unidades em estoque (padrão: 0)</td></tr>
          <tr><td>fabricante</td><td>string</td><td>Não</td><td>Nome do fabricante (até 100 chars)</td></tr>
        </tbody>
      </table>
    </div>

  </main>
  <footer>Medicamentos API &mdash; FATEC 5&ordm; Semestre &mdash; Gabriel da Silveira Pessoni · Lívia Portela Ferreira</footer>

  <script>
    function preset(method, path, body) {
      document.getElementById('method').value = method;
      document.getElementById('path').value = path;
      document.getElementById('body').value = body;
    }

    async function enviar() {
      const method = document.getElementById('method').value;
      const path   = document.getElementById('path').value.trim();
      const raw    = document.getElementById('body').value.trim();
      const box    = document.getElementById('response-box');
      const statusLine = document.getElementById('status-line');

      box.textContent = 'Aguardando...';
      statusLine.innerHTML = '';

      const opts = { method, headers: { 'Content-Type': 'application/json' } };
      if (raw && method !== 'GET' && method !== 'DELETE') {
        try { JSON.parse(raw); } catch {
          box.textContent = 'JSON inválido no body.';
          return;
        }
        opts.body = raw;
      }

      try {
        const res = await fetch(path, opts);
        const text = await res.text();
        let pretty = text;
        try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch {}

        const cls = res.status < 300 ? 's2' : res.status < 500 ? 's4' : 's5';
        statusLine.innerHTML = '<span class="status-badge ' + cls + '">' + res.status + ' ' + res.statusText + '</span>';
        box.textContent = pretty;
      } catch (e) {
        statusLine.innerHTML = '<span class="status-badge s5">Erro de rede</span>';
        box.textContent = e.message;
      }
    }

    document.getElementById('path').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') enviar();
    });
  </script>
</body>
</html>`);
});

module.exports = app;
