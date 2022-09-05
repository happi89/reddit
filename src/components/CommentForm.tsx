import { useState } from 'react';
import { trpc } from '../utils/trpc';

const CommentForm = ({ postId }: { postId: number }) => {
	const [comment, setComment] = useState('');

	const ctx = trpc.useContext();
	const addComment = trpc.useMutation('comment.addComment', {
		onMutate: () => {
			ctx.cancelQuery(['comment.getAll']);

			const optimisticUpdate = ctx.getQueryData(['comment.getAll']);
			if (optimisticUpdate) {
				ctx.setQueryData(['comment.getAll'], optimisticUpdate);
			}
		},
		onSettled: () => {
			ctx.invalidateQueries(['comment.getAll']);
		},
	});

	return (
		<div className='mt-4'>
			<form
				className='flex items-center'
				onSubmit={(event) => {
					event.preventDefault();
					if (comment.length > 2) {
						addComment.mutate({
							body: comment,
							postId,
						});
					}
				}}>
				<input
					type='text'
					placeholder='Comment...'
					className='input input-borderd input-lg bg-base-300 w-full text-lg focus:outline-none'
					onChange={({ target }) => setComment(target.value)}
				/>
				<button
					type='submit'
					className='btn btn-primary btn-square btn-lg min-w-fit p-3 ml-3'>
					Post Comment
				</button>
			</form>
		</div>
	);
};

export default CommentForm;
