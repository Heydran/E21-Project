CREATE TABLE tUser(
	cod_usuario SERIAL PRIMARY KEY,
	nome_usuario VARCHAR(30),
	email_usuario VARCHAR(30),
	senha_usuario VARCHAR(60)
);

CREATE TABLE Renda (
    codRenda INTEGER PRIMARY KEY,
    val_renda FLOAT,
    data_renda DATE,
    tipo_renda INTEGER,
    desc_renda VARCHAR(300),
    data_final_renda DATE,
    situacao_renda BOOLEAN,
    cod_usuario INTEGER
	FOREIGN KEY (cod_usuario) REFERENCES Usuario(cod_usuario)
);

CREATE TABLE Despesa (
    cod_despesa INTEGER PRIMARY KEY,
	tipo_despesa INTEGER,
    val_despesa FLOAT,
    data_despesa DATE,
    data_final_despesa DATE,
    situacao_despesa BOOLEAN,
    desc_despesa VARCHAR(300),
    cod_usuario INTEGER,
    data_vencimento_despesa DATE,
    cod_usuario INTEGER
	FOREIGN KEY (cod_usuario) REFERENCES Usuario(cod_usuario)
);[]

