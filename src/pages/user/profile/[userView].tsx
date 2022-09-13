import { useRouter } from 'next/router';

const ViewUser = () => {
	const router = useRouter();
	const { userView } = router.query;

	return (
		<div>
			<h1 className='text-2xl font-bold text-center'>{userView}</h1>
		</div>
	);
};

export default ViewUser;
