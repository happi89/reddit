import { trpc } from '../utils/trpc';
import PostedBy from './PostedBy';

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
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
