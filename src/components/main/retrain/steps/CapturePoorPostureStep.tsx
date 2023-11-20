import { Typography } from "@mui/material";
import React, {useState} from "react";
import Timer from "../Timer";
import GenericStep from "./GenericStep";

const CapturePoorPostureStep = (props: {complete: () => void}) => {
  const [recording, setRecording] = useState(false);
  return (
    <React.Fragment>
      <GenericStep>
        {!recording && <React.Fragment>
          <Timer seconds={10} countdown={true} color="error" onTimeout={() => setRecording(true)}/>
          <Typography>When circle turns green please pretend to have poor posture</Typography>
        </React.Fragment>}
        {recording && <React.Fragment>
          <Timer seconds={10} countdown={true} color="success" onTimeout={props.complete}/>
          <Typography>Arch your back and move the head forward</Typography>
        </React.Fragment>}
      </GenericStep>
    </React.Fragment>
  );
};
export default CapturePoorPostureStep;
