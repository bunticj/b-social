CREATE DATABASE IF NOT EXISTS bsocial2;

CREATE TABLE IF NOT EXISTS  bsocial2.user (
 user_id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(32) NOT NULL, 
 last_name VARCHAR(32) NOT NULL,
 email varchar(32) NOT NULL,
 username varchar(32) NOT NULL,
password TEXT NOT NULL , 
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
PRIMARY KEY (user_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS  bsocial2.user_message (
message_id INT NOT NULL AUTO_INCREMENT ,
message_content TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
user_id INT NOT NULL ,
seen TINYINT DEFAULT NULL,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (message_id),
FOREIGN KEY (user_id) REFERENCES user(user_id)) 
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bsocial2.post ( 
post_id INT NOT NULL AUTO_INCREMENT ,
user_id INT NOT NULL ,
post_content TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
PRIMARY KEY (post_id),
FOREIGN KEY (user_id) REFERENCES user(user_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bsocial2.comment ( 
comment_id INT NOT NULL AUTO_INCREMENT ,
post_id INT NOT NULL ,
user_id INT NOT NULL ,
comment_content TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
PRIMARY KEY (comment_id),
FOREIGN KEY (user_id) REFERENCES user(user_id),
FOREIGN KEY (post_id) REFERENCES post(post_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bsocial2.follower ( 
user_id INT NOT NULL ,
following_user_id INT NOT NULL,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
FOREIGN KEY (user_id) REFERENCES user(user_id),
FOREIGN KEY (following_user_id) REFERENCES user(user_id))
ENGINE = InnoDB;