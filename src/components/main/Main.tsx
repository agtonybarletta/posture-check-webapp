import React, {useContext, useEffect, useState} from "react";
import "./Main.css";
import View from "./view/View";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Panel from "./panel/Panel";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/system";
import PostureCheckService from "../../services/PostureCheckService";
import PostureCheckServiceContext from "../../services/PostureCheckServiceContext";

function Main(props: any) {
  
	const postureCheckService: PostureCheckService = useContext(PostureCheckServiceContext) as PostureCheckService;

	let [intervalHandler, setIntervalHandler] = useState(0);
	let [loopState, setLoopState] = useState(false);
  let [pred, setPred] = useState([] as number[]);

  useEffect( () => {
		if(loopState) {
			let tmp = window.setInterval( () => {
				onCapture();
			}, 500);
			setIntervalHandler(tmp);
		} else {
			window.clearInterval(intervalHandler);	
		}
    
  }, [loopState]);

  const onStartWebcam = (video: HTMLVideoElement) => {
    postureCheckService.addVideo(video);
    postureCheckService.startWebcam();
    console.log(loopState);
  }

  const onStopWebcam = () => {
		postureCheckService.stopWebcam();
    setLoopState(false);
  };


  const onCapture = () => {
		  return postureCheckService.captureAndPredict().then( (data: any) => {
        setPred(data);
        return data;
      });
  };

  const onAddExample = (labelClass: string) => {
    return postureCheckService.addExample(labelClass)
  };

  const onFit = () => {
    postureCheckService.fit();
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
            <Panel onCapture={onCapture} loopState={loopState} setLoopState={setLoopState} pred={pred} onAddExample={onAddExample} onFit={onFit}></Panel>
          </Paper>
      </Stack>
    </Box>
  );
}

export default Main;
