const PostedBy = ({
	name,
	date,
	subRedditName,
}: {
	name: string;
	date: Date;
	subRedditName: string;
}) => {
	const postedAt = (date: Date) => {
		const then = date.getTime();
		const now = new Date().getTime();
		const past = now - then;
		if (past < 60000) return 'posted now';
		else if (past < 3600000) return `${Math.round(past / 60000)} minutes ago`;
		else if (past < 86400000) return `${Math.round(past / 3600000)} hours ago`;
		else if (past < 2629800000)
			return `${Math.round(past / 86400000)} days ago`;
		else return new Date(past).toString();
	};

	return (
		<p className='mb-4 text-gray'>
			<span>
				r/{subRedditName} posted by {name}
			</span>
			<span> {postedAt(date)}</span>
		</p>
	);
};

export default PostedBy;
