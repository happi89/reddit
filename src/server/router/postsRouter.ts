import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const postsRouter = createRouter()
	.query('getOne', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.post.findUnique({
					where: { id: input?.id },
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						comments: true,
						_count: {
							select: { comments: true },
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
				return await ctx.prisma.post.findMany({
					select: {
						id: true,
						title: true,
						votes: true,
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						body: true,
						createdAt: true,
						_count: {
							select: { comments: true },
						},
					},
					orderBy: {
						createdAt: 'desc',
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
						user: { connect: { id: input.userId } },
						votes: 0,
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
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
	})
	.mutation('editPost', {
		input: z.object({
			title: z.string(),
			body: z.string(),
			postId: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				await ctx.prisma.post.update({
					where: {
						id: input.postId,
					},
					data: {
						title: input.title,
						body: input.body,
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
