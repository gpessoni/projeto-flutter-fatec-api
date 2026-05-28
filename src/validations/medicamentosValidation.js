const Joi = require('joi');

const criarSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    'string.min': 'nome deve ter pelo menos 2 caracteres',
    'string.max': 'nome deve ter no máximo 100 caracteres',
    'any.required': 'nome é obrigatório',
  }),
  dosagem: Joi.string().min(1).max(100).required().messages({
    'string.min': 'dosagem não pode ser vazia',
    'string.max': 'dosagem deve ter no máximo 100 caracteres',
    'any.required': 'dosagem é obrigatória',
  }),
  horario: Joi.string().min(1).max(50).required().messages({
    'string.min': 'horario não pode ser vazio',
    'string.max': 'horario deve ter no máximo 50 caracteres',
    'any.required': 'horario é obrigatório',
  }),
  tomado: Joi.boolean().default(false).messages({
    'boolean.base': 'tomado deve ser true ou false',
  }),
  observacoes: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'observacoes deve ter no máximo 1000 caracteres',
  }),
});

const atualizarSchema = Joi.object({
  nome: Joi.string().min(2).max(100).messages({
    'string.min': 'nome deve ter pelo menos 2 caracteres',
    'string.max': 'nome deve ter no máximo 100 caracteres',
  }),
  dosagem: Joi.string().min(1).max(100).messages({
    'string.max': 'dosagem deve ter no máximo 100 caracteres',
  }),
  horario: Joi.string().min(1).max(50).messages({
    'string.max': 'horario deve ter no máximo 50 caracteres',
  }),
  tomado: Joi.boolean().messages({
    'boolean.base': 'tomado deve ser true ou false',
  }),
  observacoes: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'observacoes deve ter no máximo 1000 caracteres',
  }),
}).min(1).messages({
  'object.min': 'Informe pelo menos um campo para atualizar',
});

module.exports = { criarSchema, atualizarSchema };
