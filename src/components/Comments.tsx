import { trpc } from '../utils/trpc';
import PostedBy from './PostedBy';
import { useState } from 'react';
import CommentForm from './CommentForm';
import EditComment from './EditComment';
import { useSession } from 'next-auth/react';
import { Votes } from './Votes';
import { Comment as CommentT } from '@prisma/client';
import Image from 'next/image';
import Loader from '../../public/Reload-1s-200px.svg';

interface CommentType extends CommentT {
	user: {
		id: string;
	};
}

const Reply = ({
	postId,
	replies,
	comment,
}: {
	postId: number;
	replies: number;
	comment: CommentType;
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
		<div className='mt-6 pr-2 pb-1'>
			<div className='flex justify-between items-center'>
				<p>{replies} replies</p>
				<div>
					{session?.user?.id === comment?.user?.id && (
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
			{editing && (
				<EditComment commentId={comment.id} toggleEdit={toggleEdit} />
			)}
			{replying && (
				<CommentForm
					postId={postId}
					parentId={comment.id}
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

	if (isLoading)
		return (
			<div className='flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);
	console.log(comments);

	return (
		<div className='mt-4'>
			<h2 className='text-2xl my-3'>Comments</h2>
			{comments?.map((comment) => {
				return (
					<div
						// eslint-disable-next-line react/no-unknown-property
						key={comment.id}
						className='bg-base-200 border-[1px] border-gray rounded-md mb-4 flex'>
						<Votes
							votes={comment?.votes[0]?.value || 0}
							commentId={comment.id}
						/>
						<div className='w-full flex flex-col items-between p-4'>
							<PostedBy
								name={comment.user.name ? comment.user.name : ''}
								date={comment.createdAt}
							/>
							<p className='text-lg'>{comment.body}</p>
							<Reply
								postId={postId}
								comment={comment}
								replies={comment.children.length}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
