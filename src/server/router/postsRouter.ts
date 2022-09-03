import { z } from 'zod';
import { createRouter } from './context';

export const postRouter = createRouter()
	.query('getOne', {
		input: z.object({
			id: z.number(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.post.findUnique({ where: { id: input?.id } });
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
						body: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
				});
			} catch (err) {
				console.log('error', err);
			}
		},
	});
