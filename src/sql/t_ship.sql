USE `my_blog_x`;
DROP TABLE IF EXISTS `t_ship`;
CREATE TABLE `t_ship` (
    `shipid` INT AUTO_INCREMENT,
    `ship_lv` INT NOT NULL,
    `user_a` INT NOT NULL,
    `user_b` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`shipid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;