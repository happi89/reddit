import Image from 'next/image';
import upVoteImage from '../../public/up-arrow.png';
import downVoteImage from '../../public/download.png';
import { trpc } from '../utils/trpc';
import { Vote } from '@prisma/client';

export function Votes({
	votes,
	postId,
	commentId,
}: {
	votes: Vote[];
	postId?: number;
	commentId?: number;
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

	const upVotes = votes?.filter((vote) => vote.voteType === 'UPVOTE');
	const downVotes = votes?.filter((vote) => vote.voteType === 'DOWNVOTE');
	const totalVotes = upVotes.length - downVotes.length;
	console.log(totalVotes);

	return (
		<div className='mr-4 flex flex-col items-center bg-base-300 py-4 px-3'>
			<button
				className='btn btn-square btn-ghost btn-sm hover:bg-primary'
				onClick={() => {
					postId
						? votePost.mutate({
								postId,
								voteType: 'UPVOTE',
						  })
						: commentId
						? voteComment.mutate({
								commentId,
								voteType: 'UPVOTE',
						  })
						: null;
				}}>
				<Image src={upVoteImage} alt='arrow up' height={25} width={25} />
			</button>
			<div>{totalVotes}</div>
			<button
				className='btn btn-square btn-ghost btn-sm hover:bg-primary'
				onClick={() => {
					postId
						? votePost.mutate({
								postId,
								voteType: 'DOWNVOTE',
						  })
						: commentId
						? voteComment.mutate({
								commentId,
								voteType: 'DOWNVOTE',
						  })
						: null;
				}}>
				<Image src={downVoteImage} alt='arrow up' height={25} width={25} />
			</button>
		</div>
	);
}
