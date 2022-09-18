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
			<p className='text-4xl font-bold mb-4'>u/{name}</p>
			<div className='stats stats-vertical shadow'>
				<div className='stat'>
					<div className='stat-title'>Joined</div>
					<div className='stat-value'>
						{String(createdAt).slice(0, 15) || 'unknown'}
					</div>
				</div>

				<div className='stat'>
					<div className='stat-title'>Posts</div>
					<div className='stat-value'>{count?.posts}</div>
				</div>

				<div className='stat'>
					<div className='stat-title'>Comments</div>
					<div className='stat-value'>{count?.comments}</div>
				</div>
				<div className='stat'>
					<div className='stat-title'>subreddits joined</div>
					<div className='stat-value'>{count?.subRedditsJoined}</div>
				</div>
			</div>
			<p className='mt-4 text-lg'>Bio: {bio}</p>
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
