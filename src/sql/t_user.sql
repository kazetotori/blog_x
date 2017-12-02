USE `my_blog_x`;
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`(
    `userid` INT AUTO_INCREMENT,
    `username` CHAR(12) NOT NULL,
    `password` CHAR(40) NOT NULL,
    `nickname` VARCHAR(10) NOT NULL,
    `birthday` DATE DEFAULT NULL,
    `sex` VARCHAR(2) NOT NULL DEFAULT '-',
    `phone` VARCHAR(50) ,
    `email` VARCHAR(50),
    `headno` INT NOT NULL DEFAULT 1,
    `starno` INT NOT NULL DEFAULT 0,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULl,
    PRIMARY KEY(`userid`),
    UNIQUE KEY(`username`)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8;