const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/config/database', () => ({ query: jest.fn() }));
const pool = require('../src/config/database');

const medicamentoMock = {
  id: 1,
  nome: 'Dipirona 500mg',
  descricao: 'Analgésico',
  preco: '12.50',
  quantidade_estoque: 50,
  fabricante: 'Medley',
  created_at: new Date().toISOString(),
};

beforeEach(() => jest.clearAllMocks());

describe('GET /medicamentos', () => {
  it('retorna lista de medicamentos com status 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [medicamentoMock] });

    const res = await request(app).get('/medicamentos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].nome).toBe('Dipirona 500mg');
  });

  it('retorna 500 em caso de erro no banco', async () => {
    pool.query.mockRejectedValueOnce(new Error('Falha no banco'));

    const res = await request(app).get('/medicamentos');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('GET /medicamentos/:id', () => {
  it('retorna um medicamento com status 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [medicamentoMock] });

    const res = await request(app).get('/medicamentos/1');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('retorna 404 quando medicamento não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/medicamentos/999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('POST /medicamentos', () => {
  it('cria um medicamento e retorna 201', async () => {
    pool.query.mockResolvedValueOnce({ rows: [medicamentoMock] });

    const res = await request(app).post('/medicamentos').send({
      nome: 'Dipirona 500mg',
      preco: 12.5,
      quantidade_estoque: 50,
      fabricante: 'Medley',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body).toHaveProperty('medicamento');
  });

  it('retorna 400 quando nome está ausente', async () => {
    const res = await request(app).post('/medicamentos').send({ preco: 10 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando preco está ausente', async () => {
    const res = await request(app).post('/medicamentos').send({ nome: 'Paracetamol' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando nome é muito curto', async () => {
    const res = await request(app).post('/medicamentos').send({ nome: 'A', preco: 10 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando preco é negativo', async () => {
    const res = await request(app).post('/medicamentos').send({ nome: 'Dipirona', preco: -5 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('PUT /medicamentos/:id', () => {
  it('atualiza um medicamento e retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ ...medicamentoMock, preco: '20.00' }] });

    const res = await request(app).put('/medicamentos/1').send({ preco: 20 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body).toHaveProperty('medicamento');
  });

  it('retorna 404 quando medicamento não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).put('/medicamentos/999').send({ preco: 20 });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando body está vazio', async () => {
    const res = await request(app).put('/medicamentos/1').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('DELETE /medicamentos/:id', () => {
  it('deleta um medicamento e retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const res = await request(app).delete('/medicamentos/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('retorna 404 quando medicamento não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).delete('/medicamentos/999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});
