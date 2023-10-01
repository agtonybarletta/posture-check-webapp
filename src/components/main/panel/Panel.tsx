import {Box, Paper} from "@mui/material"

const Panel = (props: any) => {

	return(
    <Paper
	elevation={10}
	className="View" sx={{
		flexDirection: 'column',
		justifyContent: 'center',
		alignProperty: 'center'}}>
		<Box

		sx={{ 
			padding: 3,
			zIndex: 'modal',
			maxHeight: '400px',
			maxWidth: '400px',
			overflow: 'visible'
		}}
		>
		<img id="capture" width="400"></img>
		</Box>
    </Paper>)
}

export default Panel;
