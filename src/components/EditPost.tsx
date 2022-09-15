import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Toast from './Toast';

const EditPost = ({ post }: { post: Post }) => {
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post?.body);
	const [toast, setToast] = useState({ show: false, message: '', type: '' });
	const router = useRouter();
	const ctx = trpc.useContext();

	const editPost = trpc.useMutation('post.editPost', {
		onSuccess: () => ctx.invalidateQueries(['post.getAll']),
	});

	const onSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (title.length > 1) {
			body
				? editPost.mutate({
						title,
						body,
						postId: post.id,
				  })
				: editPost.mutate({
						title,
						postId: post.id,
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
				message: 'post title and body has to be atleast 2 characters',
				type: 'error',
			});
		}
	};

	return (
		<form className='w-full mt-2' onSubmit={onSubmit}>
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
				value={body || ''}
				onChange={({ target }) => setBody(target.value)}
			/>
			<button type='submit' className='btn btn-primary w-full mt-2 text-lg'>
				Submit
			</button>
			{toast.type && <Toast info={toast} />}
		</form>
	);
};

export default EditPost;
