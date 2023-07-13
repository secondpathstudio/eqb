import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { TrainingLevel } from "./openai";

export const questionsRouter = createTRPCRouter({
  getOne: privateProcedure
  .input(
    z.object({
      id: z.string(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.question.findFirst({
      where: {
        id: input.id,
      },
      include: {
        answers: true,
      },
    });
  }),

  getQuestionVote: privateProcedure
  .input(
    z.object({
      questionId: z.string(),
    })
  ).query(({ ctx, input }) => {
    const userId = ctx.currentUser;
    return ctx.prisma.questionVote.findUnique({
      where: {
        userId_questionId: {
          userId: userId,
          questionId: input.questionId,
        }
      }
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
            explanation: z.string()
          })
        ),
        aiModelUsed: z.string(),
        topic: z.string(),
        trainingLevel: z.enum([TrainingLevel["MedicalStudent"], TrainingLevel["Resident"], TrainingLevel["Attending"]]),
      })
    )
    .mutation(async ({ctx, input}) => {
      console.log('Saving Question', input)
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

      return question;
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

        //TODO remove old vote if it exists
        const vote = await ctx.prisma.questionVote.upsert({
          where: {
            userId_questionId: {
              userId: userId,
              questionId: input.questionId,
            }
          },
          update: {
            approved: true
          },
          create: {
            userId: userId,
            questionId: input.questionId,
            approved: true,
          },
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

        //TODO remove old vote if it exists
        const vote = await ctx.prisma.questionVote.upsert({
          where: {
            userId_questionId: {
              userId: userId,
              questionId: input.questionId,
            }
          },
          update: {
            approved: false
          },
          create: {
            userId: userId,
            questionId: input.questionId,
            approved: false,
          },
        })
      })
});
