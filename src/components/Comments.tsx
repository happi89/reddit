import { trpc } from '../utils/trpc';
import PostedBy from './PostedBy';
import { useState } from 'react';
import CommentForm from './CommentForm';
import EditComment from './EditComment';
import { useSession } from 'next-auth/react';

const Reply = ({
	postId,
	parentId,
	replies,
	userId,
}: {
	postId: number;
	parentId: number;
	replies: number;
	userId: string;
}) => {
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);

	const { data: session } = useSession();

	const toggleForm = () => {
		setReplying(!replying);
	};

	const toggleEdit = () => {
		setEditing(!editing);
	};

	return (
		<div className='mt-3'>
			<div className='flex justify-between items-center'>
				<p>{replies} replies</p>
				<div>
					{session?.user?.id === userId && (
						<button
							className='btn btn-primary btn-sm mr-3'
							onClick={toggleEdit}>
							{editing ? 'Cancel' : 'Edit'}
						</button>
					)}
					{session?.user && (
						<button className='btn btn-primary btn-sm' onClick={toggleForm}>
							{replying ? 'Cancel' : 'Reply'}
						</button>
					)}
				</div>
			</div>
			{editing && <EditComment commentId={parentId} toggleEdit={toggleEdit} />}
			{replying && (
				<CommentForm
					postId={postId}
					parentId={parentId}
					toggleForm={toggleForm}
				/>
			)}
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
						<Reply
							postId={postId}
							parentId={comment.id}
							userId={comment.user?.id}
							replies={0}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
