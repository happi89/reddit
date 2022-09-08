import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const commentsRouter = createRouter()
	.query('getAll', {
		input: z.object({
			postId: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.comment.findMany({
					where: {
						post: {
							id: input.postId,
						},
					},
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
						children: true,
						votes: true,
					},
				});
			} catch (err) {
				console.log('Error', err);
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
	.mutation('addComment', {
		input: z.object({
			postId: z.number(),
			body: z.string(),
			parentId: z.number().optional(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.comment.create({
					data: {
						body: input.body,
						user: { connect: { id: ctx?.session?.user?.id } },
						post: { connect: { id: input.postId } },
						...(input.parentId && {
							parent: { connect: { id: input.parentId } },
						}),
					},
				});
			} catch (err) {
				console.log('Error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.mutation('editComment', {
		input: z.object({
			body: z.string(),
			commentId: z.number(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.comment.update({
				where: {
					id: input.commentId,
				},
				data: {
					body: input.body,
				},
			});
		},
	})
	.mutation('deleteComment', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.comment.delete({
				where: {
					id: input.id,
				},
			});
		},
	});
