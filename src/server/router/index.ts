// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { postsRouter } from './postsRouter';
import { commentsRouter } from './commentsRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('post.', postsRouter)
	.merge('comment.', commentsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
