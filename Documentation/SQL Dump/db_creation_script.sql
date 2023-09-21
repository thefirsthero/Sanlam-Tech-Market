-- POLICY TABLE --
CREATE DATABASE  IF NOT EXISTS `solutions_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `solutions_management_system`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: solutions_management_system
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
INSERT INTO `policy_table` VALUES ('Automation',5631.99,'Automation solutions within Sanlam','2018-02-13',1,1),('Automation',4563.33,'Automation solutions within Sanlam','2017-02-21',2,2),('Automation',65423.5,'Automation solutions within Sanlam','2020-03-23',3,3),('AWS Solutions',123.54,'AWS solutions for various items EC2 deployment, AWS WordPress etc.','2018-12-10',1,4),('AWS Solutions',51.99,'AWS solutions for various items EC2 deployment, AWS WordPress etc.','2018-01-01',5,5),('AWS Solutions',465.95,'AWS solutions for various items EC2 deployment, AWS WordPress etc.','2022-11-06',4,6),('Automation',3,'Automation solutions within Sanlam','2022-12-03',4,7),('Terraform Solutions',56321.6,'Repository of Terraform Solutions','2017-05-18',1,8),('Home Insurance',1.99,'Home Insurance','2000-02-16',4,9),('Code',4563.33,'Various Code solutions used in Sanlam','2017-02-21',1,10),('React solutions',65423.5,'React solutions in Sanlam','2020-03-23',1,11),('WordPress solutions',51.99,'All WordPress Solutions in Sanlam','2018-01-01',1,12),('Operations solutions',51.99,'Operations solutions in Sanlam e.g. AiOps, Server Stat Dashboarding.','2018-01-01',1,13),('API solutions',564.1,'Examples of various APIs in Sanlam','2017-02-21',1,14),('Social Media solutions',65423.5,'Solutions that enable social activity and interaction in Sanlam','2020-03-23',1,15);
/*!40000 ALTER TABLE `policy_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-21 12:56:22



-- SOLUTION TABLE --
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: solutions_management_system
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `solutions`
--

DROP TABLE IF EXISTS `solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solutions` (
  `solutionId` int NOT NULL AUTO_INCREMENT,
  `solution_name` varchar(100) DEFAULT NULL,
  `solution_description` varchar(250) DEFAULT NULL,
  `solution_documents_path` varchar(100) DEFAULT NULL,
  `solution_codezip_path` varchar(100) DEFAULT NULL,
  `solution_category` varchar(100) DEFAULT NULL,
  `solution_tags` varchar(100) DEFAULT NULL,
  `solution_snippet` varchar(10000) DEFAULT NULL,
  `solution_link` varchar(100) DEFAULT NULL,
  `user_identifier` int DEFAULT NULL,
  PRIMARY KEY (`solutionId`),
  KEY `user_identifier` (`user_identifier`),
  CONSTRAINT `solutions_ibfk_1` FOREIGN KEY (`user_identifier`) REFERENCES `user_table` (`user_identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solutions`
--

LOCK TABLES `solutions` WRITE;
/*!40000 ALTER TABLE `solutions` DISABLE KEYS */;
INSERT INTO `solutions` VALUES (1,'UiPath Bot','Bot that auto-responds to basic user queries sent to the MiWay email box','uploads/code_zip_files','uploads/documents','Automation','Bots','import \'../styles/App.css\'; function Solution(props) { return( <div class=&quot;card&quot; > <img src=&quot;...&quot; alt=&quot;...&quot;/><div class=&quot;card-body&quot;> <h5 class=&quot;card-title&quot;>{ props.title }</h5> <p class=&quot;card-text&quot;>{ props.text }</p> <a href=&quot;#&quot; class=&quot;btn btn-primary&quot;>See Solution</a> </div> </div> ); } export default Solution;','',1),(2,'k','k','uploads/Angular_Developer.pdf','uploads/SDDA-JavaScript-Project-pre.zip','k','k','k','k',1),(3,'aws','aws','uploads/React_Native_Developer.pdf','uploads/SDDA-JavaScript-Project-pre.zip','aws','aws','aws','aws',1);
/*!40000 ALTER TABLE `solutions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-21 13:00:34

-- Users --
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

-- Dump completed on 2023-09-21 13:05:38
