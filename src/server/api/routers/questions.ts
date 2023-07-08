import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getOne: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findFirst({
      include: {
        answers: true,
      },
    });
  }),

  createOne: privateProcedure
    .input(
      z.object({
        questionText: z.string(),
        prompt: z.string(),
        aiModelUsed: z.string(),
      })
    )
    .mutation(async ({ctx, input}) => {
      const userId = ctx.currentUser.id;
      const question = await ctx.prisma.question.create({
        data: {
          questionText: input.questionText,
          prompt: input.prompt,
          aiModelUsed: input.aiModelUsed,
          numberOfCorrectAnswers: 0,
          numberOfIncorrectAnswers: 0,
          approvals: 0,
          disapprovals: 0,
        }
      })
    })
});
