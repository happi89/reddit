// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { postsRouter } from './postsRouter';
import { commentsRouter } from './commentsRouter';
import { filterPostsRouter } from './filterPostsRouter';
import { votesRouter } from './votesRouter';
import { subRedditRouter } from './subRedditRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('post.', postsRouter)
	.merge('comment.', commentsRouter)
	.merge('filterPosts.', filterPostsRouter)
	.merge('vote.', votesRouter)
	.merge('subreddit.', subRedditRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
