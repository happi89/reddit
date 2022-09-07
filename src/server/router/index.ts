// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { postsRouter } from './postsRouter';
import { commentsRouter } from './commentsRouter';
import { filterPostsRouter } from './filterPostsRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('post.', postsRouter)
	.merge('comment.', commentsRouter)
	.merge('filterPosts.', filterPostsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
