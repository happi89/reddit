import UserNavbar from './../../components/UserNavbar';
import { useState } from 'react';

const UserPage = () => {
	const [title, setTitle] = useState('User Settings');

	return (
		<div className='container mx-auto'>
			<UserNavbar
				title={title}
				setTitle={setTitle}
				tabs={['User Settings', 'Posts', 'Comments', 'Subreddits']}
			/>
			<h1 className='text-2xl font-bold mt-4'>{title}</h1>
		</div>
	);
};

export default UserPage;
