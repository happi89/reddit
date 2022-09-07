import FilterPosts from './../components/FilterPosts';
import { Votes } from './../components/Votes';
import type { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import { Post } from '@prisma/client';
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
	};
	_count: {
		comments: number;
	};
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
				return (
					<SinglePost
						key={i}
						post={p}
						showDelete={p.user?.id === session?.user?.id}
					/>
				);
			})}
		</div>
	);
};

export const SinglePost = ({
	post,
	showDelete,
}: {
	post: Omit<PostWithUser, 'updatedAt' | 'userId'>;
	showDelete: boolean;
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
		<div className='bg-base-200 border-[1px] border-gray rounded-md p-4 mb-3 flex'>
			<Votes votes={post.votes} postId={post.id} />
			<div>
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
				<div className='flex gap-4 mt-3 items-center min-w-full'>
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
