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
						users: { select: { id: true } },
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
	.query('getAll', {
		async resolve({ ctx }) {
			try {
				return await ctx.prisma.subReddit.findMany({
					select: {
						name: true,
						id: true,
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
						users: { connect: { id: input.adminId } },
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.mutation('joinSubreddit', {
		input: z.object({
			subredditId: z.number(),
			joined: z.boolean(),
		}),
		async resolve({ ctx, input }) {
			try {
				if (input.joined) {
					return await ctx.prisma.subReddit.update({
						where: {
							id: input.subredditId,
						},
						data: {
							users: { disconnect: { id: ctx?.session?.user?.id } },
						},
					});
				}
				return await ctx.prisma.subReddit.update({
					where: {
						id: input.subredditId,
					},
					data: {
						users: { connect: { id: ctx?.session?.user?.id } },
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
