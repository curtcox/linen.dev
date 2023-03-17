import { z } from 'zod';
import { ThreadState, ThreadStatus } from '..';

export const findThreadSchema = z.object({
  accountId: z.string().uuid(),
  channelId: z.string().uuid(),
  page: z.coerce.number().optional(),
  userId: z.string().optional(),
  status: z
    .enum([
      ThreadStatus.UNREAD,
      ThreadStatus.READ,
      ThreadStatus.MUTED,
      ThreadStatus.REMINDER,
    ])
    .optional(),
});

export type findThreadType = z.infer<typeof findThreadSchema>;

export const getThreadSchema = z.object({
  accountId: z.string().uuid(),
  id: z.string().uuid(),
});
export type getThreadType = z.infer<typeof getThreadSchema>;

export const updateThreadSchema = z.object({
  accountId: z.string().uuid().optional(),
  id: z.string().uuid(),
  state: z.enum([ThreadState.OPEN, ThreadState.CLOSE]).optional(),
  title: z.string().optional(),
  pinned: z.boolean().optional(),
  resolutionId: z.string().uuid().optional(),
  channelId: z.string().uuid().optional(),
  externalThreadId: z.string().optional(),
});
export type updateThreadType = z.infer<typeof updateThreadSchema>;

export const createThreadSchema = z.object({
  accountId: z.string().uuid(),
  channelId: z.string().uuid(),
  imitationId: z.string().optional(),
  body: z.string().min(1),
  title: z.string().optional(),
  files: z
    .array(
      z.object({
        id: z.string().min(1),
        url: z.string().min(1),
      })
    )
    .optional(),
});
export type createThreadType = z.infer<typeof createThreadSchema>;