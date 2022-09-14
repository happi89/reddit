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
			voteType: z.enum(['UPVOTE', 'DOWNVOTE']),
		}),
		async resolve({ ctx, input }) {
			try {
				const votes = await ctx.prisma.vote.findMany({
					where: { userId: ctx.session?.user?.id },
				});
				const voteExists = votes.find(
					(vote: Vote) => input.commentId === vote.commentId
				);

				if (voteExists) {
					if (voteExists.voteType !== input.voteType) {
						return await ctx.prisma.vote.upsert({
							where: {
								id: Number(voteExists.id),
							},
							update: {
								voteType: input.voteType,
							},
							create: {
								voteType: input.voteType,
								user: {
									connect: { id: ctx.session?.user?.id },
								},
								comment: {
									connect: { id: input.commentId },
								},
							},
						});
					}

					return await ctx.prisma.vote.delete({
						where: { id: Number(voteExists?.id) },
					});
				}
			} catch (err) {
				console.log('Error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.mutation('postVote', {
		input: z.object({
			postId: z.number(),
			voteType: z.enum(['UPVOTE', 'DOWNVOTE']),
		}),
		async resolve({ ctx, input }) {
			try {
				const votes = await ctx.prisma.vote.findMany({
					where: { userId: ctx.session?.user?.id },
				});

				const voteExists = votes.find(
					(vote: Vote) => input.postId === vote.postId
				);

				if (voteExists) {
					if (voteExists?.voteType !== input.voteType) {
						return await ctx.prisma.vote.upsert({
							where: {
								id: Number(voteExists.id),
							},
							update: {
								voteType: input.voteType,
							},
							create: {
								voteType: input.voteType,
								user: {
									connect: { id: ctx.session?.user?.id },
								},
								post: {
									connect: { id: input.postId },
								},
							},
						});
					}

					return await ctx.prisma.vote.delete({
						where: { id: Number(voteExists?.id) },
					});
				}
			} catch (err) {
				console.log('Error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
