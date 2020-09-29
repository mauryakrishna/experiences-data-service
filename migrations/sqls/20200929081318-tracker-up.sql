/* Replace with your SQL commands */
CREATE TABLE `tracker` ( 
  `id` bigint(20) NOT NULL AUTO_INCREMENT, 
  `key` varchar(20) NOT NULL, 
  `expiry` timestamp NOT NULL, 
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`key`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
