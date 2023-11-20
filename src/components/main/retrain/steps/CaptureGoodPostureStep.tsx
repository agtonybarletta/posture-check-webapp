import { CircularProgress, Typography } from "@mui/material";
import React, {useCallback, useState} from "react";
import Timer from "../Timer";
import GenericStep from "./GenericStep";
import Done from "@mui/icons-material/Done"

const CaptureGoodPostureStep = (props: {complete: () => void}) => {

  const [step, setStep] = useState("ready" as "ready" | "recording" | "message");
  const onReady = useCallback(() => {
    setStep("recording");
  }, []);
  const onMessage = useCallback(() => {
    setStep("message");
    props.complete();
  }, []);
  return (
    <React.Fragment>
      <GenericStep>
        {step == "ready" && <React.Fragment>
          <Timer seconds={10} countdown={true} color="error" onTimeout={onReady}/>
          <Typography>When circle turns green please keep a good posture</Typography>
        </React.Fragment>}
        {step == "recording" && <React.Fragment>
          <Timer seconds={10} countdown={true} color="success" onTimeout={onMessage}/>
          <Typography>Keep a good posture</Typography>
        </React.Fragment>}
        {step == "message" && <React.Fragment>
          <Done/>
          <Typography>Recording completed!</Typography>
        </React.Fragment>}
      </GenericStep>
    </React.Fragment>
  );
};
export default CaptureGoodPostureStep;
