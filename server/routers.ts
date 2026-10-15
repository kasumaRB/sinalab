import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { getMarketSnapshot } from "./db";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: router({
    health: publicProcedure.query(() => ({ status: "ok", service: "signal-lab" })),
  }),
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  market: router({
    snapshot: publicProcedure.query(() => getMarketSnapshot()),
    refresh: publicProcedure.mutation(() => ({ refreshedAt: new Date().toISOString(), mode: "demo" as const })),
  }),
});

export type AppRouter = typeof appRouter;
