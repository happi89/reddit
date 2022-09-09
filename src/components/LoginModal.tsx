/* eslint-disable react/no-unknown-property */
import { signIn } from 'next-auth/react';

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
							className='btn btn-outline text-lg block mb-4'
							onClick={() => signIn('discord')}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 199" className='mr-2 inline'><path fill="#fff" d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046c-19.692-2.961-39.203-2.961-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632a108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237a136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18Z" /></svg>
							Login With Discord
						</button>
						<button
							type='button'
							className='btn btn-outline text-lg'
							onClick={() => signIn('google')}>
							<svg
								width='20'
								height='20'
								fill='currentColor'
								className='mr-2'
								viewBox='0 0 1792 1792'
								xmlns='http://www.w3.org/2000/svg'>
								<path fill="#fff" d='M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z'></path>
							</svg>
							Login With Google
						</button>
					</div>
					<div className='modal-action'>
						<label htmlFor='my-modal' className='btn btn-primary'>
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
