-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema skkkzhan_athenahack2021_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema skkkzhan_athenahack2021_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `skkkzhan_athenahack2021_db` DEFAULT CHARACTER SET utf8 ;
USE `skkkzhan_athenahack2021_db` ;

-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`users` (
  `userid` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `portfolio` VARCHAR(4000) NULL DEFAULT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT NULL,
  `isDoctor` TINYINT(4) NOT NULL DEFAULT '0' COMMENT 'If the user is a doctor, 0 for no, 1 for yes',
  `emergencycontact1` JSON NULL DEFAULT NULL,
  `emergencycontact2` JSON NULL DEFAULT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'All registered users\' information';


-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`chats` (
  `idchats` INT(11) NOT NULL AUTO_INCREMENT,
  `from` INT(11) NOT NULL,
  `to` INT(11) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `sent_time` DATETIME NOT NULL,
  `isImage` TINYINT(4) NOT NULL DEFAULT '0' COMMENT 'If this chat sends an image, 0 for no, 1 for yes, default no',
  PRIMARY KEY (`idchats`),
  INDEX `fk_chats_users_idx` (`from` ASC) VISIBLE,
  INDEX `fk_chats_users1_idx` (`to` ASC) VISIBLE,
  CONSTRAINT `fk_chats_users`
    FOREIGN KEY (`from`)
    REFERENCES `skkkzhan_athenahack2021_db`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chats_users1`
    FOREIGN KEY (`to`)
    REFERENCES `skkkzhan_athenahack2021_db`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`blogs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`blogs` (
  `idblogs` INT(11) NOT NULL,
  `content` VARCHAR(4000) NOT NULL,
  `userid` INT(11) NOT NULL,
  PRIMARY KEY (`idblogs`),
  INDEX `fk_blogs_users1_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_blogs_users1`
    FOREIGN KEY (`userid`)
    REFERENCES `skkkzhan_athenahack2021_db`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`tags` (
  `idtags` INT(11) NOT NULL,
  `tagname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtags`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`likes` (
  `userid` INT(11) NOT NULL,
  `blogid` INT(11) NOT NULL,
  INDEX `fk_likes_users1_idx` (`userid` ASC) VISIBLE,
  INDEX `fk_likes_blogs1_idx` (`blogid` ASC) VISIBLE,
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`userid`)
    REFERENCES `skkkzhan_athenahack2021_db`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likes_blogs1`
    FOREIGN KEY (`blogid`)
    REFERENCES `skkkzhan_athenahack2021_db`.`blogs` (`idblogs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `skkkzhan_athenahack2021_db`.`blog_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skkkzhan_athenahack2021_db`.`blog_tag` (
  `blogid` INT(11) NOT NULL,
  `tagid` INT(11) NOT NULL,
  INDEX `fk_blog_tag_blogs1_idx` (`blogid` ASC) VISIBLE,
  INDEX `fk_blog_tag_tags1_idx` (`tagid` ASC) VISIBLE,
  CONSTRAINT `fk_blog_tag_blogs1`
    FOREIGN KEY (`blogid`)
    REFERENCES `skkkzhan_athenahack2021_db`.`blogs` (`idblogs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_blog_tag_tags1`
    FOREIGN KEY (`tagid`)
    REFERENCES `skkkzhan_athenahack2021_db`.`tags` (`idtags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
