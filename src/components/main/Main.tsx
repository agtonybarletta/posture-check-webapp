import React, {useContext, useEffect, useState} from "react";
import "./Main.css";
import View from "./view/View";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Panel from "./panel/Panel";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/system";
import WebcamService from "../../services/webcam/WebcamService";
import WebcamServiceContext from "../../services/webcam/WebcamServiceContext";
import PostureCheckService from "../../services/PostureCheckService";
import PostureCheckServiceContext from "../../services/PostureCheckServiceContext";

function Main(props: any) {
  
	const webcamService: WebcamService = useContext(WebcamServiceContext);
	const postureCheckService: PostureCheckService = useContext(PostureCheckServiceContext) as PostureCheckService;

	let [intervalHandler, setIntervalHandler] = useState(0);
	let [loopState, setLoopState] = useState(false);
  let [pred, setPred] = useState([] as number[]);

  useEffect( () => {
		if(loopState) {
			let tmp = window.setInterval( () => {
				onCapture();
			}, 100);
			setIntervalHandler(tmp);
		} else {
			window.clearInterval(intervalHandler);	
		}
    
  }, [loopState]);

  const onStartWebcam = (video: HTMLVideoElement) => {
    webcamService.addVideo(video);
    webcamService.startWebcam();
    console.log(loopState);
  }

  const onStopWebcam = () => {
		webcamService.stopWebcam();
    setLoopState(false);
  };


  const onCapture = () => {
		  return postureCheckService.capture().then( (data: any) => {
        setPred(data);
        return data;
      });
  };

  return (
    <Box maxWidth="xl" className="Main">
      <Stack direction="row"
        justifyContent="center"
        spacing={12}
        alignItems="center"
		sx={{
			width: '100vw',
			height: '90vh'
		}}
      >
          <Paper
            elevation={10}
            className="View"
            sx={{
              width: { md: "40vw" , lg: "33vw", xl: "25vw" },
			  aspectRatio: 420/320,
			  borderRadius:"25px"
            }}
          >
            <View
              onStartWebcam={onStartWebcam}
              onStopWebcam={onStopWebcam}
              ></View>
          </Paper>

    <Paper
	elevation={10}
	className="View" sx={{
		flexDirection: 'column',
		justifyContent: 'center',
		alignProperty: 'center',
              width: { md: "40vw" ,lg: "33vw", xl: "25vw" },
			  aspectRatio: 420/320,
			  borderRadius:"25px"
		}}>
            <Panel onCapture={onCapture} loopState={loopState} setLoopState={setLoopState} pred={pred}></Panel>
          </Paper>
      </Stack>
    </Box>
  );
}

export default Main;
