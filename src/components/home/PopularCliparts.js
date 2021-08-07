import ClipartCard from '../ClipartCard';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 150px))',
		maxWidth: '980px',
		justifyContent: 'center',
		gap: '15px',
		margin: 'auto',
	},
	clipart: {
		width: '150px',
		height: '150px',
	},
});

const PopularCliparts = ({ popularCliparts }) => {
	console.log(popularCliparts);
	const classes = useStyles();

	return (
		<>
			<h2>Popular Cliparts</h2>
			<br />
			{popularCliparts && (
				<div className={classes.cliparts}>
					{popularCliparts.map((clipart) => (
						<ClipartCard
							key={Math.random()}
							className={classes.clipart}
							clipartInfo={clipart}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default PopularCliparts;
