/* Replace with your SQL commands */
CREATE TABLE `tracker` ( 
  `id` bigint(20) NOT NULL AUTO_INCREMENT, 
  `email` varchar(50) NOT NULL,
  `requestkey` varchar(20) NOT NULL, 
  `expiry` DATETIME NOT NULL, 
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`requestkey`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
