require('dotenv').config();
const app = require('./src/app');

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
  console.log(`Documentação em  http://localhost:${porta}/api-docs`);
});
