import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Toast from './Toast';

export const PostForm = ({ id }: { id: string }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [toast, setToast] = useState({ show: false, message: '', type: '' });
	const router = useRouter();
	const ctx = trpc.useContext();

	const addPost = trpc.useMutation('post.addPost', {
		onSuccess: () => ctx.invalidateQueries(['post.getAll']),
	});

	return (
		<form
			className='w-full mt-2'
			onSubmit={(e) => {
				e.preventDefault();
				if (title.length > 3) {
					addPost.mutate({
						title,
						body,
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
						message: 'post title and body has to be atleast 3 characters',
						type: 'error',
					});
				}
			}}>
			<input
				type='text'
				placeholder='Title'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none mb-3'
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			/>
			<textarea
				placeholder='Body'
				className='input input-borderd bg-base-300 w-full text-lg focus:outline-none min-h-[100px]' // rows={8}
				value={body}
				onChange={({ target }) => setBody(target.value)}
			/>
			<button type='submit' className='btn btn-primary w-full mt-2 text-lg'>
				Submit
			</button>
			{toast.type && <Toast info={toast} />}
		</form>
	);
};
