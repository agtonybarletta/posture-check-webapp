import {models} from "@tensorflow/tfjs";
import React, {createContext, useContext, useState} from "react";
import ModelServiceContext from "./model/ModelServiceContext";
import PostureCheckService from "./PostureCheckService";
import PostureCheckServiceContext from "./PostureCheckServiceContext";
import WebcamService from "./webcam/WebcamService";
import WebcamServiceContext from "./webcam/WebcamServiceContext";


function ServicesProvider(props: any) {
	
  const webcamService = useContext(WebcamServiceContext);
  const modelService = useContext(ModelServiceContext);
  const postureCheckService = new PostureCheckService(webcamService, modelService);

  return (
  	<WebcamServiceContext.Provider value={webcamService}>
		<ModelServiceContext.Provider value={modelService}>
			<PostureCheckServiceContext.Provider value={postureCheckService}>
					{props.children}
			</PostureCheckServiceContext.Provider>
		</ModelServiceContext.Provider>
	</WebcamServiceContext.Provider>
  );
}

export default ServicesProvider;
