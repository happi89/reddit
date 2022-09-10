import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const subRedditRouter = createRouter().query('getOne', {
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
});
