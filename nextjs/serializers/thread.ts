import { MessageWithAuthor } from '../types/partialTypes';
import serializeMessage, { SerializedMessage } from './message';

import type { channels, threads } from '@prisma/client';

interface SerializedChannel {
  channelName: string;
  hidden: boolean;
  default: boolean;
}

export interface SerializedThread extends Omit<threads, 'sentAt'> {
  id: string;
  sentAt: string;
  messages: SerializedMessage[];
  channel: SerializedChannel | null;
}

type ThreadForSerialization = threads & {
  messages?: MessageWithAuthor[];
  channel?: channels;
};

function serializeChannel(channel?: channels): SerializedChannel | null {
  if (!channel) {
    return null;
  }
  return {
    channelName: channel.channelName,
    hidden: channel.hidden,
    default: channel.default,
  };
}

function serializeMessages(
  messages?: MessageWithAuthor[]
): SerializedMessage[] {
  if (!messages) {
    return [];
  }
  return messages.map(serializeMessage);
}

export default function serialize(
  thread: ThreadForSerialization
): SerializedThread {
  return {
    ...thread,
    sentAt: thread.sentAt.toString(),
    channel: serializeChannel(thread.channel),
    messages: serializeMessages(thread.messages),
  };
}
