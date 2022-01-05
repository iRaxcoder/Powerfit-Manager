DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_insert_ejercicio`(IN `p_nombre_ejercicio` VARCHAR(100), IN `p_grupo_muscular` VARCHAR(100))
BEGIN
SET @local_id_grupo_muscular := (SELECT ID_MUSCULAR FROM tb_grupo_muscular WHERE NOMBRE_GRUPO_MUSCULAR = p_grupo_muscular);

INSERT INTO tb_ejercicio(NOMBRE_EJERCICIO, ID_GRUPO_MUSCULAR) VALUES (p_nombre_ejercicio, @local_id_grupo_muscular);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_select_ejercicio`()
    NO SQL
SELECT 
    e.ID_EJERCICIO, 
    e.NOMBRE_EJERCICIO, 
	gm.NOMBRE_GRUPO_MUSCULAR 
        FROM tb_ejercicio e
			JOIN tb_grupo_muscular gm 
				ON gm.ID_MUSCULAR=e.ID_GRUPO_MUSCULAR$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_update_ejercicio`(IN `p_id` INT, IN `p_ejercicio` VARCHAR(100))
    NO SQL
UPDATE `tb_ejercicio` SET `NOMBRE_EJERCICIO`= p_ejercicio WHERE `ID_EJERCICIO` = p_id$$
DELIMITER ;
