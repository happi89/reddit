import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Submit = () => {
	const { data: session, status } = useSession();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const router = useRouter();
	const ctx = trpc.useContext();
	const addPost = trpc.useMutation('post.addPost', {
		onMutate: () => {
			ctx.cancelQuery(['post.getAll']);

			const optimisticUpdate = ctx.getQueryData(['post.getAll']);
			if (optimisticUpdate) {
				ctx.setQueryData(['post.getAll'], optimisticUpdate);
			}
		},
		onSettled: () => {
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	if (status === 'loading') return <>Loading...</>;

	return (
		<div className='w-[90%] bg-base-200 my-0 mx-auto border border-gray rounded-md mt-4 p-4 flex flex-col items-start'>
			<h1 className='text-2xl self-center'>Create A Post</h1>
			<form
				className='w-full mt-2'
				onSubmit={(e) => {
					e.preventDefault();
					if (title.length > 3) {
						addPost.mutate({
							title,
							body,
							userId: session?.user?.id as string,
						});

						router.push('/');

						setTitle('');
						setBody('');
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
					className='input input-borderd bg-base-300 w-full text-lg focus:outline-none min-h-[100px]'
					// rows={8}
					value={body}
					onChange={({ target }) => setBody(target.value)}
				/>
				<button type='submit' className='btn btn-primary w-full mt-2 text-lg'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Submit;
