import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const PostPage = () => {
	const router = useRouter();
	const { postid } = router.query;
	const { data: post, isLoading } = trpc.useQuery([
		'post.getOne',
		{
			id: Number(postid),
		},
	]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<h1>{post?.title}</h1>
			<p>{post?.body}</p>
		</div>
	);
};

export default PostPage;
