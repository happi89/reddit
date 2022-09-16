import { useState } from 'react';
import { trpc } from '../utils/trpc';

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
	const [bioText, setBioText] = useState('');

	const ctx = trpc.useContext();
	const addBio = trpc.useMutation('user.addBio', {
		onSuccess: () => ctx.cancelQuery(['user.getOne']),
	});

	return (
		<div className='mt-4 bg-base-200 w-fit max-w-lg p-4 rounded-md'>
			<p className='text-lg mb-2'>u/{name}</p>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
			{bio ? (
				<p className='mt-2'>Bio: {bio}</p>
			) : (
				<button
					className='btn btn-primary btn-sm mt-2'
					onClick={() => setOpen(!open)}>
					{!open ? 'Add Bio' : 'Cancel'}
				</button>
			)}
			{open ? (
				<form
					className='flex flex-col max-w-fit'
					onSubmit={(event) => {
						event.preventDefault();
						addBio.mutate({ bio: bioText });
					}}>
					<textarea
						className='textarea textarea-bordered bg-base-200 mt-2 focus:outline-none'
						placeholder='Bio...'
						value={bioText}
						onChange={({ target }) => setBioText(target.value)}
					/>
					<button type='submit' className='btn mt-2 btn-primary'>
						Add
					</button>
				</form>
			) : (
				''
			)}
		</div>
	);
};

export default UserInfo;
