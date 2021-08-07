import ClipartCard from '../ClipartCard';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 150px))',
		maxWidth: '980px',
		gap: '15px',
		margin: 'auto',
		justifyContent: 'center',
	},
	clipart: {
		width: '150px',
		height: '150px',
	},
	recent: {
		marginTop: '50px',
	},
});

const RecentCliparts = ({ recentCliparts }) => {
	const classes = useStyles();

	return (
		<>
			<Typography variant='h4' className={classes.recent}>
				Recent Cliparts
			</Typography>
			<br />
			{recentCliparts && (
				<div className={classes.cliparts}>
					{recentCliparts.map((clipart) => (
						<ClipartCard
							key={clipart.imgId}
							className={classes.clipart}
							clipartInfo={clipart}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default RecentCliparts;
