import * as Clipboard from 'expo-clipboard';

import i18n from '@/i18n';

import { toast } from './toast';

export async function copyToClipboard(text: string): Promise<void> {
  await Clipboard.setStringAsync(text);
  toast(i18n.t('common.copied'));
}

export async function getFromClipboard(): Promise<string> {
  return await Clipboard.getStringAsync();
}
