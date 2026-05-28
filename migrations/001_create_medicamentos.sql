CREATE TABLE IF NOT EXISTS medicamentos (
  id              SERIAL PRIMARY KEY,
  nome            VARCHAR(100)    NOT NULL,
  descricao       TEXT,
  preco           NUMERIC(10, 2)  NOT NULL,
  quantidade_estoque INTEGER      NOT NULL DEFAULT 0,
  fabricante      VARCHAR(100),
  created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);
