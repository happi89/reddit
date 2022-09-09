const FilterPosts = ({ setFilter }: { setFilter: (value: string) => void }) => {
	return (
		<div className='mb-2'>
			<label className='label'>
				<span className='label-text'>Filter Posts</span>
			</label>
			<select
				className='select select-primary w-full max-w-xs mb-4'
				onChange={({ target }) => setFilter(target.value)}>
				<option value='newest'>Newest</option>
				<option value='oldest'>Oldest</option>
				<option value='most likes'>Most Likes</option>
				<option value='least likes'>Least Likes</option>
				<option value='most comments'>Most Comments</option>
			</select>
		</div>
	);
};

export default FilterPosts;
