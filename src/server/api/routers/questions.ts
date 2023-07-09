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

  getRandom: publicProcedure.query(async ({ ctx }) => {
    const questionCount = await ctx.prisma.question.count();
    const skip = Math.max(0, Math.floor(Math.random() * questionCount));

    return ctx.prisma.question.findFirst({
      include: {
        answers: true,
      },
      skip: skip,
    });
  }),

  saveOne: privateProcedure
    .input(
      z.object({
        questionText: z.string(),
        answers: z.array(
          z.object({
            answerText: z.string(),
            isCorrect: z.boolean(),
            numberOfSelections: z.number().default(0),
          })
        ),
        aiModelUsed: z.string(),
        topic: z.string(),
        trainingLevel: z.enum(["medicalStudent", "resident", "attending"]),
      })
    )
    .mutation(async ({ctx, input}) => {
      console.log('Saving Question')
      const userId = ctx.currentUser;
      const question = await ctx.prisma.question.create({
        data: {
          questionText: input.questionText,
          answers: {
            createMany: {
              data: input.answers,
            }
          },
          topic: input.topic,
          trainingLevel: input.trainingLevel,
          aiModelUsed: input.aiModelUsed,
          numberOfCorrectAnswers: 0,
          numberOfIncorrectAnswers: 0,
          approvals: 0,
          disapprovals: 0,
        }
      })
    }),

    upvoteQuestion: privateProcedure
      .input(
        z.object({
          questionId: z.string(),
        })
      )
      .mutation(async ({ctx, input}) => {
        console.log('Upvoting Question')
        const userId = ctx.currentUser;
        const question = await ctx.prisma.question.update({
          where: {
            id: input.questionId,
          },
          data: {
            approvals: {
              increment: 1,
            }
          }
        })
      }),

      downvoteQuestion: privateProcedure
      .input(
        z.object({
          questionId: z.string(),
        })
      )
      .mutation(async ({ctx, input}) => {
        console.log('Upvoting Question')
        const userId = ctx.currentUser;
        const question = await ctx.prisma.question.update({
          where: {
            id: input.questionId,
          },
          data: {
            disapprovals: {
              increment: 1,
            }
          }
        })
      })
});
