// import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from './LoginModal';

const Navbar = () => {
	const { data: session, status } = useSession();

	// const router = useRouter();

	if (status === 'loading') return <div>Loading...</div>;

	return (
		<nav className='navbar w-full bg-base-200 border-b-[1px] border-gray border-w p-4 mb-2'>
			{session ? (
				<>
					<Link href='/'>
						<h1 className='text-2xl font-bold flex-1 text-[#ED4202] cursor-pointer'>
							Reddit
						</h1>
					</Link>
					<div className='flex-none flex items-center justify-center gap-2'>
						<Link href='/submit'>
							<button className='btn btn-ghost'>Create Post</button>
						</Link>
						<Image
							src={session?.user?.image ? session?.user?.image : ''}
							alt='s'
							width={36}
							height={36}
							style={{ borderRadius: '50%' }}
						/>
						<button className='btn btn-ghost text-lg' onClick={() => signOut()}>
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					<Link href='/'>
						<h1 className='text-2xl font-bold flex-1 text-[#ED4202] cursor-pointer'>
							Reddit
						</h1>
					</Link>
					<LoginModal />
				</>
			)}
		</nav>
	);
};

export default Navbar;
