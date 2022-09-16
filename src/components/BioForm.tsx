import { trpc } from '../utils/trpc';
import { useState } from 'react';

const BioForm = ({ bio }: { bio: string }) => {
	console.log(bio);
	const [bioText, setBioText] = useState(bio);

	const ctx = trpc.useContext();
	const addBio = trpc.useMutation('user.addBio', {
		onSuccess: () => ctx.cancelQuery(['user.getOne']),
	});

	return (
		<form
			className='flex flex-col max-w-fit'
			onSubmit={(event) => {
				event.preventDefault();
				addBio.mutate({
					bio: bioText,
				});
			}}>
			<textarea
				className='textarea textarea-bordered bg-base-200 mt-2 focus:outline-none'
				placeholder='Bio...'
				value={bioText}
				onChange={({ target }) => setBioText(target.value)}
			/>
			<button type='submit' className='btn mt-2 btn-primary'>
				Add
			</button>
		</form>
	);
};

export default BioForm;
