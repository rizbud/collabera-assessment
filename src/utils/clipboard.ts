import * as Clipboard from 'expo-clipboard';

import { toast } from './toast';

export async function copyToClipboard(text: string): Promise<void> {
  await Clipboard.setStringAsync(text);
  toast('Copied to clipboard');
}

export async function getFromClipboard(): Promise<string> {
  return await Clipboard.getStringAsync();
}
