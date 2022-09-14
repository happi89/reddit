const UserInfo = ({
	count,
	createdAt,
}: {
	count?: { posts: number; comments: number; subRedditsJoined: number };
	createdAt?: Date;
}) => {
	return (
		<>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
		</>
	);
};

export default UserInfo;
