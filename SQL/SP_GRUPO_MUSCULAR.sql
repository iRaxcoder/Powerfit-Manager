DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_update_grupo_muscular`(IN `p_id` INT(4), IN `p_musculo` VARCHAR(100))
    NO SQL
UPDATE `tb_grupo_muscular` SET `NOMBRE_GRUPO_MUSCULAR`= p_musculo WHERE  `ID_MUSCULAR` = p_id$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_insert_grupo_muscular`(IN `p_musculo` VARCHAR(100))
    NO SQL
INSERT INTO `tb_grupo_muscular`(`NOMBRE_GRUPO_MUSCULAR`) VALUES (p_musculo)$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`laboratorios`@`%` PROCEDURE `sp_select_grupo_muscular`()
    NO SQL
SELECT * FROM `tb_grupo_muscular`$$
DELIMITER ;
