const swaggerUi = require('swagger-ui-express');

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'Medicamentos API',
    version: '1.0.0',
    description: 'API REST para gerenciamento de medicamentos',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  tags: [{ name: 'Medicamentos', description: 'CRUD de medicamentos' }],
  paths: {
    '/medicamentos': {
      get: {
        tags: ['Medicamentos'],
        summary: 'Lista todos os medicamentos',
        responses: {
          200: {
            description: 'Lista de medicamentos',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Medicamento' } } } },
          },
        },
      },
      post: {
        tags: ['Medicamentos'],
        summary: 'Cria um novo medicamento',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoInput' } } },
        },
        responses: {
          201: { description: 'Medicamento criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoResposta' } } } },
          400: { description: 'Dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
    },
    '/medicamentos/{id}': {
      get: {
        tags: ['Medicamentos'],
        summary: 'Busca um medicamento pelo ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Medicamento encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Medicamento' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
      put: {
        tags: ['Medicamentos'],
        summary: 'Atualiza um medicamento',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoUpdate' } } },
        },
        responses: {
          200: { description: 'Medicamento atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoResposta' } } } },
          400: { description: 'Dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
      delete: {
        tags: ['Medicamentos'],
        summary: 'Remove um medicamento',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Medicamento removido' },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
    },
  },
  components: {
    schemas: {
      Medicamento: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Dipirona 500mg' },
          descricao: { type: 'string', example: 'Analgésico e antipirético' },
          preco: { type: 'number', example: 12.5 },
          quantidade_estoque: { type: 'integer', example: 100 },
          fabricante: { type: 'string', example: 'Medley' },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
      MedicamentoInput: {
        type: 'object',
        required: ['nome', 'preco'],
        properties: {
          nome: { type: 'string', example: 'Dipirona 500mg' },
          descricao: { type: 'string', example: 'Analgésico e antipirético' },
          preco: { type: 'number', example: 12.5 },
          quantidade_estoque: { type: 'integer', example: 100 },
          fabricante: { type: 'string', example: 'Medley' },
        },
      },
      MedicamentoUpdate: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'Dipirona 500mg' },
          descricao: { type: 'string', example: 'Analgésico e antipirético' },
          preco: { type: 'number', example: 12.5 },
          quantidade_estoque: { type: 'integer', example: 100 },
          fabricante: { type: 'string', example: 'Medley' },
        },
      },
      MedicamentoResposta: {
        type: 'object',
        properties: {
          mensagem: { type: 'string' },
          medicamento: { $ref: '#/components/schemas/Medicamento' },
        },
      },
      Erro: {
        type: 'object',
        properties: {
          erro: { type: 'string' },
        },
      },
    },
  },
};

module.exports = { swaggerUi, spec };
