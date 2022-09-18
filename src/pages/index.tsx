import FilterPosts from './../components/FilterPosts';
import { Votes } from './../components/Votes';
import type { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';
import PostedBy from '../components/PostedBy';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Loader from '../../public/Reload-1s-200px.svg';
import { Post, Vote } from '@prisma/client';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const Home: NextPage = () => {
	return (
		<>
			<main className='container min-h-screen mx-auto mt-12 md:px-8'>
				<Posts />
			</main>
		</>
	);
};

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

	console.log(posts);

	const { data: session } = useSession();

	if (isLoading)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	return (
		<div className='max-w-[72rem] px-2'>
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
	post: Post & {
		user: {
			id: string;
			name: string | null;
		};
		subReddit: {
			name: string;
			id: number;
		};
		votes: Vote[];
		_count: {
			comments: number;
		};
	};
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
		<div className='bg-base-200 border-[1px] border-gray rounded-md mb-6 flex max-w-[72rem]'>
			<Votes votes={post.votes} postId={post.id} />
			<div className='p-5 w-full pr-8'>
				<Link href={`/r/${post.subReddit.name}/posts/${post.id}`}>
					<div className='cursor-pointer'>
						<PostedBy
							name={post.user.name ? post.user.name : ''}
							date={post.createdAt}
							subRedditName={post?.subReddit?.name}
						/>
						<h2 className='text-xl mb-4'>{post.title}</h2>
						<p className=''>{post.body}</p>
					</div>
				</Link>
				<div className='w-full flex gap-4 mt-3 items-center min-w-full justify-between'>
					<p className='text-gray'>{post._count.comments} comments</p>
					{showDelete ? (
						<div className='btn-group'>
							<button
								className='btn btn-ghost btn-sm hover:bg-base-200'
								onClick={() => router.push(`/edit/post/${post.id}`)}>
								<PencilSquareIcon className='text-gray h-6 w-6 hover:text-primary' />
							</button>
							<button
								className='btn btn-ghost btn-sm hover:bg-base-200'
								type='button'
								onClick={() => {
									if (window.confirm(`Do you want to delete ${post.title}`)) {
										deletePost.mutate({
											id: post.id,
										});
										router.push('/');
									}
								}}>
								<TrashIcon className='text-gray h-6 w-6 hover:text-primary' />
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Home;
