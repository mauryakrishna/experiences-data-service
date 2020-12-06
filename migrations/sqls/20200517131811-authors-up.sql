/* Replace with your SQL commands */
CREATE TABLE `authors` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  -- uid: uinque string, made of username from user's emailid if thats enought else append some random number to make it one
  -- eg: uid:mauryakrishna1, from mauryakrishna1@gmail.com
  -- uid: used for mention and author profile url loading
  `uid` varchar(100) NOT NULL,
  `displayname` varchar(100) NOT NULL,
  -- author email can not be made public, so not used it for unique identfication in experiences system
  `email` varchar(50) NOT NULL,
  -- has user verified email
  `isemailverified` boolean NOT NULL DEFAULT 0,
  `password` varchar(200) NOT NULL,
  `shortintro` varchar(250) DEFAULT NULL,
  -- region/timezone formats for dates, times and numbers
  -- https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  `region` varchar(15) DEFAULT NULL,
  -- Language/locale for buttons, titles and other text from Facebook for this account on experiences
  `languages` varchar(200) DEFAULT NULL,
  -- refreshtoken storage
  `refreshtoken` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX(`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;