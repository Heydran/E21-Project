CREATE TABLE User(
	cod_user SERIAL PRIMARY KEY,
	name_user VARCHAR(30),
	email_user VARCHAR(30) UNIQUE,
	pass_user VARCHAR(60)
);

CREATE TABLE Renda (
    cod_renda SERIAL PRIMARY KEY,
    val_renda FLOAT,
    data_renda DATE,
    tipo_renda INTEGER,
    desc_renda VARCHAR(300),
    data_final_renda DATE,
    situacao_renda BOOLEAN,
    cod_usuario INTEGER,
	FOREIGN KEY (cod_usuario) REFERENCES Usuario(cod_usuario)
);

CREATE TABLE Despesa (
    cod_despesa SERIAL PRIMARY KEY,
	tipo_despesa INTEGER,
    val_despesa FLOAT,
    data_despesa DATE,
    data_final_despesa DATE,
    situacao_despesa BOOLEAN,
    desc_despesa VARCHAR(300),
    cod_usuario INTEGER,
    data_vencimento_despesa DATE,
	FOREIGN KEY (cod_usuario) REFERENCES Usuario(cod_usuario)
);

