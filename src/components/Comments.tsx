import { trpc } from '../utils/trpc';
import PostedBy from './PostedBy';
import { useState } from 'react';
import CommentForm from './CommentForm';

const Reply = ({
	postId,
	parentId,
	replies,
}: {
	postId: number;
	parentId: number;
	replies: number;
}) => {
	const [replying, setReplying] = useState(false);

	return (
		<div className='mt-3'>
			<div className='flex justify-between items-center'>
				<p>{replies} replies</p>
				<button
					className='btn btn-primary btn-sm'
					onClick={() => setReplying(!replying)}>
					{replying ? 'Cancel' : 'Reply'}
				</button>
			</div>
			{replying && <CommentForm postId={postId} parentId={parentId} />}
		</div>
	);
};

const Comments = ({ postId }: { postId: number }) => {
	const { data: comments, isLoading } = trpc.useQuery([
		'comment.getAll',
		{ postId },
	]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			{comments?.map((comment) => {
				return (
					<div
						// eslint-disable-next-line react/no-unknown-property
						key={comment.id}
						className='mt-4 bg-base-200 border border-gray rounded-md p-4'>
						<PostedBy
							name={comment.user.name ? comment.user.name : ''}
							date={comment.createdAt}
						/>

						<p className='text-lg'>{comment.body}</p>
						<Reply postId={postId} parentId={comment.id} replies={0} />
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
