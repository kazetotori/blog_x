USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog_cls`;
CREATE TABLE `t_blog_cls` (
    `clsid` INT AUTO_INCREMENT,
    `userno` INT NOT NULL,
    `clsname` VARCHAR(20),
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`clsid`),
    UNIQUE KEY(`userno`,`clsname`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;