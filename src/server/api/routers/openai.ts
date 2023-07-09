import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

//3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
})

export enum TrainingLevel {
  MedicalStudent = "medicalstudent",
  Resident = "resident",
  Attending = "attending"
}

export const openaiRouter = createTRPCRouter({
  generateQuestion: privateProcedure
    .input(
      z.object({
        topic: z.string(),
        trainingLevel: z.enum([TrainingLevel.MedicalStudent, TrainingLevel.Resident, TrainingLevel.Attending]),
      })
    )
    .mutation(async ({ctx, input: {topic, trainingLevel}}) => {
      console.log('Generating Question')
      const userId = ctx.currentUser;

      const {success} = await ratelimit.limit(userId);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }
      
      const prompt = `Create a question for a ${trainingLevel} studying for a ${topic} exam. Please include the question and 4 answers. 
        Please make sure the question is appropriate for the training level. Please return the response in the following JSON format: 
        {
          "questionText": "What is the most common cause of death in the United States?",
          "answers": [
            {
              "answerText": "Heart Disease",
              "isCorrect": true
            }
          ]
        }`
      
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 500,
        messages: [
            {
                "role": "system",
                "content": prompt
            }
        ]
      })

      interface IOpenAiResponse {
        questionText: string,
        answers: {
          answerText: string,
          isCorrect: boolean
        }[],
      }

      if (!response.data.choices) throw new Error("No response from OpenAI.")

      let jsonResponses: IOpenAiResponse
      if (response.data.choices[0]?.message?.content) {
        jsonResponses = JSON.parse(response.data.choices[0]?.message?.content) as IOpenAiResponse
      } else {
        throw new Error("Unable to parse JSON from OpenAI response.")
      }

      const questionText = jsonResponses.questionText
      const answers = jsonResponses.answers

        return {
          questionText: questionText,
          answers: answers,
          topic: topic,
          trainingLevel: trainingLevel,
          aiModelUsed: "gpt-4",
        }
    })
});
