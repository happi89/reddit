import Image from 'next/image';
import upVoteImage from '../../public/up-arrow.png';
import downVoteImage from '../../public/download.png';
import { trpc } from '../utils/trpc';

export function Votes({
	votes,
	postId,
	commentId,
}: {
	votes: number;
	postId?: number;
	commentId?: number;
}) {
	const ctx = trpc.useContext();
	const upVotePost = trpc.useMutation('post.upvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});
	const downVotePost = trpc.useMutation('post.downvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});
	const upVoteComment = trpc.useMutation('comment.upvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['comment.getAll']);
		},
	});

	const downVoteComment = trpc.useMutation('comment.downvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['comment.getAll']);
		},
	});

	return (
		<div className='mr-4 flex flex-col items-center bg-base-300 py-4 px-3'>
			<button
				className='btn btn-square btn-ghost btn-sm'
				onClick={() => {
					postId
						? upVotePost.mutate({
								postId,
								votes: votes + 1,
						  })
						: commentId
						? upVoteComment.mutate({
								commentId,
								votes: votes + 1,
						  })
						: null;
				}}>
				<Image src={upVoteImage} alt='arrow up' height={25} width={25} />
			</button>
			<div>{votes}</div>
			<button
				className='btn btn-square btn-ghost btn-sm'
				onClick={() => {
					postId
						? downVotePost.mutate({
								postId,
								votes: votes - 1,
						  })
						: commentId
						? downVoteComment.mutate({
								commentId,
								votes: votes - 1,
						  })
						: null;
				}}>
				<Image src={downVoteImage} alt='arrow up' height={25} width={25} />
			</button>
		</div>
	);
}
