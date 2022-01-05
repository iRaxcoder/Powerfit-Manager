DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_iniciar_sesion`(IN `p_usuario` VARCHAR(100), IN `p_contrasenia` VARCHAR(100))
    NO SQL
SELECT U.NOMBRE_USUARIO FROM tb_usuario U WHERE U.NOMBRE_USUARIO=p_usuario AND U.CONTRASENNA=p_contrasenia$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_mostrar_usuarios`()
select u.NOMBRE_USUARIO, u.CONTRASENNA from tb_usuario u$$
DELIMITER ;
