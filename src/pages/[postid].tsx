import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';
import { SinglePost } from './index';
import { useSession } from 'next-auth/react';

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
				<SinglePost
					post={post}
					showDelete={post.user.id === session?.user?.id}
				/>
			) : (
				<div>This Post does not Exist</div>
			)}
		</div>
	);
};

export default PostPage;
