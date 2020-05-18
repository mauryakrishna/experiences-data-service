/* Replace with your SQL commands */
CREATE TABLE `experiences` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authorid` bigint(10) NOT NULL,
  `slug` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(500) NOT NULL DEFAULT '',
  `experience` JSON,
  `tags` varchar(1000) DEFAULT NULL,
  `readcount` bigint(10) DEFAULT 0,
  `publishdate` timestamp DEFAULT NULL, 
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  INDEX (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;