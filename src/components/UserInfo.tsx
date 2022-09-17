import BioForm from './BioForm';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const UserInfo = ({
	count,
	createdAt,
	bio,
	name,
}: {
	count?: { posts: number; comments: number; subRedditsJoined: number };
	createdAt?: Date;
	bio?: string;
	name: string;
}) => {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();

	return (
		<div className='mt-4 bg-base-200 w-fit max-w-lg p-4 rounded-md'>
			<p className='text-lg mb-2'>u/{name}</p>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
			{bio === '' && session?.user?.name === name ? (
				<button
					className='btn btn-primary btn-sm mt-2'
					onClick={() => setOpen(!open)}>
					{!open ? 'Add Bio' : 'Cancel'}
				</button>
			) : bio && session?.user?.name === name ? (
				<>
					<p className='mt-2'>Bio: {bio}</p>
					<button
						className='btn btn-primary btn-sm mt-2'
						onClick={() => setOpen(!open)}>
						{!open ? 'Edit Bio' : 'Cancel'}
					</button>
				</>
			) : (
				''
			)}
			{open ? <BioForm bio={bio || ''} setOpen={setOpen} /> : ''}
		</div>
	);
};

export default UserInfo;
