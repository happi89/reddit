import { Dispatch, SetStateAction } from 'react';

const UserNavbar = ({
	tabs,
	title,
	setTitle,
}: {
	tabs: string[];
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<div className='tabs tabs-boxed tabs-lg flex justify-center gap-2'>
			{tabs.map((tab: string) => {
				return (
					<a
						// eslint-disable-next-line react/no-unknown-property
						key={tab}
						className={`tab ${title === tab ? 'tab-active' : ''}`}
						onClick={() => setTitle(tab)}>
						{tab}
					</a>
				);
			})}
		</div>
	);
};

export default UserNavbar;
