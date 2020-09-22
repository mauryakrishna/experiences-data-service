/* Replace with your SQL commands */
CREATE TABLE `experiences` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authoruid` varchar(100) NOT NULL,
  `slugkey` varchar(15) DEFAULT NULL, /* though it is produced and used as 11 charecters*/
  `slug` varchar(255) DEFAULT NULL,  /* limited to 200 charecters to accomodate in URL with other slugkey */
  `title` varchar(180) DEFAULT NULL,
  `subtitle` varchar(2000) DEFAULT NULL,
  `experience` JSON,
  `tags` varchar(1000) DEFAULT NULL,
  `readcount` bigint(10) DEFAULT 0,
  `ispublished` boolean NOT NULL DEFAULT 0,
  `publishdate` timestamp(6) DEFAULT NULL,  /* used timestamp of precision 6 as this will be used in cursor based pagination */
  `hidedate` timestamp DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`slugkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;