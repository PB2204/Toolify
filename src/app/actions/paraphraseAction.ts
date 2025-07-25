'use server';

import { paraphrase, type ParaphraseFlowInput } from '@/ai/flows/paraphrase';
import { z } from 'zod';

const paraphraseSchema = z.object({
  text: z.string().min(10, { message: 'Please enter at least 10 characters.' }).max(2000),
  useAi: z.boolean(),
});

export type ParaphraseState = {
  result?: string;
  error?: string;
};

export async function paraphraseAction(
  prevState: ParaphraseState,
  formData: FormData
): Promise<ParaphraseState> {
  const validatedFields = paraphraseSchema.safeParse({
    text: formData.get('text'),
    useAi: formData.get('useAi') === 'true',
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.text?.[0] || 'Invalid input.',
    };
  }

  try {
    const output = await paraphrase(validatedFields.data);
    return { result: output };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
