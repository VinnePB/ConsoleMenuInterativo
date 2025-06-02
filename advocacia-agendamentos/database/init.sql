CREATE TABLE IF NOT EXISTS advogados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    especialidade TEXT,
    disponibilidade TEXT
);

CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    cpf TEXT,
    observacoes TEXT
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    advogado_id INTEGER,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    tipo TEXT,
    observacoes TEXT,
    status TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (advogado_id) REFERENCES advogados(id)
);