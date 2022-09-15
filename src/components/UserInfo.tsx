const UserInfo = ({
	count,
	createdAt,
	bio,
}: {
	count?: { posts: number; comments: number; subRedditsJoined: number };
	createdAt?: Date;
	bio?: string;
}) => {
	return (
		<>
			<p>Joined {String(createdAt).slice(0, 15) || 'unknown'}</p>
			<p>posts: {count?.posts}</p>
			<p>comments: {count?.comments}</p>
			<p>subreddits joined: {count?.subRedditsJoined}</p>
			<p>Bio: {bio}</p>
		</>
	);
};

export default UserInfo;
