USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog_reply`;
CREATE TABLE `t_blog_reply` (
    `replyid` INT AUTO_INCREMENT,
    `blogno` INT NOT NULL,
    `userno` INT NOT NULL,
    `reply_to` INT DEFAULT NULL,
    `content` VARCHAR(1000) NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY (`replyid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;