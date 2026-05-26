-- BeastOnSolana Database Schema
-- Run this in phpMyAdmin → SQL tab → paste and Go

CREATE TABLE IF NOT EXISTS `site_config` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `contract_address` VARCHAR(100) DEFAULT 'TBA AT LAUNCH',
  `token_name` VARCHAR(100) DEFAULT 'Beast on Solana',
  `ticker` VARCHAR(20) DEFAULT '$BEASTSOL',
  `telegram` VARCHAR(100) DEFAULT 'beastonsolana',
  `twitter` VARCHAR(100) DEFAULT 'BeastOnSolfx',
  `holders` VARCHAR(20) DEFAULT NULL,
  `market_cap` VARCHAR(20) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO `site_config` (`id`, `contract_address`) VALUES (1, 'TBA AT LAUNCH');

CREATE TABLE IF NOT EXISTS `task_submissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  `tier` VARCHAR(20) NOT NULL,
  `x_handle` VARCHAR(100) NOT NULL,
  `wallet` VARCHAR(100) NOT NULL,
  `links` TEXT NOT NULL,
  `articles` TEXT,
  `status` VARCHAR(20) DEFAULT 'pending',
  `admin_notes` TEXT,
  `reward_tx` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `burns` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `milestone` INT(11) NOT NULL,
  `amount` INT(11) NOT NULL,
  `dev_remaining` INT(11) NOT NULL,
  `tx_hash` VARCHAR(200) NOT NULL,
  `solscan_url` VARCHAR(500) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `reward_distributions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `wallet` VARCHAR(100) NOT NULL,
  `amount` INT(11) NOT NULL,
  `tier` VARCHAR(50) NOT NULL,
  `bonus` INT(11) DEFAULT 0,
  `tx_hash` VARCHAR(200) NOT NULL,
  `solscan_url` VARCHAR(500) NOT NULL,
  `submission_id` INT(11) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
