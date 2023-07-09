import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const openaiRouter = createTRPCRouter({
  generateQuestion: privateProcedure
    .input(
      z.object({
        specialty: z.string(),
        trainingLevel: z.enum(["medicalStudent", "resident", "attending"]),
      })
    )
    .mutation(async ({ctx, input}) => {
      const userId = ctx.currentUser.id;
      const prompt: string = `Create a question for a ${input.trainingLevel} studying for a ${input.specialty} exam.`
      
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

        return response.data.choices[0]?.message?.content;
    })
});
