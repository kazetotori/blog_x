USE `my_blog_x`;
DROP TABLE IF EXISTS `t_visit`;
CREATE TABLE `t_visit` (
    `visitid` INT AUTO_INCREMENT,
    `sessionid` CHAR(40) NOT NULL,
    `visitor` INT NOT NULL,
    `bloger` INT NOT NULL,
    `vdate` DATE NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULl,
    PRIMARY KEY(`visitid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;