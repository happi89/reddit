import { useRouter } from 'next/router';

const SubReddit = () => {
	const router = useRouter();
	const { subreddit } = router.query;
	console.log(router);

	return (
		<div>
			<h1>SubReddit page {subreddit}</h1>
		</div>
	);
};

export default SubReddit;
