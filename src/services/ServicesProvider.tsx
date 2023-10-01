import React, {useContext, useState} from "react";
import WebcamService from "./webcam/WebcamService";
import WebcamServiceContext from "./webcam/WebcamServiceContext";

function ServicesProvider(props: any) {
	
  const defaultWebcamService = useContext(WebcamServiceContext);
  const [ webcamService, setWebcamService] = useState( defaultWebcamService );
  return (
  	<WebcamServiceContext.Provider value={webcamService}>
		{props.children}
	</WebcamServiceContext.Provider>
  );
}

export default ServicesProvider;
