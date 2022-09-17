import UserForm from './UserForm';
import { useSession } from 'next-auth/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

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
	const { data: session } = useSession();

	return (
		<div className='container mx-auto mt-4 bg-base-200 p-8 rounded-md'>
			<p className='text-2xl font-bold mb-2'>u/{name}</p>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
			<p className='mt-4'>Bio: {bio}</p>
			{session?.user?.name === name ? (
				<>
					<label
						htmlFor='my-modal-4'
						className='btn btn-modal btn-ghost btn-sm hover:bg-base-200 ml-[-1rem]'>
						<PencilSquareIcon className='text-gray h-6 w-6 hover:text-primary' />
					</label>

					<input type='checkbox' id='my-modal-4' className='modal-toggle' />
					<label htmlFor='my-modal-4' className='modal cursor-pointer'>
						<label className='modal-box relative' htmlFor=''>
							<div className='flex flex-col items-center'>
								<h3 className='text-lg font-bold'>Edit User</h3>
								<UserForm name={name} bio={bio || ''} />
							</div>
						</label>
					</label>
				</>
			) : (
				''
			)}
		</div>
	);
};

export default UserInfo;
