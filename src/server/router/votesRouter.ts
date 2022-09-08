import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const votesRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.mutation('commentVote', {
		input: z.object({
			commentId: z.number(),
			value: z.number().min(-1).max(1),
		}),
		async resolve({ ctx, input }) {
			try {
				const votes = await ctx.prisma.vote.findMany({
					where: { userId: ctx.session?.user?.id },
				});
				const voteExists = votes.find(
					(vote: Vote) => input.commentId === vote.commentId
				);

				if (input.value === 0) {
					return await ctx.prisma.vote.delete({
						where: { id: Number(voteExists?.id) },
					});
				}

				if (voteExists) {
					return await ctx.prisma.vote.update({
						where: {
							id: Number(voteExists.id),
						},
						data: {
							value: input.value,
						},
					});
				}

				return await ctx.prisma.vote.create({
					data: {
						value: input.value,
						user: {
							connect: { id: ctx.session?.user?.id },
						},
						comment: {
							connect: { id: input.commentId },
						},
					},
				});
			} catch (err) {
				console.log('Error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.mutation('postVote', {
		input: z.object({
			postId: z.number(),
			value: z.number().min(-1).max(1),
		}),
		async resolve({ ctx, input }) {
			try {
				const votes = await ctx.prisma.vote.findMany({
					where: { userId: ctx.session?.user?.id },
				});
				const voteExists = votes.find(
					(vote: Vote) => input.postId === vote.postId
				);

				if (input.value === 0) {
					return await ctx.prisma.vote.delete({
						where: { id: Number(voteExists?.id) },
					});
				}

				if (voteExists) {
					return await ctx.prisma.vote.update({
						where: {
							id: Number(voteExists.id),
						},
						data: {
							value: voteExists.value + input.value,
						},
					});
				}

				return await ctx.prisma.vote.create({
					data: {
						value: input.value,
						user: {
							connect: { id: ctx.session?.user?.id },
						},
						post: {
							connect: { id: input.postId },
						},
					},
				});
			} catch (err) {
				console.log('Error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
