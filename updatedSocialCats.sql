-- MySQL dump 10.16  Distrib 10.1.21-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=517 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data`
--

LOCK TABLES `data` WRITE;
/*!40000 ALTER TABLE `data` DISABLE KEYS */;
INSERT INTO `data` VALUES (224,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/53598254061167e99ee887.mp4\"}','video',1),(278,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/7469999846124c6514f743.jpg\"}','backgrounds',1),(314,'{\"titluStiri\":\"Anunturi si informatii\"}','newsTitle',1),(418,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/289663146615ebf18ae329.jpg\"}','foto',1),(423,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/1866747326616033ad86097.jpg\"}','foto',1),(495,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/180539774161a0c08347124.jpg\",\"description\":\"test5 test12 test19 test26 test33 test40 test47 test54 test61 test68 test75 test82 test89.\",\"titlu\":\"test3\"}','news',1),(496,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/62018719161a0c34d0dbec.jpg\",\"titlu\":\"test2\",\"description\":\"test5 test12 test19 test26 test33 test40 test47 test54 test61 test68 test75 test82 test89.\"}','locatiidezbor',1),(498,'{\"fileName\":\"http:\\/\\/ms.homens.tricu.ro:80\\/upload\\/154911104361a63812a5532.jpg\",\"titlu\":\"Locatie Noua\",\"description\":\"Noul sezon vine si cu o locatie noua...\"}','locatiidezbor',1),(499,'{\"titlu\":\"Rezervari\\/Programari\\/Contact\",\"description\":\"Pentru programari sau orice alta intrebare ai, conteacteaza-ne.\",\"phone\":\"+40757985068\",\"email\":\"mirceab89@gmail.com\"}','rezervaricontact',1);
/*!40000 ALTER TABLE `data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'session token',
  `validUntil` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dana@gmail.com','dana','q0d8JZ1gdMB93fDwSuA0CLhu/3I5WXfTeGmIWR6bnFBymK9wasDZJBS7ExqsG4gwNnnBVdpJClvvcVCa64cqDn3+ig==','2022-03-28 21:46:17'),(2,'mircea@gmail.com','mircea','q0d8JZ1gdMB93fn4VuIRDpVo+39+VjbdNSiIBV2YjlRunaQgNMCHZxezQ1XrCd5uYGXBTsNDXAizIkaY7ogtB3z8xrNqZPg=','2022-03-28 15:43:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-28 22:41:50
