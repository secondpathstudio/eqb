import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getOne: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findFirst();
  }),
});
