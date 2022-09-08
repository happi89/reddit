import FilterPosts from './../components/FilterPosts';
import { Votes } from './../components/Votes';
import type { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import { Post, Vote } from '@prisma/client';
import { useRouter } from 'next/router';
import PostedBy from '../components/PostedBy';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Loader from '../../public/Reload-1s-200px.svg';

const Home: NextPage = () => {
	return (
		<>
			<main className='container mx-auto min-h-screen p-4'>
				<Posts />
			</main>
		</>
	);
};

interface PostWithUser extends Post {
	user: {
		name: string | null;
		id: string;
	};
	_count: {
		comments: number;
	};
	votes: [Vote];
}

const Posts = () => {
	const [filter, setFilter] = useState('newest');
	const { data: posts, isLoading } =
		filter === 'newest'
			? trpc.useQuery(['post.getAll'])
			: filter === 'oldest'
			? trpc.useQuery(['filterPosts.getOldest'])
			: filter === 'most likes'
			? trpc.useQuery(['filterPosts.mostLiked'])
			: filter === 'least likes'
			? trpc.useQuery(['filterPosts.leastLiked'])
			: trpc.useQuery(['filterPosts.mostComments']);

	const { data: session } = useSession();

	if (isLoading)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	return (
		<div className='max-w-[72rem]'>
			<FilterPosts setFilter={setFilter} />
			{posts?.map((p, i: number) => {
				const voted = posts?.find((vote) => vote.userId === session?.user?.id);
				return (
					<SinglePost
						key={i}
						post={p}
						showDelete={p.user?.id === session?.user?.id}
						voted={voted ? true : false}
					/>
				);
			})}
		</div>
	);
};

export const SinglePost = ({
	post,
	showDelete,
	voted,
}: {
	post: Omit<PostWithUser, 'updatedAt' | 'userId'>;
	showDelete: boolean;
	voted: boolean;
}) => {
	const router = useRouter();
	const ctx = trpc.useContext();
	const deletePost = trpc.useMutation('post.deletePost', {
		onMutate: () => {
			ctx.cancelQuery(['post.getAll']);
			ctx.cancelQuery(['post.getOne']);

			const optimisticUpdate = ctx.getQueryData(['post.getAll']);
			if (optimisticUpdate) {
				ctx.setQueryData(['post.getAll'], optimisticUpdate);
			}
		},
		onSettled: () => {
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	return (
		<div className='bg-base-200 border-[1px] border-gray rounded-md mb-6 flex'>
			<Votes votes={post.votes[0]?.value || 0} postId={post.id} voted={voted} />
			<div className='p-4 w-full'>
				<Link href={`/${post.id}`}>
					<div className='cursor-pointer'>
						<PostedBy
							name={post.user.name ? post.user.name : ''}
							date={post.createdAt}
						/>
						<h2 className='text-xl mb-2'>{post.title}</h2>
						<p className=''>{post.body}</p>
					</div>
				</Link>
				<div className='w-full flex gap-4 mt-3 items-center min-w-full justify-between'>
					<p className='text-gray'>{post._count.comments} comments</p>
					{showDelete ? (
						<div>
							<button
								className='btn btn-ghost btn-sm mr-3'
								onClick={() => router.push(`/edit/${post.id}`)}>
								Edit
							</button>
							<button
								className='btn btn-primary btn-sm'
								type='button'
								onClick={() => {
									if (window.confirm(`Do you want to delete ${post.title}`)) {
										deletePost.mutate({
											id: post.id,
										});
										router.push('/');
									}
								}}>
								Delete
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Home;
