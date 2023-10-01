import {Box, Paper, Typography} from "@mui/material"
import WebcamServiceContext from "../../../services/webcam/WebcamServiceContext";
import WebcamService from "../../../services/webcam/WebcamService";
import {useContext, useState} from "react";

const DBGPanel = (props: any) => {

	const webcamService: WebcamService = useContext(WebcamServiceContext);
	let [text, setText] =  useState("");
	const callback = (text: string) => {
		setText(text)	
		console.log("callback");
	}
	webcamService.setCallback(callback);
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
		<Typography variant="body1" component="h2">
			{text}
		</Typography>
			<canvas id="canvas" className="canvas"></canvas>
		</Box>
    </Paper>)
}

export default DBGPanel;
