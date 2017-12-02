USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog_reply_comment`;
CREATE TABLE `t_blog_reply_comment` (
    `commentid` INT AUTO_INCREMENT,
    `replyno` INT NOT NULL,
    `userno` INT NOT NULL,
    `comment` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`commentid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;