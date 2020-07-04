/* Replace with your SQL commands */
CREATE TABLE `authors` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  -- uid: uinque string, made of username from user's emailid if thats enought else append some random number to make it one
  -- eg: uid:mauryakrishna1, from mauryakrishna1@gmail.com
  -- uid: used for mention and author profile url loading
  `uid` varchar(100) NOT NULL,
  `displayname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `shortintro` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;