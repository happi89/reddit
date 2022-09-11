const Toast = ({ info }: { info: { type?: string; message: string } }) => {
	return (
		<div className='toast'>
			<div className={`alert alert-${info.type || 'error'}`}>
				<div>
					<span>{info.message}</span>
				</div>
			</div>
		</div>
	);
};

export default Toast;
