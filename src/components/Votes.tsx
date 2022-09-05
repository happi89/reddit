import Image from 'next/image';
import upVote from '../../public/up-arrow.png';
import downVote from '../../public/download.png';

export function Votes({ votes }: { votes: number }) {
	return (
		<div className='mr-4 flex flex-col items-center'>
			<button className='btn btn-square btn-ghost btn-sm'>
				<Image src={upVote} alt='arrow up' height={25} width={25} />
			</button>
			<div>{votes}</div>
			<button className='btn btn-square btn-ghost btn-sm'>
				<Image src={downVote} alt='arrow up' height={25} width={25} />
			</button>
		</div>
	);
}
