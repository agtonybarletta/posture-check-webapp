import React, {useContext, useEffect, useState} from "react";
import './View.css';
import {Card, Paper, Box, Button} from '@mui/material'
import WebcamServiceContext from "../../../services/webcam/WebcamServiceContext";
import WebcamService from "../../../services/webcam/WebcamService";
import {alignProperty} from "@mui/material/styles/cssUtils";

function View(props: any) {

	const webcamService: WebcamService = useContext(WebcamServiceContext);
	let [isShown, setIsShown] =  useState(false);
	
	let startWebcam = () => {
		webcamService.startWebcam();
		setIsShown(true);
	}
	let stopWebcam = () => {
		webcamService.stopWebcam();
		setIsShown(false);
	}

	let startCapturing = () => {
		setInterval(() => webcamService.capture(), 3000);
	}
	//useEffect(() => startWebcam());

/*
	  */
  return (
    <Paper
	elevation={10}
	className="View" sx={{
		flexDirection: 'column',
		justifyContent: 'center',
		alignProperty: 'center'}}>
	<Box
		sx={{ 
			visibility: isShown ? 'visible': 'hidden', 
			padding: 3,
			zIndex: 'modal',
			minHeight: '400px',
			minWidth: '400px',
		}}
		justifyContent = "center" 
		alignItems="center">
	   	<video id="video" style={{maxWidth: "100%", height: "auto" }}  autoPlay></video>

	</Box>

	<Box sx={{ 
			paddingBottom: 3,
	}} >
		<Button id="startBtn" onClick={startWebcam}>Open Webcam</Button>
		<Button id="startBtn" onClick={stopWebcam}>Stop Webcam</Button>
		<Button id="captureBtn" onClick={startCapturing}>Capture</Button>
	  </Box>
    </Paper>
  );
}

export default View;
