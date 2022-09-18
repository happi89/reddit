import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface SubredditType {
	name: string;
	id: number;
}

export default function SelectFilter({
	subreddits,
	subReddit,
	setSubReddit,
	show,
}: {
	subreddits: SubredditType[];
	subReddit: { name: string; id: number };
	setSubReddit: Dispatch<SetStateAction<SubredditType>>;
	show: boolean;
}) {
	const [query, setQuery] = useState('');

	const filteredSubreddits =
		query === ''
			? subreddits
			: subreddits.filter((subreddit) =>
					subreddit.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div>
			<Combobox value={subReddit} onChange={setSubReddit}>
				<div className='relative'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-base-300 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0 bg-base-300'
							displayValue={(subreddit: SubredditType) => subreddit?.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<ChevronUpDownIcon
								className='h-5 w-5 text-white'
								aria-hidden='true'
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery('')}>
						<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{filteredSubreddits.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredSubreddits.map((subreddit) => (
									<Combobox.Option
										key={subreddit.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-gray text-white' : 'text-white'
											}`
										}
										value={subreddit}>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}>
													{subreddit.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-teal-600'
														}`}>
														<CheckIcon className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
			{show && (
				<Link href='/create/create-subreddit'>
					<p className='text-end mt-1 mr-1 text-sm text-gray link'>
						Create Subreddit
					</p>
				</Link>
			)}
		</div>
	);
}
