// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Reddit Clone</title>
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<footer className='footer footer-center p-4 bg-base-100 text-base-content absolute bottom-0'>
				<div>
					<p>
						Made By Happi89. Source on{' '}
						<a
							className='link'
							href='https://github.com/happi89/reddit'
							target='_blank'
							rel='noreferrer'>
							Github
						</a>
					</p>
				</div>
			</footer>
		</SessionProvider>
	);
};

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
	config() {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({ url }),
			],
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
