import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, marketEvents, users } from "../drizzle/schema";
import { demoSnapshot } from "../shared/market";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] === undefined) continue;
    const value = user[field] ?? null;
    values[field] = value;
    updateSet[field] = value;
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPersistedEvents() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(marketEvents).orderBy(desc(marketEvents.occurredAt)).limit(12);
  } catch (error) {
    console.warn("[Database] Market event tables are not ready yet:", error);
    return [];
  }
}

export async function getMarketSnapshot() {
  const persistedEvents = await getPersistedEvents();
  if (persistedEvents.length === 0) return demoSnapshot;
  const eventIds = new Set(persistedEvents.map(event => event.externalId));
  const events = demoSnapshot.events.filter(event => !eventIds.has(event.id));
  return {
    ...demoSnapshot,
    mode: "live" as const,
    events: [
      ...persistedEvents.map(event => ({
        id: event.externalId,
        asset: event.asset,
        type: event.eventType,
        typeLabel: event.eventType === "wallet_flow" ? "Fluxo de carteira" : event.eventType === "publication" ? "Publicação" : event.eventType === "market" ? "Mercado" : "Notícia",
        title: event.title,
        summary: event.summary,
        source: event.source,
        occurredAt: event.occurredAt.toISOString(),
        ageLabel: "persistido",
        relevance: event.relevance,
        confidence: event.confidence,
        confirmations: event.confirmations,
        priceReaction: { window: event.reactionWindow, direction: event.reactionDirection, percentage: Number(event.reactionPercentage) || 0 },
        status: event.status,
        evidence: event.evidence.split("\n").filter(Boolean),
      })),
      ...events,
    ],
  };
}
