import { useState } from 'react';

const UserPage = () => {
	const [title, setTitle] = useState('User Settings');

	return (
		<div className='container mx-auto'>
			<div className='tabs tabs-boxed tabs-lg flex justify-center gap-2'>
				<a
					className={`tab ${title === 'User Settings' ? 'tab-active' : ''}`}
					onClick={() => setTitle('User Settings')}>
					User Settings
				</a>
				<a
					className={`tab ${title === 'Posts' ? 'tab-active' : ''}`}
					onClick={() => setTitle('Posts')}>
					Posts
				</a>
				<a
					className={`tab ${title === 'Comments' ? 'tab-active' : ''}`}
					onClick={() => setTitle('Comments')}>
					Comments
				</a>
				<a
					className={`tab ${title === 'Subreddits' ? 'tab-active' : ''}`}
					onClick={() => setTitle('Subreddits')}>
					Subreddits
				</a>
			</div>
			<h1 className='text-2xl font-bold mt-4'>{title}</h1>
		</div>
	);
};

export default UserPage;
