import SubredditForm from '../../components/SubredditForm';
import Link from 'next/link';

const CreateSubreddit = () => {
	return (
		<div className='container mx-auto px-4 w-[36rem]'>
			<Link href='/create-post'>
				<button className='btn btn-primary mt-6 mb-2'>Back</button>
			</Link>
			<div className='bg-base-200 my-0 mx-auto border border-gray rounded-md mt-4 p-4'>
				<h1 className='text-2xl text-center'>Create a Subreddit</h1>
				<SubredditForm />
			</div>
		</div>
	);
};

export default CreateSubreddit;
