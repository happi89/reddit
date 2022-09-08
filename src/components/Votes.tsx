import Image from 'next/image';
import upVoteImage from '../../public/up-arrow.png';
import downVoteImage from '../../public/download.png';
import { trpc } from '../utils/trpc';

export function Votes({
	votes,
	postId,
	commentId,
	voted,
}: {
	votes: number;
	postId?: number;
	commentId?: number;
	voted: boolean;
}) {
	const ctx = trpc.useContext();
	const voteComment = trpc.useMutation('vote.commentVote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	const votePost = trpc.useMutation('vote.postVote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	return (
		<div className='mr-4 flex flex-col items-center bg-base-300 py-4 px-3'>
			<button
				className='btn btn-square btn-ghost btn-sm'
				onClick={() => {
					postId
						? votePost.mutate({
								postId,
								value: 1,
						  })
						: commentId
						? voteComment.mutate({
								commentId,
								value: 1,
						  })
						: voted && commentId
						? voteComment.mutate({
								commentId,
								value: 0,
						  })
						: voted && postId
						? votePost.mutate({
								postId,
								value: 0,
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
						? votePost.mutate({
								postId,
								value: -1,
						  })
						: commentId
						? voteComment.mutate({
								commentId,
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								value: -1,
						  })
						: voted && commentId
						? voteComment.mutate({
								commentId,
								value: 0,
						  })
						: voted && postId
						? votePost.mutate({
								postId,
								value: 0,
						  })
						: null;
				}}>
				<Image src={downVoteImage} alt='arrow up' height={25} width={25} />
			</button>
		</div>
	);
}
