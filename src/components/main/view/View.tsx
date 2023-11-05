import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import './View.css';
import {Card, Paper, Box, Button, Stack} from '@mui/material'

const View = memo((props: any) => {

	const videoRef = React.useRef<HTMLVideoElement| null>(null);
	let [isShown, setIsShown] =  useState(false);

  const onStartWebcam = useCallback(() => {
    // TODO: manage errros
    if (videoRef && videoRef.current ) {
      props.onStartWebcam(videoRef.current);
      setIsShown(true);
    }
  }, []);

	const onStopWebcam = () => {
		setIsShown(false);
    props.onStopWebcam();
	}

  return (
  <Box sx={{
		flexDirection: 'column',
		justifyContent: 'center',
		alignProperty: 'center',
		height: '100%'
  }}>

		<Stack direction="column" justifyContent="flex-end" spacing={2} alignItems="center" sx={{ height: '100%' }}>
	<Box
		sx={{ 
			visibility: isShown ? 'visible': 'hidden', 
			padding: 3,
			zIndex: 'modal',

		}}
		justifyContent = "center" 
		alignItems="center">

	   	<video id="video" style={{maxWidth: "100%", height: "auto" }}  autoPlay ref={videoRef}></video>
	</Box>

		<Stack direction="row" spacing={2} pb={2}>
			<Button variant="contained" id="startBtn" onClick={onStartWebcam}>Open Webcam</Button>
			<Button variant="contained" id="startBtn" onClick={onStopWebcam}>Stop Webcam</Button>
		</Stack>
		</Stack>
    </Box>
  );
});

export default View;
