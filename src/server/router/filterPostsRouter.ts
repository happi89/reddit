import { TRPCError } from '@trpc/server';
// import { z } from 'zod';
import { createRouter } from './context';

export const filterPostsRouter = createRouter()
	.query('getOldest', {
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
						createdAt: 'asc',
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.query('mostLiked', {
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
						comments: true,
						_count: {
							select: { comments: true },
						},
					},
					orderBy: {
						votes: {
							_count: 'desc',
						},
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.query('leastLiked', {
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
						comments: true,
						_count: {
							select: { comments: true },
						},
					},
					orderBy: {
						votes: {
							_count: 'asc',
						},
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.query('mostComments', {
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
						comments: true,
						_count: {
							select: { comments: true },
						},
					},
					orderBy: {
						comments: {
							_count: 'desc',
						},
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
