/* Replace with your SQL commands */
CREATE TABLE `thoughts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `experienceslugkey` varchar(15) DEFAULT NULL, /* though it is produced and used as 11 charecters*/
  `thought` JSON NOT NULL,
  `thoughtauthoruid` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`experienceslugkey`) REFERENCES experiences (`slugkey`)
  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;