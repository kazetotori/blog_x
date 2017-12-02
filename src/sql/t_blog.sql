USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog`;
CREATE TABLE `t_blog` ( 
    `blogid` INT AUTO_INCREMENT,
    `userno` INT NOT NULL,
    `clsno` INT NOT NULL,
    `title` VARCHAR(100) DEFAULT '',
    `content` TEXT,
    `preview` VARCHAR(600) NOT NULL,
    `read_times` INT DEFAULT 0,
    `foot_times` INT DEFAULT 0,
    `trans_times` INT DEFUALT 0,
    `save_status` INT DEFAULT 0,
    `per_lv` INT DEFAULT 0,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`blogid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;