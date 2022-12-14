import UserNavbar from './../../components/UserNavbar';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';
import Loader from '../../../public/Reload-1s-200px.svg';
import UserInfo from '../../components/UserInfo';
import { useRouter } from 'next/router';

const UserPage = () => {
	const [title, setTitle] = useState('User Settings');

	const router = useRouter();
	const { user: userName } = router.query;

	const { data: user, isLoading } = trpc.useQuery([
		'user.getOne',
		{ name: String(userName) },
	]);

	if (isLoading)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	if (!user) return <div>user not found</div>;

	const showInfo = (title: string) => {
		switch (title) {
			case 'User Settings':
				return (
					<UserInfo
						count={user?._count}
						createdAt={user?.createdAt}
						bio={user?.bio || ''}
						name={user?.name || ''}
					/>
				);
			case 'Posts':
				return 'posts';
			case 'Comments':
				return 'comments';
			case 'Subreddits':
				return 'subreddits';
			default:
				return '';
		}
	};

	return (
		<div className='container mx-auto'>
			<UserNavbar
				title={title}
				setTitle={setTitle}
				tabs={['User Settings', 'Posts', 'Comments', 'Subreddits']}
			/>
			{showInfo(title)}
		</div>
	);
};

export default UserPage;
