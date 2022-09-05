import { PostForm } from './../components/PostForm';
import { useSession } from 'next-auth/react';

const Submit = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') return <>Loading...</>;

	return (
		<div className='w-[90%] bg-base-200 my-0 mx-auto border border-gray rounded-md mt-4 p-4 flex flex-col items-start'>
			<h1 className='text-2xl self-center'>Create A Post</h1>
			<PostForm id={session?.user?.id as string} />
		</div>
	);
};

export default Submit;
