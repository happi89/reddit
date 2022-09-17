import BioForm from './BioForm';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';

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
		<div className='container mx-auto mt-4 bg-base-200 p-8 rounded-md'>
			<p className='text-2xl font-bold mb-2'>u/{name}</p>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
			{bio === '' && session?.user?.name === name ? (
				<button
					className='btn btn-ghost btn-sm hover:bg-base-200 ml-[-1rem]'
					onClick={() => setOpen(!open)}>
					{open ? (
						<>
							Bio{' '}
							<PlusIcon className='text-primary h-6 w-6 hover:text-gray ml-2' />
						</>
					) : (
						<>
							Bio{' '}
							<PlusIcon className='text-gray h-6 w-6 hover:text-primary ml-2' />
						</>
					)}
				</button>
			) : bio && session?.user?.name === name ? (
				<>
					<p className='mt-4'>Bio: {bio}</p>
					<button
						className='btn btn-ghost btn-sm hover:bg-base-200 ml-[-1rem]'
						onClick={() => setOpen(!open)}>
						{open ? (
							<PencilSquareIcon className='text-primary h-6 w-6 hover:text-gray' />
						) : (
							<PencilSquareIcon className='text-gray h-6 w-6 hover:text-primary' />
						)}
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
