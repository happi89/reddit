import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Toast from './Toast';
import SelectFilter from './SelectFilter';

export const PostForm = ({ id }: { id: string }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [subReddit, setSubReddit] = useState({
		name: '...',
		id: 0,
	});
	const [toast, setToast] = useState({ show: false, message: '', type: '' });
	const router = useRouter();
	const ctx = trpc.useContext();

	const { data: subreddits, isLoading } = trpc.useQuery(['subreddit.getAll']);

	const addPost = trpc.useMutation('post.addPost', {
		onSuccess: () => ctx.invalidateQueries(['post.getAll']),
	});

	const onSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (title.length > 11) {
			addPost.mutate({
				title,
				body,
				subRedditName: subReddit.name,
				userId: id,
			});
			router.push('/');
			setTitle('');
			setBody('');
		} else {
			setTimeout(() => {
				setToast({ show: false, message: '', type: '' });
			}, 3000);
			setToast({
				show: false,
				message:
					title.length < 11
						? 'post title has to be atleast 10 characters'
						: 'please select a valid community',
				type: 'error',
			});
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<form className='mt-4 p-1' onSubmit={onSubmit}>
			<SelectFilter
				subreddits={subreddits ? subreddits : []}
				subReddit={subReddit}
				setSubReddit={setSubReddit}
			/>
			<input
				type='text'
				placeholder='Title'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none mb-4 shadow-md'
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			/>
			<textarea
				placeholder='Body'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none min-h[60px] mb-4 shadow-md' // rows={8}
				value={body}
				onChange={({ target }) => setBody(target.value)}
			/>
			<button
				type='submit'
				className='btn btn-primary w-full mt-2 text-lg shadow-md'>
				Submit
			</button>
			{toast.type && <Toast info={toast} />}
		</form>
	);
};
