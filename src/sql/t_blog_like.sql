USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog_like`;
CREATE TABLE `t_blog_like` (
    `likeid` INT AUTO_INCREMENT,
    `blogno` INT NOT NULL,
    `userno` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY (`likeid`),
    UNIQUE KEY (`blogno`,`userno`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;