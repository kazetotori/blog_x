USE `my_blog_x`;
DROP TABLE IF EXISTS `t_blog_trans`;
CREATE TABLE `t_blog_trans` (
    `transid` INT AUTO_INCREMENT,
    `trans_from` INT NOT NULL,
    `blogno` INT NOT NULL,
    `c_time` DATETIME NOT NULL,
    `u_time` DATETIME NOT NULL,
    PRIMARY KEY(`transid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


# 以下内容不使用
-- DROP PROCEDURE IF EXISTS get_trans_times;
-- CREATE PROCEDURE `get_trans_times`(IN _blogno INT,OUT trans_times INT) 
-- BEGIN
--     DECLARE c INT DEFAULT 0;
--     DECLARE max_id INT DEFAULT 0;

--     CREATE TABLE t_tmp (
--         autoid INT AUTO_INCREMENT,
--         blogno INT NOT NULL,
-- 				PRIMARY KEY(`autoid`)
--     );

--     INSERT INTO t_tmp(blogno) (SELECT blogno FROM t_blog_trans WHERE trans_from=_blogno);
--     SELECT COUNT(*) INTO c FROM t_tmp;
--     SET trans_times = c;
        
--     WHILE ( c > 0) DO
--         SELECT MAX(autoid) INTO max_id FROM t_tmp;
--         INSERT INTO t_tmp(blogno) (
--             SELECT blogno FROM t_blog_trans WHERE trans_from IN(
--                 SELECT blogno FROM t_tmp WHERE autoid <= max_id
--             )
--         );
--         DELETE FROM t_tmp WHERE autoid <= max_id;
--         SELECT COUNT(*) INTO c FROM t_tmp;
--         SET trans_times = trans_times + c;
--     END WHILE;
--     DROP TABLE t_tmp;
-- END;