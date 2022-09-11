import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import Image from 'next/image';
import Loader from '../../../../public/Reload-1s-200px.svg';
// import { useState } from 'react';
// import FilterPosts from '../../../components/FilterPosts';
import { SinglePost } from '../..';
import { useSession } from 'next-auth/react';

const SubRedditPage = () => {
	// const [filter, setFilter] = useState('');
	const { data: session } = useSession();
	const router = useRouter();
	const { subreddit } = router.query;

	const { data, isLoading } = trpc.useQuery([
		'subreddit.getOne',
		{ name: String(subreddit) },
	]);

	const { data: posts, isLoading: isLoading2 } = trpc.useQuery([
		'post.getAllBySubReddit',
		{ subRedditId: Number(data?.id) },
	]);

	if (isLoading || isLoading2)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	console.log(data);

	return (
		<div className='container mx-auto mt-8 max-w-[72rem]'>
			<div className='navbar mb-8'>
				<div className='flex flex-col items-start w-[89%]'>
					<div className='w-full flex justify-between'>
						<h1 className='text-3xl font-bold mb-1'>{data?.name}</h1>
						<button className='btn btn-primary text-lg'>Join</button>
					</div>
					<h2 className='text-xl mb-1'>{data?.description}</h2>
					<h3 className='text-lg mb-1'>
						Created {String(data?.createdAt).slice(0, 15)}
					</h3>
					<p>
						{data?._count.users} user(s) & {data?._count.posts} post(s)
					</p>
				</div>
			</div>
			<div className='max-w-[64rem]'>
				<h2 className='text-2xl font-bold mb-4'>Posts</h2>
				{/* <FilterPosts setFilter={setFilter} /> */}
				{posts?.map((p, i: number) => {
					// const voted = posts?.find((vote) => vote.userId === session?.user?.id);
					return (
						<SinglePost
							key={i}
							post={p}
							showDelete={p.user?.id === session?.user?.id}
							// voted={voted ? true : false}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SubRedditPage;
