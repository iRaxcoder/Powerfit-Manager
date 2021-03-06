CREATE TABLE tb_USUARIO
(
	ID_USUARIO INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	NOMBRE_USUARIO VARCHAR(32) NOT NULL,
	CONTRASENNA VARCHAR(32) NOT NULL
);

CREATE TABLE tb_CLIENTE	
(
	ID_CLIENTE INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NOMBRE_CLIENTE VARCHAR(32) NOT NULL,
	APELLIDOS VARCHAR(32) NOT NULL,
	EDAD INT NOT NULL,
	TELEFONO VARCHAR(32) NOT NULL,
	EMAIL VARCHAR(32) NOT NULL,
	ENFERMEDAD VARCHAR(300) NULL,
	IS_DELETED BIT DEFAULT 0 NULL
);

CREATE TABLE tb_MEMBRESIA
(
	ID_MEMBRESIA INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	ID_CLIENTE INT NOT NULL,
	FECHA_INICIO DATE NOT NULL,
	FECHA_FIN DATE NOT NULL,
	TIPO_PAGO VARCHAR(100) NOT NULL,
	MONTO DOUBLE NOT NULL,
	DETALLE VARCHAR(300) NOT NULL,
	CONSTRAINT fk_id_cliente_pago FOREIGN KEY (ID_CLIENTE) REFERENCES  tb_CLIENTE(ID_CLIENTE)
);

CREATE TABLE tb_DATOS_CLIENTE
(
	ID_DATOS INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	PESO VARCHAR(32) NULL,
	ALTURA VARCHAR(32) NULL,
	GRASA_CORPORAL VARCHAR(32)NULL,
	AGUA_CORPORAL VARCHAR(32) NULL,
	MASA_MUSCULAR VARCHAR(32) NULL,
	VALORACION_FISICA VARCHAR(32) NULL,
	METABOLISMO_BASAL VARCHAR(32)NULL,
	EDAD_METABOLICA VARCHAR(32) NULL,
	MASA_OSEA VARCHAR(32)NULL,
	GRASA_VISCERAL VARCHAR(32)NULL
);

CREATE TABLE tb_CIRCUNFERENCIA_CLIENTE
(
	ID_CIRCUNFERENCIA INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	BRAZO_DERECHO VARCHAR(32)NULL,
	BRAZO_IZQUIERDO VARCHAR(32) NULL,
	PECHO VARCHAR(32) NULL,
	ABDOMEN VARCHAR(32) NULL,
	CADERA VARCHAR(32) NULL,
	MUSLO_DERECHO VARCHAR(32) NULL,
	MUSLO_IZQUIERDO VARCHAR(32) NULL,
	PIERNA_DERECHA VARCHAR(32) NULL,
	PIERNA_IZQUIERDA VARCHAR(32) NULL
);

CREATE TABLE tb_MEDICION_CLIENTE
(
	ID_MEDICION INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	ID_DATOS INT NOT NULL,
	ID_CIRCUNFERENCIA INT NOT NULL,
	ID_CLIENTE INT NOT NULL,
	FECHA DATETIME NOT NULL, 
	CONSTRAINT fk_id_medicion_cliente FOREIGN KEY (ID_CLIENTE) REFERENCES  tb_CLIENTE(ID_CLIENTE),
	CONSTRAINT fk_id_medicion_datos FOREIGN KEY (ID_DATOS) REFERENCES  tb_DATOS_CLIENTE(ID_DATOS),
 	CONSTRAINT fk_id_medicion_circunferencia FOREIGN KEY (ID_CIRCUNFERENCIA ) REFERENCES tb_CIRCUNFERENCIA_CLIENTE(ID_CIRCUNFERENCIA )
);

CREATE TABLE tb_RUTINA
(
	ID_RUTINA INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	ID_CLIENTE INT NOT NULL,
	FECHA DATETIME NOT NULL,
	NIVEL VARCHAR(32) NULL,
	TIPO VARCHAR(32) NULL,
	OBJETIVO VARCHAR(32) NULL,
	PORCENTAJE VARCHAR(32) NULL,
	PAUSA VARCHAR(32) NULL
);

CREATE TABLE tb_RUTINA_EJERCICIO
(
	ID_RUTINA INT  AUTO_INCREMENT NOT NULL,
	ID_EJERCICIO INT NOT NULL,
	INDICACIONES VARCHAR(300) NULL,
	DIA INT NOT NULL,
	CONSTRAINT fk_id_rutina FOREIGN KEY (ID_RUTINA) REFERENCES tb_RUTINA(ID_RUTINA)
);

CREATE TABLE tb_GRUPO_MUSCULAR
(
	ID_MUSCULAR INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NOMBRE_GRUPO_MUSCULAR VARCHAR(100) NOT NULL,
	IS_DELETED BIT DEFAULT 0 NOT NULL
);

CREATE TABLE tb_EJERCICIO
(
	ID_EJERCICIO INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NOMBRE_EJERCICIO VARCHAR(100) NOT NULL,
	ID_GRUPO_MUSCULAR INT NOT NULL,
	CONSTRAINT fk_id_grupo_ejercicio FOREIGN KEY (ID_GRUPO_MUSCULAR) REFERENCES tb_GRUPO_MUSCULAR(ID_MUSCULAR),
	IS_DELETED BIT DEFAULT 0 NOT NULL
);

CREATE TABLE tb_PRODUCTO
(
	ID_PRODUCTO INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	NOMBRE VARCHAR(200),
	STOCK INT NOT NULL,
	PRECIO_UNITARIO INT,
	ULT_INGRESO DATE,
	DETALLES VARCHAR(300),
	IS_DELETED BIT DEFAULT 0 NOT NULL
);

CREATE TABLE tb_asistencia
(
	ID_ASISTENCIA INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	ID_CLIENTE INT NOT NULL,
	FECHA datetime NOT NULL,
	CONSTRAINT fk_id_cliente_asistencia FOREIGN KEY (ID_CLIENTE) REFERENCES tb_cliente (ID_CLIENTE)	
);

CREATE TABLE tb_VENTA
(
ID_VENTA INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
ID_CLIENTE INT,
TOTAL INT,
FECHA DATE,
CONSTRAINT fk_id_cliente_venta FOREIGN KEY (ID_CLIENTE) REFERENCES tb_cliente (ID_CLIENTE)	
);

CREATE TABLE tb_venta_producto
(
ID_VENTA INT,
ID_PRODUCTO INT,
CANTIDAD INT,
SUBTOTAL INT,
CONSTRAINT pk_venta_producto PRIMARY KEY (ID_VENTA, ID_PRODUCTO),
CONSTRAINT fk_id_venta_venta FOREIGN KEY (ID_VENTA) REFERENCES tb_VENTA (ID_VENTA),
CONSTRAINT fk_id_venta_producto FOREIGN KEY (ID_PRODUCTO) REFERENCES tb_PRODUCTO (ID_PRODUCTO)
);