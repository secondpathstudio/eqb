import { questionsRouter } from "~/server/api/routers/questions";
import { createTRPCRouter } from "~/server/api/trpc";
import { openaiRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  questions: questionsRouter,
  openai: openaiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
