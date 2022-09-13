import { useState } from 'react';

const UserPage = () => {
	const [title, setTitle] = useState('User Settings');

	return (
		<div className='container mx-auto'>
			<div className='tabs tabs-boxed tabs-lg flex justify-center gap-3'>
				<a
					className={`tab ${title === 'User Settings' ? 'tab-active' : ''}`}
					onClick={() => setTitle('User Settings')}>
					User Settings
				</a>
				<a
					className={`tab ${title === 'Created' ? 'tab-active' : ''}`}
					onClick={() => setTitle('Created')}>
					Created
				</a>
				<a
					className={`tab ${title === 'Voted' ? 'tab-active' : ''}`}
					onClick={() => setTitle('Voted')}>
					Voted
				</a>
			</div>
			<h1 className='text-2xl font-bold mt-4'>{title}</h1>
		</div>
	);
};

export default UserPage;
