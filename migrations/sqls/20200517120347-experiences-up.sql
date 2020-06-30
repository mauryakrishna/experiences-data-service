/* Replace with your SQL commands */
CREATE TABLE `experiences` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authoruid` varchar(100) NOT NULL,
  `slugkey` varchar(15) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `subtitle` varchar(2000) DEFAULT NULL,
  `experience` JSON,
  `tags` varchar(1000) DEFAULT NULL,
  `readcount` bigint(10) DEFAULT 0,
  `ispublished` boolean NOT NULL DEFAULT 0,
  `publishdate` timestamp DEFAULT NULL, 
  `hidedate` timestamp DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`slugkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;