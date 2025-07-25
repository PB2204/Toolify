'use server';
/**
 * @fileOverview A paraphrasing AI agent.
 *
 * - paraphraseFlow - A function that handles the paraphrasing process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ParaphraseFlowInputSchema = z.object({
  text: z.string(),
  useAi: z.boolean(),
});
export type ParaphraseFlowInput = z.infer<typeof ParaphraseFlowInputSchema>;

const ParaphraseFlowOutputSchema = z.string();
export type ParaphraseFlowOutput = z.infer<typeof ParaphraseFlowOutputSchema>;

export async function paraphrase(input: ParaphraseFlowInput): Promise<ParaphraseFlowOutput> {
  return paraphraseFlow(input);
}

// Rule-based fallback function
function ruleBasedParaphrase(text: string): string {
    const synonyms: { [key: string]: string[] } = {
        'important': ['crucial', 'vital', 'significant'],
        'show': ['demonstrate', 'illustrate', 'reveal'],
        'help': ['assist', 'support', 'aid'],
        'use': ['utilize', 'employ', 'apply'],
        'good': ['excellent', 'fine', 'satisfactory'],
        'new': ['modern', 'latest', 'recent']
    };

    let words = text.split(' ');
    let paraphrasedWords = words.map(word => {
        let lowerWord = word.toLowerCase();
        if (synonyms[lowerWord] && Math.random() > 0.5) {
            const possibleSynonyms = synonyms[lowerWord];
            return possibleSynonyms[Math.floor(Math.random() * possibleSynonyms.length)];
        }
        return word;
    });

    return paraphrasedWords.join(' ');
}

const paraphraseAIPrompt = ai.definePrompt({
  name: 'paraphraseAIPrompt',
  prompt: `You are an expert paraphraser. Your task is to rewrite the following text to be unique and avoid plagiarism while maintaining the original meaning, tone, and key information. Do not add any new information or your own opinions. Output only the paraphrased text.

Original text:
"""
{{{text}}}
"""

Paraphrased text:
`,
  input: {
    schema: z.object({ text: z.string() }),
  },
  output: {
    schema: z.string(),
  },
  config: {
    temperature: 0.7,
  }
});


const paraphraseFlow = ai.defineFlow(
  {
    name: 'paraphraseFlow',
    inputSchema: ParaphraseFlowInputSchema,
    outputSchema: ParaphraseFlowOutputSchema,
  },
  async ({ text, useAi }) => {
    if (!useAi) {
      return ruleBasedParaphrase(text);
    }
    const {output} = await paraphraseAIPrompt({text});
    return output!;
  }
);
