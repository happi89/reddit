import { useRouter } from 'next/router';
import { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import { trpc } from '../../../utils/trpc';
import Image from 'next/image';
import Loader from '../../../../public/Reload-1s-200px.svg';

const ViewUser = () => {
	const [title, setTitle] = useState('Profile');
	const router = useRouter();
	const { userView } = router.query;

	const { data: user, isLoading } = trpc.useQuery([
		'user.getOne',
		{ name: String(userView) },
	]);

	if (isLoading)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	return (
		<div className='container mx-auto'>
			<UserNavbar
				title={title}
				setTitle={setTitle}
				tabs={['Profile', 'Posts', 'Comments', 'Subreddits']}
			/>
			<h1 className='text-2xl font-bold my-4'>
				{userView}&apos;s &nbsp;{title}
			</h1>
			{title === 'Profile' ? (
				<>
					<p>Joined {String(user?.createdAt).slice(0, 15)}</p>
					<p>posts: {user?._count.posts}</p>
					<p>comments: {user?._count.comments}</p>
					<p>subreddits joined: {user?._count.subRedditsJoined}</p>
				</>
			) : (
				<p>{title}</p>
			)}
		</div>
	);
};

export default ViewUser;
