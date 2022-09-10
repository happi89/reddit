import { useRouter } from 'next/router';
import { trpc } from '../../../../utils/trpc';
import { SinglePost } from '../../../index';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CommentForm from '../../../../components/CommentForm';
import Comments from '../../../../components/Comments';
import Image from 'next/image';
import Loader from '../../../../../public/Reload-1s-200px.svg';

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

	if (isLoading)
		return (
			<div className='min-w-screen min-h-screen flex justify-center'>
				<Image src={Loader} alt='loader' width={70} height={70} />
			</div>
		);

	return (
		<div className='container mx-auto mt-12'>
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

					<Comments postId={Number(postid)} />
				</>
			) : (
				<div>404 not found. This Post does not Exist</div>
			)}
		</div>
	);
};

export default PostPage;
