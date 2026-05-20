CREATE DATABASE IF NOT EXISTS `user`;
USE `user`;

CREATE TABLE IF NOT EXISTS `new_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

-- build the validation and functional part of this signup page that is give the power of backend integrating php and mysql. Use database named "user" and use table "new_user" for saving credentials. don't use to much things like jwt and stuff like that  only basic core functionalities should be present. keep and php components into the api folder present in the root folder. Did you find the api folder?