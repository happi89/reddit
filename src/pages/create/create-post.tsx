import { PostForm } from '../../components/PostForm';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const CreatePost = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') return <>Loading...</>;

	return (
		<div className='container mx-auto px-4 w-[52rem]'>
			<Link href='/'>
				<button className='btn btn-primary mt-6 mb-2'>Back</button>
			</Link>
			<div className='bg-base-200 my-0 mx-auto border border-gray rounded-md mt-4 p-4'>
				<h1 className='text-2xl text-center'>Create A Post</h1>
				<PostForm id={session?.user?.id as string} />
			</div>
		</div>
	);
};

export default CreatePost;
