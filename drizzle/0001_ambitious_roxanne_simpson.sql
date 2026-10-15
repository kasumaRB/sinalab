CREATE TABLE `market_analyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventExternalId` varchar(80) NOT NULL,
	`thesis` text NOT NULL,
	`confidence` int NOT NULL DEFAULT 0,
	`action` varchar(80) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `market_analyses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `market_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(16) NOT NULL,
	`name` varchar(120) NOT NULL,
	`priceText` varchar(32) NOT NULL,
	`changeText` varchar(32) NOT NULL,
	`volumeText` varchar(32) NOT NULL,
	`confidence` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `market_assets_id` PRIMARY KEY(`id`),
	CONSTRAINT `market_assets_symbol_unique` UNIQUE(`symbol`)
);
--> statement-breakpoint
CREATE TABLE `market_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(80) NOT NULL,
	`asset` varchar(16) NOT NULL,
	`eventType` enum('wallet_flow','publication','market','news') NOT NULL,
	`title` varchar(220) NOT NULL,
	`summary` text NOT NULL,
	`source` varchar(180) NOT NULL,
	`occurredAt` timestamp NOT NULL,
	`relevance` enum('high','medium','low') NOT NULL DEFAULT 'medium',
	`confidence` int NOT NULL DEFAULT 0,
	`confirmations` int NOT NULL DEFAULT 0,
	`reactionWindow` varchar(40) NOT NULL,
	`reactionDirection` enum('up','down','flat') NOT NULL DEFAULT 'flat',
	`reactionPercentage` varchar(24) NOT NULL,
	`status` enum('new','validated','simulated') NOT NULL DEFAULT 'new',
	`evidence` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `market_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `market_events_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
CREATE TABLE `market_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`category` varchar(80) NOT NULL,
	`status` enum('connected','demo','pending') NOT NULL DEFAULT 'pending',
	`coverage` varchar(180) NOT NULL,
	`freshness` varchar(48) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `market_sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `market_sources_name_unique` UNIQUE(`name`)
);
