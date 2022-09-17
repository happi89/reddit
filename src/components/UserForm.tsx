import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { useRouter } from 'next/router';

const UserForm = ({ name, bio }: { name: string; bio: string }) => {
	const [bioText, setBioText] = useState(bio);
	const [nameText, setNameText] = useState(name);

	const ctx = trpc.useContext();
	const addBio = trpc.useMutation('user.addBio', {
		onSuccess: () => ctx.invalidateQueries(['user.getOne']),
	});

	const router = useRouter();

	return (
		<form
			className='flex flex-col w-[90%]'
			onSubmit={(event) => {
				event.preventDefault();
				addBio.mutate({
					bio: bioText,
					name: nameText,
				});
				router.push(`/user/${nameText}`);
			}}>
			<label className='label mt-4'>
				<span className='label-text'>Name</span>
			</label>
			<input
				type='text'
				className='input input-bordered bg-base-200 focus:outline-none'
				placeholder='name'
				value={nameText}
				onChange={({ target }) => setNameText(target.value)}
			/>
			<label className='label mt-4'>
				<span className='label-text'>Bio</span>
			</label>
			<textarea
				className='textarea textarea-bordered bg-base-200 focus:outline-none'
				placeholder='Bio...'
				value={bioText}
				onChange={({ target }) => setBioText(target.value)}
			/>
			<button type='submit' className='btn mt-4 btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default UserForm;
