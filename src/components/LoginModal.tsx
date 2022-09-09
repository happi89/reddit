/* eslint-disable react/no-unknown-property */
import { signIn } from 'next-auth/react';
import google from '../../public/google.svg';

const LoginModal = () => {
	return (
		<div>
			<label htmlFor='my-modal' className='btn btn-ghost text-lg modal-button'>
				Login
			</label>
			<input type='checkbox' id='my-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box'>
					<h3 className='text-2xl mb-6'>Login</h3>
					<div>
						<button
							className='btn btn-ghost text-lg block mb-4'
							onClick={() => signIn('discord')}>
							Login With Discord
						</button>
						<button
							type='button'
							className='btn bg-[#DC2626] hover:bg-[#DC2626] border-none text-lg'
							onClick={() => signIn('google')}>
							<svg
								width='20'
								height='20'
								fill='currentColor'
								className='mr-2'
								viewBox='0 0 1792 1792'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z'></path>
							</svg>
							Login With Google
						</button>
					</div>
					<div className='modal-action'>
						<label htmlFor='my-modal' className='btn'>
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
