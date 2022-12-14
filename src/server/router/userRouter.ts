import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const userRouter = createRouter()
	.query('getOne', {
		input: z.object({
			name: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.user.findUnique({
					where: {
						name: input.name,
					},
					include: {
						posts: true,
						comments: true,
						subRedditsJoined: true,
						_count: {
							select: { comments: true, posts: true, subRedditsJoined: true },
						},
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.mutation('addBio', {
		input: z.object({
			bio: z.string(),
			name: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.user.upsert({
				where: {
					id: ctx.session?.user?.id,
				},
				create: {
					bio: input.bio,
					name: input.name,
				},
				update: {
					bio: input.bio,
					name: input.name,
				},
			});
		},
	});
