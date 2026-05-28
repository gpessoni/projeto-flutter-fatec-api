DROP TABLE IF EXISTS medicamentos;

CREATE TABLE medicamentos (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  dosagem     VARCHAR(100) NOT NULL,
  horario     VARCHAR(50)  NOT NULL,
  tomado      BOOLEAN      NOT NULL DEFAULT FALSE,
  observacoes TEXT,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
