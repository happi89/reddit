import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const subRedditRouter = createRouter()
	.query('getOne', {
		input: z.object({
			name: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.subReddit.findUnique({
					where: {
						name: input.name,
					},
					include: {
						posts: true,
						_count: {
							select: {
								users: true,
								posts: true,
							},
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
	.mutation('addSubreddit', {
		input: z.object({
			name: z.string(),
			description: z.string(),
			adminId: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.subReddit.create({
					data: {
						name: input.name,
						description: input.description,
						admin: { connect: { id: input.adminId } },
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
