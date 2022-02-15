ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
INSERT INTO `powerfit-manager`.`tb_usuario`
(`NOMBRE_USUARIO`,
`CONTRASENNA`)
VALUES
("powerfitmanager",
"pfm2022");