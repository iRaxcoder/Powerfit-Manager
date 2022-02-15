CREATE DATABASE  IF NOT EXISTS `powerfit-manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `powerfit-manager`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: powerfit-manager
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_asistencia`
--

DROP TABLE IF EXISTS `tb_asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_asistencia` (
  `ID_ASISTENCIA` int NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int NOT NULL,
  `FECHA` datetime NOT NULL,
  PRIMARY KEY (`ID_ASISTENCIA`),
  KEY `fk_id_cliente_asistencia` (`ID_CLIENTE`),
  CONSTRAINT `fk_id_cliente_asistencia` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tb_cliente` (`ID_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_asistencia`
--

LOCK TABLES `tb_asistencia` WRITE;
/*!40000 ALTER TABLE `tb_asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_circunferencia_cliente`
--

DROP TABLE IF EXISTS `tb_circunferencia_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_circunferencia_cliente` (
  `ID_CIRCUNFERENCIA` int NOT NULL AUTO_INCREMENT,
  `BRAZO_DERECHO` varchar(32) DEFAULT NULL,
  `BRAZO_IZQUIERDO` varchar(32) DEFAULT NULL,
  `PECHO` varchar(32) DEFAULT NULL,
  `ABDOMEN` varchar(32) DEFAULT NULL,
  `CADERA` varchar(32) DEFAULT NULL,
  `MUSLO_DERECHO` varchar(32) DEFAULT NULL,
  `MUSLO_IZQUIERDO` varchar(32) DEFAULT NULL,
  `PIERNA_DERECHO` varchar(32) DEFAULT NULL,
  `PIERNA_IZQUIERDA` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID_CIRCUNFERENCIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_circunferencia_cliente`
--

LOCK TABLES `tb_circunferencia_cliente` WRITE;
/*!40000 ALTER TABLE `tb_circunferencia_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_circunferencia_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cliente`
--

DROP TABLE IF EXISTS `tb_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cliente` (
  `ID_CLIENTE` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_CLIENTE` varchar(32) NOT NULL,
  `APELLIDOS` varchar(32) NOT NULL,
  `EDAD` int NOT NULL,
  `TELEFONO` varchar(32) NOT NULL,
  `EMAIL` varchar(32) NOT NULL,
  `ENFERMEDAD` varchar(300) DEFAULT NULL,
  `IS_DELETED` bit(1) DEFAULT b'0',
  PRIMARY KEY (`ID_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cliente`
--

LOCK TABLES `tb_cliente` WRITE;
/*!40000 ALTER TABLE `tb_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_datos_cliente`
--

DROP TABLE IF EXISTS `tb_datos_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_datos_cliente` (
  `ID_DATOS` int NOT NULL AUTO_INCREMENT,
  `PESO` varchar(32) DEFAULT NULL,
  `ALTURA` varchar(32) DEFAULT NULL,
  `GRASA_CORPORAL` varchar(32) DEFAULT NULL,
  `AGUA_CORPORAL` varchar(32) DEFAULT NULL,
  `MASA_MUSCULAR` varchar(32) DEFAULT NULL,
  `VALORACION_FISICA` varchar(32) DEFAULT NULL,
  `METABOLISMO_BASAL` varchar(32) DEFAULT NULL,
  `EDAD_METABOLICA` varchar(32) DEFAULT NULL,
  `MASA_OSEA` varchar(32) DEFAULT NULL,
  `GRASA_VISCERAL` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID_DATOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_datos_cliente`
--

LOCK TABLES `tb_datos_cliente` WRITE;
/*!40000 ALTER TABLE `tb_datos_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_datos_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_ejercicio`
--

DROP TABLE IF EXISTS `tb_ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_ejercicio` (
  `ID_EJERCICIO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_EJERCICIO` varchar(100) NOT NULL,
  `ID_GRUPO_MUSCULAR` int NOT NULL,
  `IS_DELETED` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID_EJERCICIO`),
  KEY `fk_id_grupo_ejercicio` (`ID_GRUPO_MUSCULAR`),
  CONSTRAINT `fk_id_grupo_ejercicio` FOREIGN KEY (`ID_GRUPO_MUSCULAR`) REFERENCES `tb_grupo_muscular` (`ID_MUSCULAR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_ejercicio`
--

LOCK TABLES `tb_ejercicio` WRITE;
/*!40000 ALTER TABLE `tb_ejercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_grupo_muscular`
--

DROP TABLE IF EXISTS `tb_grupo_muscular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_grupo_muscular` (
  `ID_MUSCULAR` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_GRUPO_MUSCULAR` varchar(100) NOT NULL,
  `IS_DELETED` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID_MUSCULAR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_grupo_muscular`
--

LOCK TABLES `tb_grupo_muscular` WRITE;
/*!40000 ALTER TABLE `tb_grupo_muscular` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_grupo_muscular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_medicion_cliente`
--

DROP TABLE IF EXISTS `tb_medicion_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_medicion_cliente` (
  `ID_MEDICION` int NOT NULL AUTO_INCREMENT,
  `ID_DATOS` int NOT NULL,
  `ID_CIRCUNFERENCIA` int NOT NULL,
  `ID_CLIENTE` int NOT NULL,
  `FECHA` datetime NOT NULL,
  PRIMARY KEY (`ID_MEDICION`),
  KEY `fk_id_medicion_cliente` (`ID_CLIENTE`),
  KEY `fk_id_medicion_datos` (`ID_DATOS`),
  KEY `fk_id_medicion_circunferencia` (`ID_CIRCUNFERENCIA`),
  CONSTRAINT `fk_id_medicion_circunferencia` FOREIGN KEY (`ID_CIRCUNFERENCIA`) REFERENCES `tb_circunferencia_cliente` (`ID_CIRCUNFERENCIA`),
  CONSTRAINT `fk_id_medicion_cliente` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tb_cliente` (`ID_CLIENTE`),
  CONSTRAINT `fk_id_medicion_datos` FOREIGN KEY (`ID_DATOS`) REFERENCES `tb_datos_cliente` (`ID_DATOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_medicion_cliente`
--

LOCK TABLES `tb_medicion_cliente` WRITE;
/*!40000 ALTER TABLE `tb_medicion_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_medicion_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_membresia`
--

DROP TABLE IF EXISTS `tb_membresia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_membresia` (
  `ID_MEMBRESIA` int NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int NOT NULL,
  `FECHA_INICIO` date NOT NULL,
  `FECHA_FIN` date NOT NULL,
  `TIPO_PAGO` varchar(100) NOT NULL,
  `MONTO` double NOT NULL,
  `DETALLE` varchar(300) NOT NULL,
  PRIMARY KEY (`ID_MEMBRESIA`),
  KEY `fk_id_cliente_pago` (`ID_CLIENTE`),
  CONSTRAINT `fk_id_cliente_pago` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tb_cliente` (`ID_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_membresia`
--

LOCK TABLES `tb_membresia` WRITE;
/*!40000 ALTER TABLE `tb_membresia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_membresia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_producto`
--

DROP TABLE IF EXISTS `tb_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_producto` (
  `ID_PRODUCTO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(200) DEFAULT NULL,
  `STOCK` int NOT NULL,
  `PRECIO_UNITARIO` int DEFAULT NULL,
  `ULT_INGRESO` date DEFAULT NULL,
  `DETALLES` varchar(300) DEFAULT NULL,
  `IS_DELETED` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID_PRODUCTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_producto`
--

LOCK TABLES `tb_producto` WRITE;
/*!40000 ALTER TABLE `tb_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rutina`
--

DROP TABLE IF EXISTS `tb_rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_rutina` (
  `ID_RUTINA` int NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int NOT NULL,
  `FECHA` datetime NOT NULL,
  `NIVEL` varchar(32) DEFAULT NULL,
  `TIPO` varchar(32) DEFAULT NULL,
  `OBJETIVO` varchar(32) DEFAULT NULL,
  `PORCENTAJE` varchar(32) DEFAULT NULL,
  `PAUSA` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID_RUTINA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rutina`
--

LOCK TABLES `tb_rutina` WRITE;
/*!40000 ALTER TABLE `tb_rutina` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rutina_ejercicio`
--

DROP TABLE IF EXISTS `tb_rutina_ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_rutina_ejercicio` (
  `ID_RUTINA` int NOT NULL AUTO_INCREMENT,
  `ID_EJERCICIO` int NOT NULL,
  `INDICACIONES` varchar(300) DEFAULT NULL,
  `DIA` int NOT NULL,
  KEY `fk_id_rutina` (`ID_RUTINA`),
  CONSTRAINT `fk_id_rutina` FOREIGN KEY (`ID_RUTINA`) REFERENCES `tb_rutina` (`ID_RUTINA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rutina_ejercicio`
--

LOCK TABLES `tb_rutina_ejercicio` WRITE;
/*!40000 ALTER TABLE `tb_rutina_ejercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_rutina_ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_USUARIO` varchar(32) NOT NULL,
  `CONTRASENNA` varchar(32) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_venta`
--

DROP TABLE IF EXISTS `tb_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_venta` (
  `ID_VENTA` int NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int DEFAULT NULL,
  `TOTAL` int DEFAULT NULL,
  `FECHA` date DEFAULT NULL,
  PRIMARY KEY (`ID_VENTA`),
  KEY `fk_id_cliente_venta` (`ID_CLIENTE`),
  CONSTRAINT `fk_id_cliente_venta` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `tb_cliente` (`ID_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_venta`
--

LOCK TABLES `tb_venta` WRITE;
/*!40000 ALTER TABLE `tb_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_venta_producto`
--

DROP TABLE IF EXISTS `tb_venta_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_venta_producto` (
  `ID_VENTA` int NOT NULL,
  `ID_PRODUCTO` int NOT NULL,
  `CANTIDAD` int DEFAULT NULL,
  `SUBTOTAL` int DEFAULT NULL,
  PRIMARY KEY (`ID_VENTA`,`ID_PRODUCTO`),
  KEY `fk_id_venta_producto` (`ID_PRODUCTO`),
  CONSTRAINT `fk_id_venta_producto` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `tb_producto` (`ID_PRODUCTO`),
  CONSTRAINT `fk_id_venta_venta` FOREIGN KEY (`ID_VENTA`) REFERENCES `tb_venta` (`ID_VENTA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_venta_producto`
--

LOCK TABLES `tb_venta_producto` WRITE;
/*!40000 ALTER TABLE `tb_venta_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_venta_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'powerfit-manager'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_asistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_asistencia`(IN `p_id` INT)
BEGIN
DELETE FROM `tb_asistencia` WHERE ID_ASISTENCIA = p_id;
SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_cliente`(IN `p_id` INT(10))
BEGIN

UPDATE tb_cliente SET IS_DELETED=1 WHERE ID_CLIENTE= p_id;

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_ejercicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_ejercicio`(IN `id_ejercicio` BIT(10))
BEGIN
UPDATE tb_ejercicio e SET e.IS_DELETED=1 WHERE e.ID_EJERCICIO=id_ejercicio;

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_grupo_muscular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_grupo_muscular`(IN `p_id` INT(100))
BEGIN
UPDATE `tb_grupo_muscular` SET `IS_DELETED`= 1 WHERE  `ID_MUSCULAR` = p_id;

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_medidas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_medidas`(IN `p_id_medicion` INT, IN `p_id_datos` INT, IN `p_id_circnferencia` INT)
BEGIN
DELETE FROM `tb_medicion_cliente` 
WHERE ID_MEDICION=p_id_medicion;
DELETE FROM `tb_datos_cliente` 
WHERE ID_DATOS=p_id_datos;
DELETE FROM `tb_circunferencia_cliente`
WHERE ID_CIRCUNFERENCIA=p_id_circnferencia;
SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_membresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_membresia`(IN `p_id` INT)
BEGIN

DELETE FROM `tb_membresia` WHERE  `ID_MEMBRESIA`= p_id;

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_producto`(IN `p_id` INT(10))
BEGIN

UPDATE tb_producto
SET IS_DELETED=1 
WHERE ID_PRODUCTO=p_id;

SELECT 1 AS msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_rutina` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_rutina`(IN `p_id` VARCHAR(10))
BEGIN

DELETE FROM tb_rutina_ejercicio where ID_RUTINA=p_id;
DELETE FROM tb_rutina where ID_RUTINA=p_id;
SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_venta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_venta`(IN `p_id` INT(10))
BEGIN
DELETE FROM tb_venta_producto WHERE ID_VENTA=p_id;
DELETE FROM tb_venta WHERE ID_VENTA=p_id;
SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_iniciar_sesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_iniciar_sesion`(IN `p_usuario` VARCHAR(100), IN `p_contrasenia` VARCHAR(100))
SELECT U.NOMBRE_USUARIO FROM tb_usuario U WHERE U.NOMBRE_USUARIO=p_usuario AND U.CONTRASENNA=p_contrasenia ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_asistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_asistencia`(IN `p_fecha` TEXT, IN `p_id_cliente` INT)
BEGIN

INSERT INTO tb_asistencia (ID_CLIENTE, FECHA)
VALUES (p_id_cliente, p_fecha);

SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_cliente`(IN `p_nombre` VARCHAR(100), IN `p_apellidos` VARCHAR(100), IN `p_edad` VARCHAR(10), IN `p_telefono` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_enfermedad` VARCHAR(100))
BEGIN

INSERT INTO tb_cliente (NOMBRE_CLIENTE, APELLIDOS, EDAD, TELEFONO, EMAIL, ENFERMEDAD) VALUES
(
p_nombre,
p_apellidos,
p_edad,
p_telefono,
p_email,
p_enfermedad
);

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_cliente_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_cliente_producto`(IN `p_venta` INT(10), IN `p_producto` INT(10), IN `p_cantidad` VARCHAR(100), IN `p_subtotal` INT(100))
BEGIN

INSERT INTO tb_venta_producto (ID_VENTA,ID_PRODUCTO,CANTIDAD,SUBTOTAL)
VALUES
(p_venta,p_producto,p_cantidad,p_subtotal);
SELECT 1 AS msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_ejercicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_ejercicio`(IN `p_nombre_ejercicio` VARCHAR(100), IN `p_grupo_muscular` VARCHAR(100))
BEGIN
SET @local_id_grupo_muscular := (SELECT ID_MUSCULAR FROM tb_grupo_muscular WHERE NOMBRE_GRUPO_MUSCULAR = p_grupo_muscular AND IS_DELETED=0);

IF (@local_id_grupo_muscular IS NOT NULL)
	THEN 
		INSERT INTO tb_ejercicio(NOMBRE_EJERCICIO, ID_GRUPO_MUSCULAR) VALUES (p_nombre_ejercicio, @local_id_grupo_muscular);
		SELECT 1 as msg;
    ELSE
    SELECT -1 as msg;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_grupo_muscular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_grupo_muscular`(IN `p_musculo` VARCHAR(100))
BEGIN
INSERT INTO tb_grupo_muscular(NOMBRE_GRUPO_MUSCULAR) VALUES (p_musculo);

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_medidas_circunferencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_medidas_circunferencia`(IN `p_bd` VARCHAR(32), IN `p_bi` VARCHAR(32), IN `p_pecho` VARCHAR(32), IN `p_abd` VARCHAR(32), IN `p_cadera` VARCHAR(32), IN `p_md` VARCHAR(32), IN `p_mi` VARCHAR(32), IN `p_pd` VARCHAR(32), IN `p_pi` VARCHAR(32))
BEGIN
INSERT INTO `tb_circunferencia_cliente`(`BRAZO_DERECHO`, `BRAZO_IZQUIERDO`, `PECHO`, `ABDOMEN`, `CADERA`, `MUSLO_DERECHO`, `MUSLO_IZQUIERDO`, `PIERNA_DERECHA`, `PIERNA_IZQUIERDA`)
VALUES (p_bd,p_bi,p_pecho,p_abd,p_cadera,p_md,p_mi,p_pd,p_pi);
SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_medidas_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_medidas_cliente`(IN `p_id_cliente` INT)
BEGIN

INSERT INTO `tb_medicion_cliente`(`ID_DATOS`, `ID_CIRCUNFERENCIA`, `ID_CLIENTE`, `FECHA`) 
VALUES ((SELECT MAX(ID_DATOS) AS ID_DATOS 
         FROM tb_datos_cliente),
        (SELECT MAX(ID_CIRCUNFERENCIA) AS ID_CIRCUNFERENCIA
        FROM tb_circunferencia_cliente),
        p_id_cliente,CURDATE());

SELECT 1 AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_medidas_datos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_medidas_datos`(IN `p_peso` VARCHAR(32), IN `p_altura` VARCHAR(32), IN `p_grasa_corporal` VARCHAR(32), IN `p_agua_corporal` VARCHAR(32), IN `p_masa_muscular` VARCHAR(32), IN `p_valora_fisica` VARCHAR(32), IN `p_metab_basal` VARCHAR(32), IN `p_edad_metab` VARCHAR(32), IN `p_masa_osea` VARCHAR(32), IN `p_grasa_visceral` VARCHAR(32))
BEGIN

INSERT INTO `tb_datos_cliente`(`PESO`, `ALTURA`, `GRASA_CORPORAL`, `AGUA_CORPORAL`, `MASA_MUSCULAR`, `VALORACION_FISICA`, `METABOLISMO_BASAL`, `EDAD_METABOLICA`, `MASA_OSEA`, `GRASA_VISCERAL`) VALUES (p_peso,p_altura,p_grasa_corporal,p_agua_corporal,p_masa_muscular,
p_valora_fisica,p_metab_basal,p_edad_metab,p_masa_osea,
p_grasa_visceral);

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_membresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_membresia`(IN `p_fecha_inicio` DATE, IN `p_fecha_fin` DATE, IN `p_tipo_pago` VARCHAR(100), IN `p_monto` DOUBLE, IN `p_detalle` VARCHAR(100), IN `p_id_cliente` INT)
BEGIN
INSERT INTO `tb_membresia`(`ID_CLIENTE`, `FECHA_INICIO`,`FECHA_FIN`, `TIPO_PAGO`, `MONTO`, `DETALLE`) VALUES (p_id_cliente, p_fecha_inicio,p_fecha_fin, p_tipo_pago, p_monto, p_detalle);
SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_producto`(IN `p_nombre` VARCHAR(200), IN `p_stock` VARCHAR(10), IN `p_precio` INT(100), IN `p_ingreso` DATE, IN `p_detalles` VARCHAR(300))
BEGIN

INSERT INTO tb_producto (NOMBRE,STOCK,PRECIO_UNITARIO,ULT_INGRESO,DETALLES) VALUES 
(p_nombre, p_stock,p_precio,p_ingreso,p_detalles);

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_rutina` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_rutina`(IN `p_id_cliente` INT(10), IN `p_nivel` VARCHAR(100), IN `p_tipo` VARCHAR(100), IN `p_objetivo` VARCHAR(100), IN `p_porcentaje` VARCHAR(10), IN `p_pausa` VARCHAR(10))
BEGIN

INSERT INTO tb_rutina (ID_CLIENTE,FECHA,NIVEL,TIPO,OBJETIVO,PORCENTAJE,PAUSA)
VALUES (p_id_cliente,NOW(),p_nivel,p_tipo,p_objetivo,p_porcentaje,p_pausa);

SELECT MAX(ID_RUTINA) as ID_RUTINA from tb_rutina;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_venta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_venta`(IN `p_cliente` INT(100), IN `p_total` INT(100))
BEGIN

INSERT INTO tb_venta (ID_CLIENTE, TOTAL, FECHA)
VALUES
(p_cliente,p_total,CURDATE());
SELECT MAX(ID_VENTA) AS ID_VENTA from tb_venta;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mostrar_usuarios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mostrar_usuarios`()
select u.NOMBRE_USUARIO, u.CONTRASENNA from tb_usuario u ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_cliente`()
SELECT 
c.ID_CLIENTE,
c.NOMBRE_CLIENTE,
c.APELLIDOS,
c.EDAD,
c.EMAIL,
c.ENFERMEDAD,
c.TELEFONO
FROM tb_cliente c
WHERE c.IS_DELETED=0
ORDER BY (c.ID_CLIENTE) DESC ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_ejercicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_ejercicio`()
BEGIN
SELECT 
    e.ID_EJERCICIO, 
    e.NOMBRE_EJERCICIO, 
	gm.NOMBRE_GRUPO_MUSCULAR 
        FROM tb_ejercicio e
			JOIN tb_grupo_muscular gm 
				ON gm.ID_MUSCULAR=e.ID_GRUPO_MUSCULAR
                	WHERE e.IS_DELETED='0'
                	ORDER BY e.ID_EJERCICIO DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_grupo_muscular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_grupo_muscular`()
SELECT ID_MUSCULAR,NOMBRE_GRUPO_MUSCULAR
FROM `tb_grupo_muscular` WHERE IS_DELETED = 0 ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_medicion_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_medicion_cliente`()
BEGIN
SELECT mc.ID_MEDICION, mc.ID_DATOS,
mc.ID_CIRCUNFERENCIA, c.NOMBRE_CLIENTE, 
c.APELLIDOS AS APELLIDO_CLIENTE, mc.FECHA 
FROM tb_medicion_cliente mc
JOIN tb_cliente c 
	ON mc.ID_CLIENTE = c.ID_CLIENTE
ORDER BY (mc.ID_MEDICION) DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_medida_cliente_completo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_medida_cliente_completo`(IN `p_id` INT)
BEGIN

SELECT
m.ID_MEDICION,
c.NOMBRE_CLIENTE,
c.APELLIDOS AS APELLIDO_CLIENTE,
c.EDAD,
m.FECHA,
d.ID_DATOS,
d.PESO,
d.ALTURA,
d.GRASA_CORPORAL,
d.AGUA_CORPORAL,
d.MASA_MUSCULAR,
d.VALORACION_FISICA,
d.METABOLISMO_BASAL,
d.EDAD_METABOLICA,
d.MASA_OSEA,
d.GRASA_VISCERAL,
cc.ID_CIRCUNFERENCIA,
cc.BRAZO_DERECHO,
cc.BRAZO_IZQUIERDO,
cc.PECHO,
cc.ABDOMEN,
cc.CADERA,
cc.MUSLO_DERECHO,
cc.MUSLO_IZQUIERDO,
cc.PIERNA_DERECHA,
cc.PIERNA_IZQUIERDA
FROM tb_medicion_cliente m
JOIN tb_datos_cliente d 
	ON m.ID_DATOS = d.ID_DATOS
    JOIN tb_circunferencia_cliente cc 
    	ON cc.ID_CIRCUNFERENCIA = m.ID_CIRCUNFERENCIA
        JOIN tb_cliente c 
        	ON c.ID_CLIENTE = m.ID_CLIENTE
WHERE m.ID_MEDICION= p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_membresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_membresia`()
BEGIN

SELECT m.ID_MEMBRESIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS APELLIDO_CLIENTE, m.FECHA_INICIO,m.FECHA_FIN, m.TIPO_PAGO, m.MONTO, m.DETALLE, (SELECT IF(m.FECHA_FIN>=CURDATE(),"ACTIVO","SUSPENDIDO") )  AS ESTADO
FROM `tb_membresia` m
JOIN `tb_cliente` c 
	on m.ID_CLIENTE = c.ID_CLIENTE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_producto`()
SELECT p.ID_PRODUCTO, p.NOMBRE, p.STOCK, p.PRECIO_UNITARIO, p.ULT_INGRESO, p.DETALLES FROM tb_producto p 
WHERE p.IS_DELETED=0
ORDER BY (p.ID_PRODUCTO) DESC ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_rutina` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_rutina`()
BEGIN

SELECT r.ID_RUTINA,CONCAT(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) as NOMBRE_CLIENTE, MAX(r.FECHA) as FECHA, c.ID_CLIENTE from tb_rutina r
JOIN tb_cliente c
on c.ID_CLIENTE=r.ID_CLIENTE
GROUP BY r.ID_CLIENTE
ORDER BY r.ID_RUTINA DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_asistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_asistencia`(IN `p_buscar` VARCHAR(100))
BEGIN

SELECT a.ID_ASISTENCIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS APELLIDO_CLIENTE, a.FECHA
FROM `tb_asistencia` a
JOIN `tb_cliente` c 
	on a.ID_CLIENTE = c.ID_CLIENTE
WHERE (c.NOMBRE_CLIENTE=p_buscar OR c.APELLIDOS=p_buscar OR a.FECHA=p_buscar OR  C.NOMBRE_CLIENTE LIKE concat(p_buscar,'%')
OR c.APELLIDOS LIKE concat(p_buscar,'%') OR  
a.FECHA LIKE concat('%',p_buscar,'%'));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_asistencia_filtro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_asistencia_filtro`(IN `p_filtro` VARCHAR(100))
BEGIN
IF(p_filtro='Ayer')
    THEN
        SELECT a.ID_ASISTENCIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS                APELLIDO_CLIENTE, a.FECHA
        FROM `tb_asistencia` a
        JOIN `tb_cliente` c 
            on a.ID_CLIENTE = c.ID_CLIENTE
      WHERE DATE(a.FECHA) = ( SUBDATE(CURDATE(),1)); 
ELSEIF(p_filtro='Hoy')
    THEN
     SELECT a.ID_ASISTENCIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS               APELLIDO_CLIENTE, a.FECHA
        FROM `tb_asistencia` a
        JOIN `tb_cliente` c 
            on a.ID_CLIENTE = c.ID_CLIENTE
        WHERE DATE(a.FECHA)=CURDATE();
ELSEIF(p_filtro='Todas las Semanas')
THEN
SELECT a.ID_ASISTENCIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS                APELLIDO_CLIENTE,a.FECHA
        FROM `tb_asistencia` a
        JOIN `tb_cliente` c 
            on a.ID_CLIENTE = c.ID_CLIENTE
        ORDER BY a.FECHA DESC;  
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_cliente`(IN `p_buscar` VARCHAR(100))
BEGIN
	SELECT c.ID_CLIENTE,c.NOMBRE_CLIENTE,c.APELLIDOS, c.EDAD, c.TELEFONO, c.EMAIL, c.ENFERMEDAD
FROM tb_cliente c
WHERE (c.IS_DELETED=0 AND c.IS_DELETED=0) AND(c.NOMBRE_CLIENTE=p_buscar OR c.APELLIDOS=p_buscar OR C.EDAD=p_buscar OR c.TELEFONO= p_buscar OR c.EMAIL=p_buscar OR c.ENFERMEDAD=p_buscar OR C.NOMBRE_CLIENTE LIKE concat(p_buscar,'%') OR c.APELLIDOS LIKE concat(p_buscar,'%') OR C.EDAD LIKE concat(p_buscar,'%') OR C.TELEFONO LIKE concat(p_buscar,'%') OR C.EMAIL LIKE concat(p_buscar,'%') OR C.ENFERMEDAD LIKE concat(p_buscar,'%'));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_ejercicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_ejercicio`(IN `p_buscar` VARCHAR(100))
BEGIN
	SELECT E.NOMBRE_EJERCICIO,E.ID_EJERCICIO,G.NOMBRE_GRUPO_MUSCULAR 
FROM tb_ejercicio E 
JOIN tb_grupo_muscular G ON g.ID_MUSCULAR=e.ID_GRUPO_MUSCULAR 
WHERE (E.IS_DELETED=0) AND(E.NOMBRE_EJERCICIO=p_buscar OR G.NOMBRE_GRUPO_MUSCULAR=p_buscar OR E.NOMBRE_EJERCICIO LIKE concat('%',p_buscar,'%') OR G.NOMBRE_GRUPO_MUSCULAR LIKE concat('%',p_buscar,'%'));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_ejercicio_grupo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_ejercicio_grupo`(IN `p_id_grupo` INT(100))
BEGIN

SELECT
e.ID_EJERCICIO,
e.NOMBRE_EJERCICIO
from tb_grupo_muscular gm
JOIN tb_ejercicio e
on e.ID_GRUPO_MUSCULAR=gm.ID_MUSCULAR
WHERE gm.ID_MUSCULAR=p_id_grupo AND e.IS_DELETED=0;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_estadisticas_ventas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_estadisticas_ventas`(IN `p_annio` INT(100))
BEGIN
SET @total_vendido :=(SELECT SUM(v.TOTAL) from tb_venta v WHERE YEAR(v.FECHA)=p_annio);
SET @total_vendido_mes := (SELECT SUM(v.TOTAL) from tb_venta v WHERE MONTH(CURDATE())=MONTH(v.FECHA) && YEAR(V.FECHA)=p_annio);
SET @prod_mas_vendido := (SELECT p.NOMBRE from tb_producto p
JOIN tb_venta_producto vp on vp.ID_PRODUCTO=p.ID_PRODUCTO
JOIN tb_venta v ON V.ID_VENTA=vp.ID_VENTA
GROUP BY p.NOMBRE
ORDER BY SUM(vp.CANTIDAD) DESC
LIMIT 1);
SET @prod_menos_vendido := (SELECT p.NOMBRE from tb_producto p
JOIN tb_venta_producto vp on vp.ID_PRODUCTO=p.ID_PRODUCTO
JOIN tb_venta v ON v.ID_VENTA=vp.ID_VENTA
GROUP BY p.NOMBRE
ORDER BY SUM(vp.CANTIDAD) ASC
LIMIT 1);



select @total_vendido, @total_vendido_mes, @prod_mas_vendido, @prod_menos_vendido;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_estads_productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_estads_productos`(IN `p_annio` VARCHAR(100))
BEGIN

SELECT p.NOMBRE, SUM(vp.CANTIDAD) as CANTIDAD 
FROM tb_producto p 
	   JOIN tb_venta_producto vp 
		on vp.ID_PRODUCTO = p.ID_PRODUCTO
	   JOIN tb_venta v 
		on v.ID_VENTA=vp.ID_VENTA
WHERE YEAR(v.FECHA)= p_annio
GROUP BY p.ID_PRODUCTO
ORDER BY CANTIDAD DESC;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_grupo_muscular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_grupo_muscular`(IN `p_musculo` VARCHAR(100))
BEGIN

SELECT ID_MUSCULAR,NOMBRE_GRUPO_MUSCULAR
FROM `tb_grupo_muscular` WHERE IS_DELETED = 0 
AND NOMBRE_GRUPO_MUSCULAR LIKE concat(p_musculo,'%');

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_medidas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_medidas`(IN `p_buscar` VARCHAR(100))
BEGIN

SELECT mc.ID_MEDICION, mc.ID_DATOS,
mc.ID_CIRCUNFERENCIA, c.NOMBRE_CLIENTE, 
c.APELLIDOS AS APELLIDO_CLIENTE, mc.FECHA 
FROM tb_medicion_cliente mc
JOIN tb_cliente c 
	ON mc.ID_CLIENTE = c.ID_CLIENTE
WHERE mc.ID_MEDICION = p_buscar OR mc.ID_DATOS = p_buscar OR
mc.ID_CIRCUNFERENCIA = p_buscar OR c.NOMBRE_CLIENTE = p_buscar OR
c.APELLIDOS = p_buscar OR mc.FECHA = p_buscar OR
c.NOMBRE_CLIENTE LIKE concat(p_buscar,'%') OR 
c.APELLIDOS LIKE concat(p_buscar,'%') OR 
mc.FECHA LIKE concat('%',p_buscar,'%');


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_membresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_membresia`(IN `p_buscar` VARCHAR(100))
BEGIN

SELECT m.ID_MEMBRESIA, c.NOMBRE_CLIENTE, c.APELLIDOS AS APELLIDO_CLIENTE, m.FECHA_INICIO, m.FECHA_FIN, m.TIPO_PAGO, m.MONTO,
m.DETALLE, (SELECT IF(m.FECHA_FIN>=CURDATE(),"ACTIVO","SUSPENDIDO") )  AS ESTADO
FROM tb_membresia m
JOIN tb_cliente c 
	on m.ID_CLIENTE = c.ID_CLIENTE
WHERE (c.NOMBRE_CLIENTE=p_buscar OR c.APELLIDOS=p_buscar OR m.FECHA_INICIO=p_buscar OR m.FECHA_FIN=p_buscar OR 
m.TIPO_PAGO=p_buscar OR m.MONTO=p_buscar OR 
m.DETALLE=p_buscar OR  C.NOMBRE_CLIENTE LIKE concat(p_buscar,'%')
OR c.APELLIDOS LIKE concat(p_buscar,'%') OR  
m.FECHA_INICIO LIKE concat('%',p_buscar,'%') OR 
m.FECHA_FIN LIKE concat('%',p_buscar,'%') OR 
m.TIPO_PAGO LIKE concat(p_buscar,'%') OR
m.MONTO LIKE concat(p_buscar,'%') OR   
m.DETALLE LIKE concat(p_buscar,'%') OR 
(SELECT IF(m.FECHA_FIN>=CURDATE(),"ACTIVO","SUSPENDIDO") ) LIKE concat(p_buscar,'%')      );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_membresia_suspendidos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_membresia_suspendidos`(IN `p_annio` VARCHAR(100))
BEGIN

SELECT  concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) as NOMBRE,
m.FECHA_FIN AS FECHA, (SELECT IF(m.FECHA_FIN>=CURDATE(),"ACTIVO","SUSPENDIDO") )  AS ESTADO
FROM `tb_membresia` m
JOIN `tb_cliente` c 
	on m.ID_CLIENTE = c.ID_CLIENTE
WHERE m.FECHA_FIN<=CURDATE() AND YEAR(m.FECHA_FIN)=p_annio
ORDER BY m.FECHA_FIN DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_producto`(IN `p_buscar` VARCHAR(100))
BEGIN
	SELECT p.ID_PRODUCTO,p.NOMBRE,p.STOCK,p.PRECIO_UNITARIO,p.ULT_INGRESO,P.DETALLES 
FROM tb_producto p
WHERE (p.IS_DELETED=0) AND(p.NOMBRE=p_buscar OR p.STOCK=p_buscar OR p.PRECIO_UNITARIO=p_buscar OR p.DETALLES LIKE concat('%',p_buscar,'%') OR p.ULT_INGRESO LIKE concat('%',p_buscar,'%') OR p.NOMBRE LIKE concat('%',p_buscar,'%'));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_rutina` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_rutina`(IN `p_find` VARCHAR(100))
BEGIN
SET lc_time_names = 'Es_ES';

SELECT DISTINCT r.ID_RUTINA,concat(c.NOMBRE_CLIENTE, ' ', c.APELLIDOS) as NOMBRE_CLIENTE,r.FECHA from tb_rutina r
JOIN tb_cliente c on c.ID_CLIENTE=r.ID_CLIENTE
where r.ID_RUTINA=p_find OR c.NOMBRE_CLIENTE=p_find OR c.NOMBRE_CLIENTE like concat('%',p_find,'%') OR r.FECHA=p_find OR r.FECHA LIKE concat('%',p_find,'%') OR MONTHNAME(r.FECHA)=p_find or MONTHNAME(r.FECHA) LIKE concat('%',p_find,'%');



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_rutina_ejercicio_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_rutina_ejercicio_id`(IN `p_id` INT)
BEGIN

SELECT re.INDICACIONES, re.DIA,
e.NOMBRE_EJERCICIO
FROM tb_rutina_ejercicio re
JOIN tb_ejercicio e
	ON e.ID_EJERCICIO = re.ID_EJERCICIO
 WHERE ID_RUTINA = p_id
ORDER BY re.DIA;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_rutina_fecha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_rutina_fecha`(IN `p_id` INT(10), IN `p_cantidad` INT(10))
BEGIN

SELECT r.ID_RUTINA, r.FECHA,r.NIVEL,r.TIPO,r.OBJETIVO,r.PORCENTAJE,r.PAUSA from tb_rutina r where r.ID_CLIENTE=p_id
GROUP by R.ID_RUTINA
ORDER by R.FECHA DESC
LIMIT p_cantidad;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_rutina_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_rutina_id`(IN `p_id` INT)
BEGIN
SELECT ID_RUTINA, ID_CLIENTE, FECHA, NIVEL, 
TIPO, OBJETIVO, PORCENTAJE, PAUSA 
FROM tb_rutina
WHERE ID_RUTINA = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_rutina_musculo_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_rutina_musculo_id`(IN `p_id` INT)
BEGIN
SELECT
re.DIA,
gm.NOMBRE_GRUPO_MUSCULAR
FROM tb_rutina_ejercicio re
JOIN tb_ejercicio e
	ON re.ID_EJERCICIO = e.ID_EJERCICIO
    JOIN tb_grupo_muscular gm
    ON  gm.ID_MUSCULAR = e.ID_GRUPO_MUSCULAR
WHERE re.ID_RUTINA = p_id 
GROUP BY re.DIA
ORDER BY COUNT(gm.ID_MUSCULAR) DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_top_asistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_top_asistencia`(IN `p_annio` VARCHAR(100))
BEGIN
SELECT 
concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) as NOMBRE,
c.TELEFONO,
COUNT(a.ID_ASISTENCIA) AS ASISTENCIAS
FROM tb_asistencia a
JOIN tb_cliente c 
	on a.ID_CLIENTE= c.ID_CLIENTE
WHERE YEAR(a.FECHA)=p_annio
GROUP by NOMBRE
ORDER by ASISTENCIAS DESC
LIMIT 10;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_top_clientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_top_clientes`(IN `p_annio` VARCHAR(100))
BEGIN

SELECT
concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) as NOMBRE,
COUNT(v.ID_VENTA) as VENTAS,
SUM(v.TOTAL) as TOTAL
from tb_cliente c
JOIN tb_venta v
ON c.ID_CLIENTE=v.ID_CLIENTE
WHERE YEAR(v.FECHA)=p_annio
GROUP by NOMBRE
ORDER by TOTAL DESC
LIMIT 10;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_venta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_venta`(IN `p_buscar` VARCHAR(300))
BEGIN

SELECT DISTINCT v.ID_VENTA,v.ID_CLIENTE, CONCAT (c.NOMBRE_CLIENTE,' ',c.APELLIDOS) AS NOMBRE_CLIENTE, v.TOTAL,v.FECHA from tb_venta v
JOIN tb_venta_producto vp
on vp.ID_VENTA = v.ID_VENTA
JOIN tb_cliente c
on c.ID_CLIENTE=v.ID_CLIENTE
WHERE v.ID_VENTA=p_buscar OR v.ID_CLIENTE=p_buscar OR v.TOTAL=p_buscar OR v.FECHA=p_buscar OR concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS)=p_buscar OR concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) LIKE concat(p_buscar,'%') OR v.ID_VENTA like concat(p_buscar,'%') OR v.ID_CLIENTE like concat (p_buscar,'%') OR v.TOTAL like concat (p_buscar,'%') OR V.TOTAL like concat(p_buscar,'%');

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_ventas_filtro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_ventas_filtro`(IN `p_filtro` VARCHAR(100))
BEGIN

IF (p_filtro='Hoy')
	THEN
    SELECT v.ID_VENTA, CONCAT(c.NOMBRE_CLIENTE, ' ',c.APELLIDOS) AS NOMBRE_CLIENTE,v.ID_CLIENTE, v.TOTAL,v.FECHA FROM tb_venta v JOIN tb_cliente c on c.ID_CLIENTE=v.ID_CLIENTE WHERE v.FECHA=CURDATE()
    ORDER BY V.ID_VENTA DESC;
    ELSEIF (p_filtro="Ayer")
    
    	THEN
         SELECT v.ID_VENTA, CONCAT(c.NOMBRE_CLIENTE, ' ',c.APELLIDOS) AS NOMBRE_CLIENTE,v.ID_CLIENTE, v.TOTAL,v.FECHA FROM tb_venta v JOIN tb_cliente c on c.ID_CLIENTE=v.ID_CLIENTE WHERE v.FECHA=SUBDATE(CURDATE(),1)
	ORDER BY V.ID_VENTA DESC;
    ELSEIF (p_filtro='Esta semana')
    	THEN
    	SELECT v.ID_VENTA, CONCAT(c.NOMBRE_CLIENTE, ' ',c.APELLIDOS) AS NOMBRE_CLIENTE,v.ID_CLIENTE, v.TOTAL,v.FECHA FROM tb_venta v JOIN tb_cliente c on c.ID_CLIENTE=v.ID_CLIENTE WHERE v.FECHA=SUBDATE(CURDATE(),1) OR v.FECHA=SUBDATE(CURDATE(),2) OR v.FECHA=SUBDATE(CURDATE(),3) OR v.FECHA=SUBDATE(CURDATE(),4) OR v.FECHA=SUBDATE(CURDATE(),5) OR v.FECHA=SUBDATE(CURDATE(),6) OR v.FECHA=SUBDATE(CURDATE(),7)
         ORDER BY (V.FECHA) DESC;
        ELSEIF(p_filtro="Todas")
        THEN
        SELECT v.ID_VENTA, CONCAT(c.NOMBRE_CLIENTE, ' ',c.APELLIDOS) as NOMBRE_CLIENTE,v.ID_CLIENTE, v.TOTAL,v.FECHA FROM tb_venta v JOIN tb_cliente c on c.ID_CLIENTE=v.ID_CLIENTE
        ORDER BY (V.FECHA) DESC;
        END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_search_ventas_mes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_search_ventas_mes`(IN `p_annio` INT)
BEGIN
SET lc_time_names = 'Es_ES';

SELECT MONTHNAME(v.FECHA) as MES, SUM(v.TOTAL) AS TOTAL_VENDIDO FROM tb_venta v
WHERE YEAR(v.FECHA)= p_annio
GROUP BY MES
ORDER BY MES;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_venta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_venta`()
SELECT
v.ID_VENTA,
v.ID_CLIENTE,
concat(c.NOMBRE_CLIENTE,' ',c.APELLIDOS) as NOMBRE_CLIENTE,
v.FECHA,
v.TOTAL
from tb_venta v
JOIN tb_cliente c 
ON C.ID_CLIENTE=v.ID_CLIENTE
ORDER BY (v.ID_VENTA) DESC ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_select_venta_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_venta_info`(IN `p_venta` INT)
BEGIN

SELECT p.NOMBRE, vp.CANTIDAD, vp.SUBTOTAL 
FROM tb_venta_producto vp
JOIN tb_producto p
ON P.ID_PRODUCTO=vp.ID_PRODUCTO
WHERE vp.ID_VENTA=p_venta;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_asistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_asistencia`(IN `p_id` INT, IN `p_fecha` DATE)
BEGIN
UPDATE tb_asistencia
SET FECHA = p_fecha
WHERE ID_ASISTENCIA = p_id;
 SELECT 1 AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_cliente`(IN `p_id` INT(10), IN `p_nombre` VARCHAR(100), IN `p_apellidos` VARCHAR(100), IN `p_edad` VARCHAR(100), IN `p_numero` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_enfermedad` VARCHAR(100))
BEGIN

	UPDATE tb_cliente 
    SET NOMBRE_CLIENTE=p_nombre,
    APELLIDOS=p_apellidos,
    EDAD= p_edad,
    TELEFONO= p_numero,
	EMAIL=p_email,
    ENFERMEDAD= p_enfermedad
    WHERE ID_CLIENTE= p_id;
    
    SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_ejercicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_ejercicio`(IN `p_id` INT(10), IN `p_ejercicio` VARCHAR(100), IN `p_grupo_muscular` VARCHAR(300))
BEGIN
SET @local_id_grupo_muscular := (SELECT ID_MUSCULAR FROM tb_grupo_muscular WHERE NOMBRE_GRUPO_MUSCULAR = p_grupo_muscular);
SET @local_p_ejercicio= concat('%',p_ejercicio,'%');

IF (@local_id_grupo_muscular IS NOT NULL)
	THEN
    IF EXISTS (SELECT* FROM tb_ejercicio WHERE NOMBRE_EJERCICIO LIKE @local_p_ejercicio AND ID_GRUPO_MUSCULAR = @local_id_grupo_muscular)
		THEN
			SELECT 0 as msg;
		ELSE
            UPDATE tb_ejercicio 
            SET NOMBRE_EJERCICIO= p_ejercicio, 
            ID_GRUPO_MUSCULAR= @local_id_grupo_muscular 
            WHERE ID_EJERCICIO = p_id;
            SELECT 1 AS msg;
		END IF;
ELSE
	SELECT -1 as msg;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_grupo_muscular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_grupo_muscular`(IN `p_id` INT(4), IN `p_musculo` VARCHAR(100))
BEGIN

UPDATE `tb_grupo_muscular` SET `NOMBRE_GRUPO_MUSCULAR`= p_musculo WHERE  `ID_MUSCULAR` = p_id;

SELECT 1 as msg;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_medidas_circunferencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_medidas_circunferencia`(IN `p_id` INT, IN `p_bd` VARCHAR(32), IN `p_bi` VARCHAR(32), IN `p_pecho` VARCHAR(32), IN `p_abd` VARCHAR(32), IN `p_cadera` VARCHAR(32), IN `p_md` VARCHAR(32), IN `p_mi` VARCHAR(32), IN `p_pd` VARCHAR(32), IN `p_pi` VARCHAR(32))
BEGIN

UPDATE tb_circunferencia_cliente SET BRAZO_DERECHO=p_bd,BRAZO_IZQUIERDO=p_bi,PECHO=p_pecho,
ABDOMEN=p_abd,CADERA=p_cadera,MUSLO_DERECHO=p_md,
MUSLO_IZQUIERDO=p_mi,PIERNA_DERECHA=p_pd,
PIERNA_IZQUIERDA=p_pi WHERE ID_CIRCUNFERENCIA= p_id;
SELECT 1 as msg;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_medidas_datos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_medidas_datos`(IN `p_id` INT, IN `p_pecho` VARCHAR(32), IN `p_altura` VARCHAR(32), IN `p_grasa_corporal` VARCHAR(32), IN `p_agua_corporal` VARCHAR(32), IN `p_masa_muscular` VARCHAR(32), IN `p_valora_fisica` VARCHAR(32), IN `p_metab_basal` VARCHAR(32), IN `p_edad_metabolica` VARCHAR(32), IN `p_masa_osea` VARCHAR(32), IN `p_grasa_visceral` VARCHAR(32))
BEGIN
UPDATE `tb_datos_cliente` SET `PESO`=p_pecho,`ALTURA`=p_altura,
`GRASA_CORPORAL`=p_grasa_corporal,`AGUA_CORPORAL`=p_agua_corporal,
`MASA_MUSCULAR`=p_masa_muscular,`VALORACION_FISICA`=p_valora_fisica,
`METABOLISMO_BASAL`=p_metab_basal,`EDAD_METABOLICA`=p_edad_metabolica,
`MASA_OSEA`=p_masa_osea,`GRASA_VISCERAL`=p_grasa_visceral
WHERE ID_DATOS = p_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_membresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_membresia`(IN `p_id` INT, IN `p_fecha_inicio` DATE, IN `p_fecha_fin` DATE, IN `p_tipo_pago` VARCHAR(100), IN `p_monto` DOUBLE, IN `p_detalle` VARCHAR(300))
BEGIN

UPDATE `tb_membresia` 
SET `FECHA_INICIO`=p_fecha_inicio,`FECHA_FIN`=p_fecha_fin,
`TIPO_PAGO`=p_tipo_pago,
`MONTO`=p_monto,`DETALLE`=p_detalle
WHERE `ID_MEMBRESIA`=p_id;

 SELECT 1 AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_producto`(IN `p_id` INT(10), IN `p_nombre` VARCHAR(200), IN `p_stock` INT(10), IN `p_precio` INT(100), IN `p_fecha` DATE, IN `p_detalles` VARCHAR(300))
BEGIN

UPDATE tb_producto
SET NOMBRE=p_nombre,
STOCK=p_stock,
PRECIO_UNITARIO=p_precio,
ULT_INGRESO=p_fecha,
DETALLES=p_detalles
WHERE ID_PRODUCTO=p_id;

SELECT 1 as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_rutina` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_rutina`(IN `p_id` INT, IN `p_nivel` VARCHAR(32), IN `p_tipo` VARCHAR(32), IN `p_objetivo` VARCHAR(32), IN `p_porcenteje` VARCHAR(32), IN `p_pausa` VARCHAR(32))
BEGIN
UPDATE tb_rutina SET
FECHA = NOW(),NIVEL = p_nivel,
TIPO=p_tipo, OBJETIVO=p_objetivo,
PORCENTAJE=p_porcenteje, PAUSA=p_pausa
WHERE ID_RUTINA = p_id;
SELECT 1 AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-15 11:28:49
