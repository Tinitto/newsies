/**
 * Limits the text to a given number of characters
 * @param text - the text to be truncated if too long
 * @param characterLimit - the maximum number of characters allowed
 */
export const limitTextTo = (text: string, characterLimit: number) =>
  text &&
  `${text.slice(0, characterLimit)}${
    text.length > characterLimit ? '...' : ''
  }`;
