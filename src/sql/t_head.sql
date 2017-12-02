USE `my_blog_x`;
DROP TABLE IF EXISTS `t_head`;
CREATE TABLE `t_head`(
    `headid` INT NOT NULL AUTO_INCREMENT,
    `headurl` VARCHAR(500) DEFAULT '/public/default/headimg.jpg',
    `userno` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`headid`)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8;