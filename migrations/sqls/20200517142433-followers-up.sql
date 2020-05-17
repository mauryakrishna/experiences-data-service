/* Replace with your SQL commands */
CREATE TABLE `followers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authorid` bigint(10) NOT NULL,
  `followerid` bigint(10) NOT NULL, 
  FOREIGN KEY (`authorid`) REFERENCES `authors` (`id`),
  FOREIGN KEY (`followerid`) REFERENCES `authors` (`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
