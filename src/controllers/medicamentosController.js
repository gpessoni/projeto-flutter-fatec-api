const pool = require('../config/database');
const { criarSchema, atualizarSchema } = require('../validations/medicamentosValidation');

const CAMPOS_SELECT = 'id, nome, dosagem, horario, tomado, observacoes, created_at';

async function listar(req, res) {
  try {
    const resultado = await pool.query(
      `SELECT ${CAMPOS_SELECT} FROM medicamentos ORDER BY id DESC`
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error('Erro ao listar medicamentos:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      `SELECT ${CAMPOS_SELECT} FROM medicamentos WHERE id = $1`,
      [id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Medicamento não encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error('Erro ao buscar medicamento:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function criar(req, res) {
  const { error, value } = criarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ erro: error.details.map((d) => d.message) });
  }
  try {
    const { nome, dosagem, horario, tomado, observacoes } = value;
    const resultado = await pool.query(
      `INSERT INTO medicamentos (nome, dosagem, horario, tomado, observacoes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ${CAMPOS_SELECT}`,
      [nome, dosagem, horario, tomado ?? false, observacoes || null]
    );
    res.status(201).json({ mensagem: 'Medicamento registrado com sucesso', medicamento: resultado.rows[0] });
  } catch (erro) {
    console.error('Erro ao criar medicamento:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function atualizar(req, res) {
  const { error, value } = atualizarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ erro: error.details.map((d) => d.message) });
  }
  try {
    const { id } = req.params;
    const campos = Object.keys(value);
    const valores = Object.values(value);
    const sets = campos.map((campo, i) => `${campo} = $${i + 1}`).join(', ');

    const resultado = await pool.query(
      `UPDATE medicamentos SET ${sets} WHERE id = $${campos.length + 1}
       RETURNING ${CAMPOS_SELECT}`,
      [...valores, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Medicamento não encontrado' });
    }
    res.json({ mensagem: 'Medicamento atualizado com sucesso', medicamento: resultado.rows[0] });
  } catch (erro) {
    console.error('Erro ao atualizar medicamento:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      'DELETE FROM medicamentos WHERE id = $1 RETURNING id',
      [id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Medicamento não encontrado' });
    }
    res.json({ mensagem: 'Medicamento removido com sucesso' });
  } catch (erro) {
    console.error('Erro ao deletar medicamento:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
