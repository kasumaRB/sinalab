import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const marketAssets = mysqlTable("market_assets", {
  id: int("id").autoincrement().primaryKey(),
  symbol: varchar("symbol", { length: 16 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  priceText: varchar("priceText", { length: 32 }).notNull(),
  changeText: varchar("changeText", { length: 32 }).notNull(),
  volumeText: varchar("volumeText", { length: 32 }).notNull(),
  confidence: int("confidence").notNull().default(0),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const marketSources = mysqlTable("market_sources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull().unique(),
  category: varchar("category", { length: 80 }).notNull(),
  status: mysqlEnum("status", ["connected", "demo", "pending"]).notNull().default("pending"),
  coverage: varchar("coverage", { length: 180 }).notNull(),
  freshness: varchar("freshness", { length: 48 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const marketEvents = mysqlTable("market_events", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 80 }).notNull().unique(),
  asset: varchar("asset", { length: 16 }).notNull(),
  eventType: mysqlEnum("eventType", ["wallet_flow", "publication", "market", "news"]).notNull(),
  title: varchar("title", { length: 220 }).notNull(),
  summary: text("summary").notNull(),
  source: varchar("source", { length: 180 }).notNull(),
  occurredAt: timestamp("occurredAt").notNull(),
  relevance: mysqlEnum("relevance", ["high", "medium", "low"]).notNull().default("medium"),
  confidence: int("confidence").notNull().default(0),
  confirmations: int("confirmations").notNull().default(0),
  reactionWindow: varchar("reactionWindow", { length: 40 }).notNull(),
  reactionDirection: mysqlEnum("reactionDirection", ["up", "down", "flat"]).notNull().default("flat"),
  reactionPercentage: varchar("reactionPercentage", { length: 24 }).notNull(),
  status: mysqlEnum("status", ["new", "validated", "simulated"]).notNull().default("new"),
  evidence: text("evidence").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const marketAnalyses = mysqlTable("market_analyses", {
  id: int("id").autoincrement().primaryKey(),
  eventExternalId: varchar("eventExternalId", { length: 80 }).notNull(),
  thesis: text("thesis").notNull(),
  confidence: int("confidence").notNull().default(0),
  action: varchar("action", { length: 80 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export const rawEvents = mysqlTable("raw_events", {
  id: int("id").autoincrement().primaryKey(),
  source: varchar("source", { length: 180 }).notNull(),
  externalId: varchar("externalId", { length: 80 }).notNull().unique(),
  rawData: text("rawData").notNull(),
  collectedAt: timestamp("collectedAt").defaultNow().notNull(),
  processed: mysqlEnum("processed", ["pending", "completed", "failed"]).notNull().default("pending"),
});

export type RawEvent = typeof rawEvents.$inferSelect;
export type InsertRawEvent = typeof rawEvents.$inferInsert;
export type MarketEvent = typeof marketEvents.$inferSelect;
export type InsertMarketEvent = typeof marketEvents.$inferInsert;
