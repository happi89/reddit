import Image from 'next/image';
import upVoteImage from '../../public/up-arrow.png';
import downVoteImage from '../../public/download.png';
import { trpc } from '../utils/trpc';

export function Votes({ votes, postId }: { votes: number; postId: number }) {
	const ctx = trpc.useContext();
	const upVote = trpc.useMutation('post.upvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	const downVote = trpc.useMutation('post.downvote', {
		onSuccess: () => {
			ctx.invalidateQueries(['post.getOne']);
			ctx.invalidateQueries(['post.getAll']);
		},
	});

	return (
		<div className='mr-4 flex flex-col items-center'>
			<button
				className='btn btn-square btn-ghost btn-sm'
				onClick={() => {
					upVote.mutate({
						postId,
						votes: votes + 1,
					});
					console.log(votes, 'votes');
					console.log(postId, 'postId');
				}}>
				<Image src={upVoteImage} alt='arrow up' height={25} width={25} />
			</button>
			<div>{votes}</div>
			<button
				className='btn btn-square btn-ghost btn-sm'
				onClick={() => {
					downVote.mutate({
						postId,
						votes: votes - 1,
					});
					console.log(votes, 'votes');
					console.log(postId, 'postId');
				}}>
				<Image src={downVoteImage} alt='arrow up' height={25} width={25} />
			</button>
		</div>
	);
}
