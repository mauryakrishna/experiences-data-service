/* Replace with your SQL commands */
CREATE TABLE `tags` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `tagname` varchar(50) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;