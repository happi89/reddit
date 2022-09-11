import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Toast from './Toast';

const SubredditForm = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [toast, setToast] = useState({ show: false, message: '', type: '' });

	const router = useRouter();
	const { data: session } = useSession();

	const addSubreddit = trpc.useMutation('subreddit.addSubreddit');

	return (
		<form
			className='mt-4 p-1'
			onSubmit={(e) => {
				e.preventDefault();
				if (name.length > 2 && description.length > 20) {
					addSubreddit.mutate({
						name,
						description,
						adminId: String(session?.user?.id),
					});
					router.push('/create-post');
					setName('');
					setDescription('');
				} else {
					setTimeout(() => {
						setToast({ show: false, message: '', type: '' });
					}, 3000);
					setToast({
						show: false,
						message:
							name.length < 3 || description.length < 21
								? 'name and description has to be atleast 3 and 20 characters respectfully'
								: 'please select a valid community',
						type: 'error',
					});
				}
			}}>
			<input
				placeholder='Subreddit Name'
				type='text'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none mb-4 shadow-md'
				value={name}
				onChange={({ target }) => setName(target.value)}
			/>
			<textarea
				placeholder='Description'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none min-h-[60px] mb-4 shadow-md'
				value={description}
				onChange={({ target }) => setDescription(target.value)}
			/>
			<button
				type='submit'
				className='btn btn-primary w-full mt-2 text-lg shadow-md'>
				Create Subreddit
			</button>
			{toast.type && <Toast info={toast} />}
		</form>
	);
};

export default SubredditForm;
