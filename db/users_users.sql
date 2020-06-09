CREATE DATABASE `users`;

USE `users`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


LOCK TABLES `users` WRITE;

INSERT INTO `users`(`nome`,`senha`,`email`) VALUES 
('cleber2','1','cleber@email.com'),
('cleberu4','1234u','cleber@email.comu'),
('erick','1ericku','erick@email.comu'),
('Andre','prog123','andre_hagemann@estudante.sc.senai.br');

UNLOCK TABLES;
