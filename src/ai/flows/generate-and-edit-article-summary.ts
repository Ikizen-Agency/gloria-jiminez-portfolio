'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically generating and editing article summaries.
 *
 * It includes:
 * - generateAndEditArticleSummary: The main function to generate and edit article summaries.
 * - GenerateAndEditArticleSummaryInput: The input type for the generateAndEditArticleSummary function.
 * - GenerateAndEditArticleSummaryOutput: The output type for the generateAndEditArticleSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAndEditArticleSummaryInputSchema = z.object({
  articleContent: z.string().describe('The full content of the article.'),
});
export type GenerateAndEditArticleSummaryInput = z.infer<typeof GenerateAndEditArticleSummaryInputSchema>;

const GenerateAndEditArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the article content.'),
});
export type GenerateAndEditArticleSummaryOutput = z.infer<typeof GenerateAndEditArticleSummaryOutputSchema>;

export async function generateAndEditArticleSummary(
  input: GenerateAndEditArticleSummaryInput
): Promise<GenerateAndEditArticleSummaryOutput> {
  return generateAndEditArticleSummaryFlow(input);
}

const generateArticleSummaryPrompt = ai.definePrompt({
  name: 'generateArticleSummaryPrompt',
  input: {schema: GenerateAndEditArticleSummaryInputSchema},
  output: {schema: GenerateAndEditArticleSummaryOutputSchema},
  prompt: `You are an experienced editor tasked with creating a compelling and concise summary of a news article.  Please read the following article and generate a summary that captures the main points and key details, designed to entice readers.

Article Content:
{{{articleContent}}}

Summary:`, 
});

const generateAndEditArticleSummaryFlow = ai.defineFlow(
  {
    name: 'generateAndEditArticleSummaryFlow',
    inputSchema: GenerateAndEditArticleSummaryInputSchema,
    outputSchema: GenerateAndEditArticleSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateArticleSummaryPrompt(input);
    return output!;
  }
);
