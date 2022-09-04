import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const postRouter = createRouter()
	.query('getOne', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.post.findUnique({
					where: { id: input?.id },
					select: {
						id: true,
						title: true,
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						body: true,
						createdAt: true,
					},
				});
			} catch (err) {
				console.log('error', err);
			}
		},
	})
	.query('getAll', {
		async resolve({ ctx }) {
			try {
				return await ctx.prisma.post.findMany({
					select: {
						id: true,
						title: true,
						user: {
							select: {
								name: true,
							},
						},
						body: true,
						createdAt: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
				});
			} catch (err) {
				console.log('error', err);
			}
		},
	})
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.mutation('addPost', {
		input: z.object({
			title: z.string(),
			body: z.string(),
			userId: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				await ctx.prisma.post.create({
					data: {
						title: input.title,
						body: input.body,
						userId: input.userId,
					},
				});
			} catch (err) {
				console.log('error', err);
			}
		},
	})
	.mutation('deletePost', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.post.delete({
				where: {
					id: input.id,
				},
			});
		},
	});
