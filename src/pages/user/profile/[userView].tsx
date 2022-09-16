import { useRouter } from 'next/router';
import { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import { trpc } from '../../../utils/trpc';
import Image from 'next/image';
import Loader from '../../../../public/Reload-1s-200px.svg';
import UserInfo from './../../../components/UserInfo';
// import { SinglePost } from '../..';
// import { useSession } from 'next-auth/react';

const ViewUser = () => {
	const [title, setTitle] = useState('Profile');
	const router = useRouter();
	const { userView } = router.query;

	// const { data: session } = useSession();

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
			{title === 'Profile' ? (
				<UserInfo
					count={user?._count}
					createdAt={user?.createdAt}
					name={user?.name || ''}
					bio={user?.bio || ''}
				/>
			) : (
				''
			)}
			{/* {title === 'Posts'
				? ''
				: posts.map((post) => (
						<SinglePost
							key={post.id}
							post={post}
							showDelete={post.user?.id === session?.user?.id}
						/>
				  ))} */}
		</div>
	);
};

export default ViewUser;
