import { ai } from '../genkit';
import { defineFlow, run } from 'genkit';
import { z } from 'zod';

// Define the model to use for paraphrasing
const paraphraseModel = ai.model('googleai/gemini-2.0-flash');

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


export const paraphraseFlow = defineFlow(
  {
    name: 'paraphraseFlow',
    inputSchema: z.object({ text: z.string(), useAi: z.boolean() }),
    outputSchema: z.string(),
  },
  async ({ text, useAi }) => {
    if (!useAi) {
      return run('rule-based-paraphrase', () => ruleBasedParaphrase(text));
    }

    return await run('ai-paraphrase', async () => {
      const prompt = `You are an expert paraphraser. Your task is to rewrite the following text to be unique and avoid plagiarism while maintaining the original meaning, tone, and key information. Do not add any new information or your own opinions. Output only the paraphrased text.

Original text:
"""
${text}
"""

Paraphrased text:
`;
      const result = await paraphraseModel.generate({
        prompt,
        config: {
            temperature: 0.7,
        }
      });
      return result.text();
    });
  }
);
