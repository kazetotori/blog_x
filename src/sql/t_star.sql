/*
    此表直接执行即可
*/
USE `my_blog_x`;
DROP TABLE IF EXISTS `t_star`;
CREATE TABLE `t_star`(
    `autoid` INT NOT NULL AUTO_INCREMENT,
    `starno` INT NOT NULL,
    `star_name` VARCHAR(6) NOT NULL,
    `minday` DATE NOT NULL,
    `maxday` DATE NOT NULL,
    `year_type` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`autoid`)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8;

#标准数据
#year_type=0为平年
DELETE FROM `t_star`;
INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    1,'白羊座','1999-3-21','1999-4-19',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    2,'金牛座','1999-4-20','1999-5-20',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    3,'双子座','1999-5-22','1999-6-21',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    4,'巨蟹座','1999-6-22','1999-7-22',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    5,'狮子座','1999-7-23','1999-8-22',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    6,'处女座','1999-8-23','1999-9-22',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    7,'天秤座','1999-9-23','1999-10-23',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    8,'天蝎座','1999-10-24','1999-11-22',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    9,'射手座','1999-11-23','1999-12-21',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    10,'摩羯座','1999-12-22','1999-12-31',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    10,'摩羯座','1999-1-1','1999-1-19',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    11,'水瓶座','1999-1-20','1999-2-18',0,NOW(),NOW()
);

INSERT INTO `t_star`(
    `starno`,`star_name`,`minday`,`maxday`,
    `year_type`,`c_time`,`u_time`
) VALUES(
    12,'双鱼座','1999-2-19','1999-3-20',0,NOW(),NOW()
);


#将闰年的数据，year_type设置为1，并修改对应的minday和maxday
#在临时表中操作完成后导回主表
DROP TABLE IF EXISTS `t_temp_star`;

CREATE TABLE `t_temp_star` AS 
SELECT * FROM `t_star`;

UPDATE `t_temp_star` 
SET `autoid` = `autoid` + (
    SELECT COUNT(`autoid`) FROM `t_star`
);

UPDATE `t_temp_star`
SET `year_type`=1;

UPDATE `t_temp_star`
SET 
  `minday` = CONCAT(
      YEAR(`minday`)+1,'-',
      MONTH(`minday`),'-',
      DAY(`minday`)),
  `maxday` = CONCAT(
      YEAR(`maxday`)+1,'-',
      MONTH(`maxday`),'-',
      DAY(`maxday`));

INSERT INTO `t_star` SELECT * FROM `t_temp_star`;
DROP TABLE `t_temp_star`;