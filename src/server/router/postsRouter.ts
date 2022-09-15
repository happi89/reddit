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
						subReddit: {
							select: {
								name: true,
								id: true,
							},
						},
						votes: true,
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
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						subReddit: {
							select: {
								name: true,
								id: true,
							},
						},
						votes: true,
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
	.query('getAllBySubReddit', {
		input: z.object({
			subRedditId: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.post.findMany({
					where: {
						subRedditId: input.subRedditId,
					},
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						subReddit: {
							select: {
								name: true,
								id: true,
							},
						},
						votes: true,
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
	.query('getAllByUsers', {
		input: z.object({
			userId: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.post.findMany({
					where: {
						userId: input.userId,
					},
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						subReddit: {
							select: {
								name: true,
								id: true,
							},
						},
						votes: true,
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
			body: z.string().optional(),
			userId: z.string(),
			subRedditName: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				await ctx.prisma.post.create({
					data: {
						title: input.title,
						body: input.body,
						user: { connect: { id: input.userId } },
						subReddit: { connect: { name: input.subRedditName } },
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
			body: z.string().optional(),
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
