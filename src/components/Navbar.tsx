import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') return <div>Loading...</div>;

	return (
		<nav className='navbar w-full bg-base-200 border-b-[1px] border-gray border-w p-4'>
			{session ? (
				<>
					<Link href='/'>
						<h1 className='text-2xl font-bold flex-1 text-[#ED4202] cursor-pointer'>
							Reddit
						</h1>
					</Link>
					<div className='flex-none flex items-center justify-center gap-2'>
						<Image
							src={session?.user?.image}
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
					<h1 className='text-2xl font-bold flex-1'>Reddit</h1>
					<button
						className='btn btn-ghost text-lg'
						onClick={() => signIn('discord')}>
						Login
					</button>
				</>
			)}
		</nav>
	);
};

export default Navbar;
