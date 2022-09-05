import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Toast from './Toast';

const CommentForm = ({
	postId,
	parentId,
}: {
	postId: number;
	parentId?: number;
}) => {
	const [comment, setComment] = useState('');
	const [toast, setToast] = useState({ show: false, message: '', type: '' });

	const ctx = trpc.useContext();
	const addComment = trpc.useMutation('comment.addComment', {
		onSuccess: () => ctx.invalidateQueries(['comment.getAll']),
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
							parentId,
						});
						setComment('');
					} else {
						setTimeout(() => {
							setToast({ show: false, message: '', type: '' });
						}, 3000);
						setToast({
							show: false,
							message: 'Comment has to be atleast 3 characters',
							type: 'error',
						});
					}
				}}>
				<input
					type='text'
					placeholder='Comment...'
					className='input input-borderd bg-base-300 w-full text-lg focus:outline-none'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
				<button
					type='submit'
					className='btn btn-primary btn-square min-w-fit p-3 ml-3'>
					Post Comment
				</button>
			</form>
			{toast.type && <Toast info={toast} />}
		</div>
	);
};

export default CommentForm;
