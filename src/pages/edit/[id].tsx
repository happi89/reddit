import EditPost from '../../components/EditPost';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import Link from 'next/link';

const Submit = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: post, isLoading } = trpc.useQuery([
		'post.getOne',
		{
			id: Number(id),
		},
	]);

	if (isLoading) return <>Loading...</>;

	return (
		<>
			<Link href='/'>
				<button className='btn btn-primary ml-12 mt-6 mb-2'>Back</button>
			</Link>
			<div className='w-[90%] bg-base-200 my-0 mx-auto border border-gray rounded-md mt-4 p-4 flex flex-col items-start'>
				<h1 className='text-2xl self-center'>Update Post</h1>
				{post ? (
					<EditPost post={post} />
				) : (
					<div>404 not found. This Post does not Exist</div>
				)}
			</div>
		</>
	);
};

export default Submit;
