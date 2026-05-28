const Joi = require('joi');

const criarSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    'string.min': 'nome deve ter pelo menos 2 caracteres',
    'string.max': 'nome deve ter no máximo 100 caracteres',
    'any.required': 'nome é obrigatório',
  }),
  descricao: Joi.string().max(500).optional().allow('').messages({
    'string.max': 'descricao deve ter no máximo 500 caracteres',
  }),
  preco: Joi.number().min(0).required().messages({
    'number.min': 'preco deve ser maior ou igual a zero',
    'any.required': 'preco é obrigatório',
  }),
  quantidade_estoque: Joi.number().integer().min(0).default(0).messages({
    'number.integer': 'quantidade_estoque deve ser um número inteiro',
    'number.min': 'quantidade_estoque deve ser maior ou igual a zero',
  }),
  fabricante: Joi.string().max(100).optional().allow('').messages({
    'string.max': 'fabricante deve ter no máximo 100 caracteres',
  }),
});

const atualizarSchema = Joi.object({
  nome: Joi.string().min(2).max(100).messages({
    'string.min': 'nome deve ter pelo menos 2 caracteres',
    'string.max': 'nome deve ter no máximo 100 caracteres',
  }),
  descricao: Joi.string().max(500).optional().allow('').messages({
    'string.max': 'descricao deve ter no máximo 500 caracteres',
  }),
  preco: Joi.number().min(0).messages({
    'number.min': 'preco deve ser maior ou igual a zero',
  }),
  quantidade_estoque: Joi.number().integer().min(0).messages({
    'number.integer': 'quantidade_estoque deve ser um número inteiro',
    'number.min': 'quantidade_estoque deve ser maior ou igual a zero',
  }),
  fabricante: Joi.string().max(100).optional().allow('').messages({
    'string.max': 'fabricante deve ter no máximo 100 caracteres',
  }),
}).min(1).messages({
  'object.min': 'Informe pelo menos um campo para atualizar',
});

module.exports = { criarSchema, atualizarSchema };
