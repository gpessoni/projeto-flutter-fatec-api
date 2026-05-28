const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/config/database', () => ({ query: jest.fn() }));
const pool = require('../src/config/database');

const medicamentoMock = {
  id: 1,
  nome: 'Dipirona 500mg',
  dosagem: '1 comprimido',
  horario: '08:00',
  tomado: false,
  observacoes: 'Tomar após o café',
  created_at: new Date().toISOString(),
};

beforeEach(() => jest.clearAllMocks());

describe('GET /medicamentos', () => {
  it('retorna lista de registros com status 200', async () => {
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
  it('retorna um registro com status 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [medicamentoMock] });

    const res = await request(app).get('/medicamentos/1');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toHaveProperty('tomado');
  });

  it('retorna 404 quando registro não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/medicamentos/999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('POST /medicamentos', () => {
  it('registra um medicamento e retorna 201', async () => {
    pool.query.mockResolvedValueOnce({ rows: [medicamentoMock] });

    const res = await request(app).post('/medicamentos').send({
      nome: 'Dipirona 500mg',
      dosagem: '1 comprimido',
      horario: '08:00',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body).toHaveProperty('medicamento');
  });

  it('retorna 400 quando nome está ausente', async () => {
    const res = await request(app).post('/medicamentos').send({
      dosagem: '1 comprimido',
      horario: '08:00',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando dosagem está ausente', async () => {
    const res = await request(app).post('/medicamentos').send({
      nome: 'Dipirona',
      horario: '08:00',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando horario está ausente', async () => {
    const res = await request(app).post('/medicamentos').send({
      nome: 'Dipirona',
      dosagem: '1 comprimido',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('retorna 400 quando nome é muito curto', async () => {
    const res = await request(app).post('/medicamentos').send({
      nome: 'A',
      dosagem: '1 comprimido',
      horario: '08:00',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('PUT /medicamentos/:id', () => {
  it('marca medicamento como tomado e retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ ...medicamentoMock, tomado: true }] });

    const res = await request(app).put('/medicamentos/1').send({ tomado: true });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body.medicamento.tomado).toBe(true);
  });

  it('retorna 404 quando registro não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).put('/medicamentos/999').send({ tomado: true });

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
  it('remove um registro e retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const res = await request(app).delete('/medicamentos/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('retorna 404 quando registro não existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).delete('/medicamentos/999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});
