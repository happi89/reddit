import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';
import { SinglePost } from './index';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CommentForm from '../components/CommentForm';
import CommentSection from '../components/Comments';

const PostPage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { postid } = router.query;
	const { data: post, isLoading } = trpc.useQuery([
		'post.getOne',
		{
			id: Number(postid),
		},
	]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='p-4 m-4'>
			{post ? (
				<>
					<Link href='/'>
						<button className='btn btn-primary mb-6 ml-1'>Back</button>
					</Link>

					<SinglePost
						post={post}
						showDelete={post.user.id === session?.user?.id}
					/>
					{session?.user?.id === post.user.id ? (
						<CommentForm postId={Number(postid)} />
					) : null}
					<CommentSection postId={Number(postid)} />
				</>
			) : (
				<div>404 not found. This Post does not Exist</div>
			)}
		</div>
	);
};

export default PostPage;
