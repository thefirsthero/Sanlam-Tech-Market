CREATE DATABASE  IF NOT EXISTS `policy_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `policy_management_system`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: policy_management_system
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `mailing_list`
--

DROP TABLE IF EXISTS `mailing_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailing_list` (
  `email_address` varchar(100) NOT NULL,
  PRIMARY KEY (`email_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailing_list`
--

LOCK TABLES `mailing_list` WRITE;
/*!40000 ALTER TABLE `mailing_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `mailing_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_table`
--

DROP TABLE IF EXISTS `payment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_table` (
  `payment_identifier` int NOT NULL AUTO_INCREMENT,
  `amount_paid` float DEFAULT NULL,
  `payment_date` date NOT NULL,
  `policy_identifier` int DEFAULT NULL,
  `user_identifier` int DEFAULT NULL,
  `payment_description` varchar(100) NOT NULL,
  PRIMARY KEY (`payment_identifier`),
  KEY `policy_identifier` (`policy_identifier`),
  KEY `user_identifier` (`user_identifier`),
  CONSTRAINT `payment_table_ibfk_1` FOREIGN KEY (`policy_identifier`) REFERENCES `policy_table` (`policy_identifier`),
  CONSTRAINT `payment_table_ibfk_2` FOREIGN KEY (`user_identifier`) REFERENCES `user_table` (`user_identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_table`
--

LOCK TABLES `payment_table` WRITE;
/*!40000 ALTER TABLE `payment_table` DISABLE KEYS */;
INSERT INTO `payment_table` VALUES (1,5631.99,'2018-02-13',1,1,'Car Insurance'),(2,4563.33,'2017-02-21',2,2,'Car Insurance'),(3,65423.5,'2020-03-23',3,3,'Car Insurance'),(4,123.54,'2018-12-10',4,1,'Home Insurance'),(5,51.99,'2018-01-01',5,5,'Home Insurance'),(6,465.95,'2022-11-06',6,4,'Life Insurance'),(7,3,'2022-12-03',7,4,'Car Insurance'),(8,56321.6,'2017-05-18',8,1,'Life Insurance'),(9,1.99,'2000-02-16',9,4,'Home Insurance'),(10,4563.33,'2017-02-21',10,1,'Pet Insurance'),(11,65423.5,'2020-03-23',11,1,'Travel Insurance'),(12,51.99,'2018-01-01',12,1,'Funeral Insurance'),(13,51.99,'2018-01-01',13,1,'Disability Insurance'),(14,564.1,'2017-02-21',14,1,'Unemployment Insurance'),(15,65423.5,'2020-03-23',15,1,'Accident and Health Insurance');
/*!40000 ALTER TABLE `payment_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_table`
--

DROP TABLE IF EXISTS `policy_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_table` (
  `policy_name` varchar(100) NOT NULL,
  `amount_paid` float DEFAULT NULL,
  `policy_decription` varchar(100) NOT NULL,
  `date_acquired` date NOT NULL,
  `user_identifier` int DEFAULT NULL,
  `policy_identifier` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`policy_identifier`),
  KEY `user_identifier` (`user_identifier`),
  CONSTRAINT `policy_table_ibfk_1` FOREIGN KEY (`user_identifier`) REFERENCES `user_table` (`user_identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_table`
--

LOCK TABLES `policy_table` WRITE;
/*!40000 ALTER TABLE `policy_table` DISABLE KEYS */;
INSERT INTO `policy_table` VALUES ('Car Insurance',5631.99,'Car Insurance','2018-02-13',1,1),('Car Insurance',4563.33,'Car Insurance','2017-02-21',2,2),('Car Insurance',65423.5,'Car Insurance','2020-03-23',3,3),('Home Insurance',123.54,'Home Insurance','2018-12-10',1,4),('Home Insurance',51.99,'Home Insurance','2018-01-01',5,5),('Life Insurance',465.95,'Life Insurance','2022-11-06',4,6),('Car Insurance',3,'Car Insurance','2022-12-03',4,7),('Life Insurance',56321.6,'Life Insurance','2017-05-18',1,8),('Home Insurance',1.99,'Home Insurance','2000-02-16',4,9),('Pet Insurance',4563.33,'Pet Insurance','2017-02-21',1,10),('Travel Insurance',65423.5,'Travel Insurance','2020-03-23',1,11),('Funeral Insurance',51.99,'Funeral Insurance','2018-01-01',1,12),('Disability Insurance',51.99,'Disability Insurance','2018-01-01',1,13),('Unemployment Insurance',564.1,'Unemployment Insurance','2017-02-21',1,14),('Accident and Health Insurance',65423.5,'Accident and Health Insurance','2020-03-23',1,15);
/*!40000 ALTER TABLE `policy_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_identifier` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  PRIMARY KEY (`user_identifier`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'A','a@gmail.com','A'),(2,'B','b@gmail.com','B'),(3,'C','c@gmail.com','C'),(4,'D','d@gmail.com','D'),(5,'E','e@gmail.com','E'),(6,'test','test@gmail.com','test'),(7,'test2','test2@gmail.com','test2'),(8,'test3','test3@gmail.com','test3'),(10,'dadsd','test4@gmail.com','d');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-19  9:35:22
