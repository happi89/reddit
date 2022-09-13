import { useRouter } from 'next/router';
import { useState } from 'react';
import UserNavbar from './../../../components/UserNavbar';

const ViewUser = () => {
	const [title, setTitle] = useState('Profile');
	const router = useRouter();
	const { userView } = router.query;

	return (
		<div>
			<UserNavbar
				title={title}
				setTitle={setTitle}
				tabs={['Profile', 'Posts', 'Comments', 'Subreddits']}
			/>
			<h1 className='text-2xl font-bold text-center mt-4'>
				{userView}&apos;s &nbsp;{title}
			</h1>
		</div>
	);
};

export default ViewUser;
