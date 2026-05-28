const swaggerUi = require('swagger-ui-express');

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'Controle de Medicamentos API',
    version: '1.0.0',
    description: 'API REST para controle de ingestão de medicamentos — registre, consulte e atualize se o remédio foi tomado, horário, dosagem e observações.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  tags: [{ name: 'Medicamentos', description: 'CRUD de registros de medicamentos' }],
  paths: {
    '/medicamentos': {
      get: {
        tags: ['Medicamentos'],
        summary: 'Lista todos os registros de medicamentos',
        responses: {
          200: {
            description: 'Lista de registros',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Medicamento' } } } },
          },
        },
      },
      post: {
        tags: ['Medicamentos'],
        summary: 'Registra um novo medicamento',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoInput' } } },
        },
        responses: {
          201: { description: 'Registro criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoResposta' } } } },
          400: { description: 'Dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
    },
    '/medicamentos/{id}': {
      get: {
        tags: ['Medicamentos'],
        summary: 'Busca um registro pelo ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Registro encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Medicamento' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
      put: {
        tags: ['Medicamentos'],
        summary: 'Atualiza um registro (ex: marcar como tomado)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoUpdate' } } },
        },
        responses: {
          200: { description: 'Registro atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicamentoResposta' } } } },
          400: { description: 'Dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } } },
        },
      },
      delete: {
        tags: ['Medicamentos'],
        summary: 'Remove um registro',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Registro removido' },
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
          id:          { type: 'integer',  example: 1 },
          nome:        { type: 'string',   example: 'Dipirona 500mg' },
          dosagem:     { type: 'string',   example: '1 comprimido' },
          horario:     { type: 'string',   example: '08:00' },
          tomado:      { type: 'boolean',  example: false },
          observacoes: { type: 'string',   example: 'Tomar após o café' },
          created_at:  { type: 'string',   format: 'date-time' },
        },
      },
      MedicamentoInput: {
        type: 'object',
        required: ['nome', 'dosagem', 'horario'],
        properties: {
          nome:        { type: 'string',  example: 'Dipirona 500mg' },
          dosagem:     { type: 'string',  example: '1 comprimido' },
          horario:     { type: 'string',  example: '08:00' },
          tomado:      { type: 'boolean', example: false },
          observacoes: { type: 'string',  example: 'Tomar após o café' },
        },
      },
      MedicamentoUpdate: {
        type: 'object',
        properties: {
          nome:        { type: 'string',  example: 'Dipirona 500mg' },
          dosagem:     { type: 'string',  example: '1 comprimido' },
          horario:     { type: 'string',  example: '08:00' },
          tomado:      { type: 'boolean', example: true },
          observacoes: { type: 'string',  example: 'Tomado às 08:15' },
        },
      },
      MedicamentoResposta: {
        type: 'object',
        properties: {
          mensagem:    { type: 'string' },
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
